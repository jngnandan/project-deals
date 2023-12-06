// import gsmarena from 'gsmarena-api';
const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const gsmarena = require('gsmarena-api')

const apple = require('../localData/apple.json');
const samsung = require('../localData/samsung.json');
const xiomi = require('../localData/xiomi.json')
const oneplus = require('../localData/oneplus.json')
const google = require('../localData/google.json')
const motorola = require('../localData/motorola.json')

const { Database } = require("sqlite3").verbose();



// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dgcfly5zo',
  api_key: '176928181688396',
  api_secret: 'K5nDfwF7QFPLbhKxs8XqUwNgYAk'
});

const app = express();
const dbPath = path.join(__dirname, "mydatabase.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Create a table and add data when the server starts
    // await createTableAndAddData(apple);

    // Create table for Samsung
    // await createTableAndAddDataForSamsung(samsung)

    // Create table for Xiomi
    // await createTableAndAddDataForXiomi(xiomi)

        // Create table for Oneplus
    // createTableAndAddDataForOneplus(oneplus)
      
    // Create table for Google
    // createTableAndAddDataForGoogle(google)

        // Create table for Motorola
    // createTableAndAddDataForMotorola(motorola)

    // Update table for with new column
    // updateColumn(xiomi)

    app.listen(3002, () => {
      console.log("Server Running at http://localhost:3002/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.use(cors());

const createTableAndAddData = async (jsonData) => {
  try {
    const tableName = "apple";

    const dropTableQuery = `DROP TABLE IF EXISTS ${tableName};`;
    const createTableQuery = `
      CREATE TABLE ${tableName} (
        id INTEGER PRIMARY KEY,
        name TEXT,
        image_public_id TEXT,
        description TEXT
      );`;
    
    // Define the insert data query here
    const insertDataQuery = `
      INSERT INTO ${tableName} (name, image_public_id, description)
      VALUES (?, ?, ?);`;

    await db.exec(dropTableQuery); // Drop the existing table if it exists
    await db.exec(createTableQuery);  // Create a new table

    const stmt = await db.prepare(insertDataQuery);

    for (const item of jsonData) {
      const image = await uploadToCloudinary(item.img);

      if (image && image.public_id) {
        await stmt.run(item.name, image.public_id, item.description);
        console.log(`Image uploaded for: ${item.name}`);
      } else {
        console.error(`Error uploading image for: ${item.name}`);
      }
    }

    await stmt.finalize();
    console.log("Table created and data inserted into the database.");
  } catch (error) {
    console.error("Error:", error);
  }
};

const createTableAndAddDataForSamsung = async (jsonData) => {
  try {
    const tableName = "samsung"; // Table name for Samsung data

    const dropTableQuery = `DROP TABLE IF EXISTS ${tableName};`;
    const createTableQuery = `
      CREATE TABLE ${tableName} (
        id INTEGER PRIMARY KEY,
        name TEXT,
        image_public_id TEXT,
        description TEXT
      );`;
    
    // Define the insert data query here
    const insertDataQuery = `
      INSERT INTO ${tableName} (name, image_public_id, description)
      VALUES (?, ?, ?);`;

    await db.exec(dropTableQuery); // Drop the existing table if it exists
    await db.exec(createTableQuery);  // Create a new table

    const stmt = await db.prepare(insertDataQuery);

    for (const item of jsonData) {
      const image = await uploadToCloudinary(item.img);

      if (image && image.public_id) {
        await stmt.run(item.name, image.public_id, item.description);
        console.log(`Image uploaded for: ${item.name}`);
      } else {
        console.error(`Error uploading image for: ${item.name}`);
      }
    }

    await stmt.finalize();
    console.log("Table created and data inserted into the database for Samsung.");
  } catch (error) {
    console.error("Error:", error);
  }
};


const createTableAndAddDataForXiomi = async (jsonData) => {
  try {
    const tableName = "xiomi"; // Table name for Samsung data

    const dropTableQuery = `DROP TABLE IF EXISTS ${tableName};`;
    const createTableQuery = `
      CREATE TABLE ${tableName} (
        id INTEGER PRIMARY KEY,
        name TEXT,
        image_public_id TEXT,
        description TEXT
      );`;
    
    // Define the insert data query here
    const insertDataQuery = `
      INSERT INTO ${tableName} (name, image_public_id, description)
      VALUES (?, ?, ?);`;

    await db.exec(dropTableQuery); // Drop the existing table if it exists
    await db.exec(createTableQuery);  // Create a new table

    const stmt = await db.prepare(insertDataQuery);

    for (const item of jsonData) {
      const image = await uploadToCloudinary(item.img);

      if (image && image.public_id) {
        await stmt.run(item.name, image.public_id, item.description);
        console.log(`Image uploaded for: ${item.name}`);
      } else {
        console.error(`Error uploading image for: ${item.name}`);
      }
    }

    await stmt.finalize();
    console.log("Table created and data inserted into the database for Xiaomi.");
  } catch (error) {
    console.error("Error:", error);
  }
};

const createTableAndAddDataForOneplus = async (jsonData) => {
  try {
    const tableName = "oneplus"; // Table name for Samsung data

    const dropTableQuery = `DROP TABLE IF EXISTS ${tableName};`;
    const createTableQuery = `
      CREATE TABLE ${tableName} (
        id INTEGER PRIMARY KEY,
        name TEXT,
        image_public_id TEXT,
        description TEXT
      );`;
    
    // Define the insert data query here
    const insertDataQuery = `
      INSERT INTO ${tableName} (name, image_public_id, description)
      VALUES (?, ?, ?);`;

    await db.exec(dropTableQuery); // Drop the existing table if it exists
    await db.exec(createTableQuery);  // Create a new table

    const stmt = await db.prepare(insertDataQuery);

    for (const item of jsonData) {
      const image = await uploadToCloudinary(item.img);

      if (image && image.public_id) {
        await stmt.run(item.name, image.public_id, item.description);
        console.log(`Image uploaded for: ${item.name}`);
      } else {
        console.error(`Error uploading image for: ${item.name}`);
      }
    }

    await stmt.finalize();
    console.log("Table created and data inserted into the database for Oneplus.");
  } catch (error) {
    console.error("Error:", error);
  }
};

const createTableAndAddDataForGoogle = async (jsonData) => {
  try {
    const tableName = "google"; // Table name for Samsung data

    const dropTableQuery = `DROP TABLE IF EXISTS ${tableName};`;
    const createTableQuery = `
      CREATE TABLE ${tableName} (
        id INTEGER PRIMARY KEY,
        name TEXT,
        image_public_id TEXT,
        description TEXT
      );`;
    
    // Define the insert data query here
    const insertDataQuery = `
      INSERT INTO ${tableName} (name, image_public_id, description)
      VALUES (?, ?, ?);`;

    await db.exec(dropTableQuery); // Drop the existing table if it exists
    await db.exec(createTableQuery);  // Create a new table

    const stmt = await db.prepare(insertDataQuery);

    for (const item of jsonData) {
      const image = await uploadToCloudinary(item.img);

      if (image && image.public_id) {
        await stmt.run(item.name, image.public_id, item.description);
        console.log(`Image uploaded for: ${item.name}`);
      } else {
        console.error(`Error uploading image for: ${item.name}`);
      }
    }

    await stmt.finalize();
    console.log("Table created and data inserted into the database for Google.");
  } catch (error) {
    console.error("Error:", error);
  }
};

const createTableAndAddDataForMotorola = async (jsonData) => {
  try {
    const tableName = "motorola"; // Table name for Samsung data

    const dropTableQuery = `DROP TABLE IF EXISTS ${tableName};`;
    const createTableQuery = `
      CREATE TABLE ${tableName} (
        id INTEGER PRIMARY KEY,
        name TEXT,
        image_public_id TEXT,
        description TEXT
      );`;
    
    // Define the insert data query here
    const insertDataQuery = `
      INSERT INTO ${tableName} (name, image_public_id, description)
      VALUES (?, ?, ?);`;

    await db.exec(dropTableQuery); // Drop the existing table if it exists
    await db.exec(createTableQuery);  // Create a new table

    const stmt = await db.prepare(insertDataQuery);

    for (const item of jsonData) {
      const image = await uploadToCloudinary(item.img);

      if (image && image.public_id) {
        await stmt.run(item.name, image.public_id, item.description);
        console.log(`Image uploaded for: ${item.name}`);
      } else {
        console.error(`Error uploading image for: ${item.name}`);
      }
    }

    await stmt.finalize();
    console.log("Table created and data inserted into the database for Motorola.");
  } catch (error) {
    console.error("Error:", error);
  }
};

const addNewColumn = async () => {
  try {
    // Add the new column to the table
    await db.exec("ALTER TABLE xiomi ADD COLUMN new_id TEXT;");
    console.log("Added 'new_id' column to the table.");
  } catch (error) {
    console.error("Error:", error);
  }
};


const updateColumn = async (jsonData) => {
  addNewColumn();

  try {
    const stmt = await db.prepare(`UPDATE xiomi SET new_id = ? WHERE name = ?;`);

    for (const item of jsonData) {
      await stmt.run(item.id, item.name);
      console.log(`Updated new_id for: ${item.name}`);
    }

    await stmt.finalize();
    console.log("Column 'new_id' updated in the table.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    db.close(); // Close the database connection
  }
};



const uploadToCloudinary = async (imagePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imagePath, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

app.get("/mobiles", async (req, res) => {
  try {
    const tableName = "apple";
    const getDataQuery = `
        SELECT
          name,
          image_public_id,
          description,
          new_id
        FROM
          ${tableName};
      `;

    const data = await db.all(getDataQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/samsung", async (req, res) => {
  try {
    const tableName = "samsung";
    const getDataQuery = `
        SELECT
          name,
          image_public_id,
          description,
          new_id
        FROM
          ${tableName};
      `;

    const data = await db.all(getDataQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/xiomi", async (req, res) => {
  try {
    const tableName = "xiomi";
    const getDataQuery = `
        SELECT
          name,
          image_public_id,
          description,
          new_id
        FROM
          ${tableName};
      `;

    const data = await db.all(getDataQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/oneplus", async (req, res) => {
  try {
    const tableName = "oneplus";
    const getDataQuery = `
        SELECT
          name,
          image_public_id,
          description,
          new_id
        FROM
          ${tableName};
      `;

    const data = await db.all(getDataQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/google", async (req, res) => {
  try {
    const tableName = "google";
    const getDataQuery = `
        SELECT
          name,
          image_public_id,
          description,
          new_id
        FROM
          ${tableName};
      `;


    const data = await db.all(getDataQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/motorola", async (req, res) => {
  try {
    const tableName = "motorola";
    const getDataQuery = `
        SELECT
          name,
          image_public_id,
          description,
          new_id
        FROM
          ${tableName};
      `;

    const data = await db.all(getDataQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.listen(3002, () => {
//   console.log("Server Running at http://localhost:3002/");
// });


// app.get("/products", async (req, res) => {
//   try {
//     const getMobilesQuery = `
//       SELECT
//         *
//       FROM
//         mobiles;
//     `;
//     const mobiles = await db.all(getMobilesQuery);
//     res.json(mobiles);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


app.get("/products", async (req, res) => {
  try {
    // Fetch deals from GSM Arena
    const deals = await gsmarena.deals.getDeals();
    res.json(deals);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.get("/mobiles", async (req, res) => {
//   try {
//     // Fetch deals from GSM Arena
//     const devices = await gsmarena.catalog.getBrand('google-phones-107');
//     res.json(devices);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get("/brands", async (req, res) => {
  try {
    // Fetch deals from GSM Arena
    const one = await gsmarena.catalog.getBrands();
    res.json(one);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params; // Extract the productId from the request parameters.
    console.log(productId)
    const device = await gsmarena.catalog.getDevice(productId);
    console.log(device);
    res.json(device);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/new", async (req, res) => {
  const searchTerm = 'apple iphone 14'; // Replace with the desired term
try {
  // const { productId } = req.params; // Extract the productId from the request parameters.
  //     console.log(productId)
  const device = await gsmarena.catalog.getDevice('apple_iphone_13_pro_max-11089');
  console.log(device);
} catch (error) {
  console.error('Error:', error);
}
});




app.get("/", async (req, res) => {
  try {
    // Fetch deals from GSM Arena
    const deals = await gsmarena.deals.getDeals();
    res.json(deals);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// const fetchDeviceDetails = async (id) => {
//   try {
//     const response = await axios.get(`/products/${id}`); // Adjust the URL as needed
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching device details:', error);
//     throw error;
//   }
// };





// // Import the gsmarena-scraper library
// const gsmarena = require('gsmarena-scraper');

// app.get('/catalog/:brand', async (req, res) => {
//   const { brand } = req.params;
//   try {
//     // Fetch mobile phones for the specified brand using the gsmarena.catalog library
//     const devices = await gsmarena.catalog.getBrand(brand);

//     // Check if the result is empty or null
//     if (!devices || devices.length === 0) {
//       res.status(404).json({ error: 'No data found for the specified brand' });
//     } else {
//       res.json(devices);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// Define an API route to get a list of all mobile phone brands
// app.get('/catelog', async (req, res) => {
//   try {
//     // Fetch all mobile phone brands using the gsmarena.catalog library
//     const brands = await gsmarena.catalog.getBrands();
//     res.json(brands);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

