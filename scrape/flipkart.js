const express = require("express");
const puppeteer = require("puppeteer");
const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const app = express();
const port = 3000;

// Initialize Cloudinary (replace with your Cloudinary credentials)
cloudinary.config({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret',
});

let scrapedData = []; // Create an array to store scraped data

// Create a database connection
const db = new sqlite3.Database("mydatabase.db"); // Replace with your database file name

// Check if the 'cloudinaryUrl' column exists, and if not, add it
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS mobiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      price TEXT,
      discount TEXT,
      description TEXT,
      imageUrl TEXT,
      cloudinaryUrl TEXT
    )
  `);
});

app.get("/scrape", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(
      "https://www.flipkart.com/search?sid=tyy%2F4io&sort=recency_desc&ctx=eyJjYXJkQ29udGV4dCI6eyJhdHRyaWJ1dGVzIjp7InRpdGxlIjp7Im11bHRpVmFsdWVkQXR0cmlidXRlIjp7ImtleSI6InrpdGxlIiwiaW5mZXJlbmNlVHlwZSI6IlRJVExFIiwidmFsdWVzIjpbIkxhdGVzdCBTYW1zdW5nIG1vYmlsZXMgIl0sInZhbHVlVHlwZSI6Ik1VTFRJX1ZBTFVFRCJ9fX19fQ%3D%3D&wid=1.productCard.PMU_V2_1&p%5B%5D=facets.discount_range_v1%255B%255D%3D30%2525%2Bor%2Bmore&p%5B%5D=facets.discount_range_v1%255B%255D%3D50%2525%2Bor%2Bmore&p%5B%5D=facets.discount_range_v1%255B%255D%3D40%2525%2Bor%2Bmore&p%5B%5D=facets.brand%255B%255D%3Drealme"
    );

    // Wait for the product titles, prices, discounts, descriptions, and images to load (you can adjust the selectors and wait time as needed)
    await page.waitForSelector("._4rR01T", { visible: true });
    await page.waitForSelector("._30jeq3", { visible: true });
    await page.waitForSelector("._3Ay6Sb", { visible: true });
    await page.waitForSelector("._396cs4", { visible: true });

    // Extract product information and image URLs and store them in an array of objects
    const products = await page.evaluate(() => {
      const titleElements = document.querySelectorAll("._4rR01T");
      const priceElements = document.querySelectorAll("._30jeq3");
      const discountElements = document.querySelectorAll("._3Ay6Sb");
      const descriptionElements = document.querySelectorAll("._1fQZEK");
      const imageElements = document.querySelectorAll("._396cs4");

      const productInfo = [];

      for (let i = 0; i < titleElements.length; i++) {
        const id = i + 1; // Generate a unique ID
        const title = titleElements[i].textContent.trim();
        const price = priceElements[i].textContent.trim();
        const discount = discountElements[i].textContent.trim();
        const description = descriptionElements[i].textContent.trim();
        const imageUrl = imageElements[i].getAttribute("src");

        productInfo.push({
          id,
          title,
          price,
          discount,
          description,
          imageUrl,
          cloudinaryUrl: null, // Initialize with null
        });
      }

      return productInfo;
    });

    // Upload images to Cloudinary and store Cloudinary URLs in the "Flipkart" folder
    for (const product of products) {
      if (product.imageUrl) {
        try {
          // Upload the image to Cloudinary in the "Flipkart" folder
          const uploadResult = await cloudinary.uploader.upload(product.imageUrl, {
            folder: 'Flipkart', // Specify the folder name
          });
    
          // Check if the upload was successful
          if (uploadResult && uploadResult.secure_url) {
            product.cloudinaryUrl = uploadResult.secure_url;
            console.log(`Uploaded to Cloudinary: ${product.imageUrl} => ${product.cloudinaryUrl}`);
          } else {
            console.error(`Failed to upload to Cloudinary: ${product.imageUrl}`);
          }
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error);
        }
      }
    }

    // Insert new scraped data into the "mobiles" table with Cloudinary URLs
    const insertStmt = db.prepare(`
      INSERT INTO mobiles (title, price, discount, description, imageUrl, cloudinaryUrl)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const product of products) {
      insertStmt.run(
        product.title,
        product.price,
        product.discount,
        product.description,
        product.imageUrl,
        product.cloudinaryUrl // Insert the Cloudinary URL
      );
    }

    insertStmt.finalize(); // Finalize the prepared statement

    // Print the array of product information
    console.log("Product Information:", products);

    await browser.close();

    // Return scraped data as JSON response
    res.json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
