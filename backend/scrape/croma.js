const express = require("express");
const puppeteer = require("puppeteer");
const sqlite3 = require("sqlite3").verbose();
const cloudinary = require("cloudinary").v2;

const app = express();
const port = 3000;

// Initialize Cloudinary (replace with your Cloudinary credentials)
cloudinary.config({
  cloud_name: 'dgcfly5zo',
  api_key: '176928181688396',
  api_secret: 'K5nDfwF7QFPLbhKxs8XqUwNgYAk',
});

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
      imageUrl TEXT,
      cloudinaryUrl TEXT,
      category TEXT,
      seller TEXT
    )
  `);
});

app.get("/scrape", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(
      "https://www.croma.com/searchB?q=samsung%20galaxy%3Arelevance&text=samsung%20galaxy"
    );

    // Wait for the product titles, prices, and images to load (you can adjust the selectors and wait time as needed)
    await page.waitForSelector("h3 a", { visible: true });
    await page.waitForSelector(".amount", { visible: true });
    await page.waitForSelector("img"); // Select all img tags

    // Extract product information and image URLs and store them in an array of objects
    const products = await page.evaluate(() => {
      const titleElements = document.querySelectorAll("h3 a");
      const priceElements = document.querySelectorAll(".amount");
      const imageElements = document.querySelectorAll("img"); // Select all img tags

      const productInfo = [];

      for (let i = 0; i < titleElements.length; i++) {
        const id = i + 1; // Generate a unique ID
        const title = titleElements[i].textContent.trim();
        const price = priceElements[i].textContent.trim();
        const imageUrl = imageElements[i].getAttribute("src");

        productInfo.push({
          id,
          title,
          price,
          discount: "", // Initialize discount as an empty string
          imageUrl,
          cloudinaryUrl: null, // Initialize with null
          category: 'Mobiles',
          seller: 'Croma',
        });
      }

      return productInfo;
    });

    // Upload images to Cloudinary and store Cloudinary URLs
    for (const product of products) {
      if (product.imageUrl) {
        try {
          // Upload the image to Cloudinary in the "Croma" folder
          const uploadResult = await cloudinary.uploader.upload(product.imageUrl, {
            folder: 'Croma', // Specify the folder name
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

    // Delete rows with 'Croma' as the seller from the database
    db.run("DELETE FROM mobiles WHERE seller = 'Croma'", (err) => {
      if (err) {
        console.error("Error deleting existing 'Croma' data:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Insert new scraped data into the database with Cloudinary URLs
      const insertStmt = db.prepare(`
        INSERT INTO mobiles (title, price, discount, imageUrl, cloudinaryUrl, category, seller)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      for (const product of products) {
        insertStmt.run(
          product.title,
          product.price,
          product.discount,
          product.imageUrl,
          product.cloudinaryUrl, // Insert the Cloudinary URL
          product.category,
          product.seller
        );
      }

      insertStmt.finalize(); // Finalize the prepared statement
    });

    // Print the array of product information
    console.log("Product Information:", products);

    await browser.close();

    // Return scraped data as a JSON response
    res.json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
