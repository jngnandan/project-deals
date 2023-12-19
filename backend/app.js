// import gsmarena from 'gsmarena-api';
const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const gsmarena = require('gsmarena-api')

// const apple = require('../localData/apple.json');
// const samsung = require('../localData/samsung.json');
// const xiomi = require('../localData/xiomi.json')
// const oneplus = require('../localData/oneplus.json')
// const google = require('../localData/google.json')
// const motorola = require('../localData/motorola.json')
// const phonespecData = require('../localData/phonespec.json')


const { Database } = require("sqlite3").verbose();

// const phonespecJson = [phonespecData]


// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dgcfly5zo',
  api_key: '176928181688396',
  api_secret: 'K5nDfwF7QFPLbhKxs8XqUwNgYAk'
});

const app = express();
const dbPath = path.join(__dirname, "mydatabase2.db");
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

    //Phonespec
    // createTableAndAddDataForPhonespec(phonespecJson)
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}/`);
});

  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.use(cors());


// ... Previous code ...

const insertDeviceDataToDatabase = async (phonespecJson) => {
  try {
    const tableName = "phonespec"; // Table name for device data

    // Define the insert data query here
    const insertDataQuery = `
      INSERT INTO ${tableName} (
        name, image_public_id, description, technology, "2G_bands", "3G_bands", "4G_bands", "5G_bands", speed,
        announced, status, dimensions, weight, build, sim, display_type, display_size, resolution, platform_os,
        chipset, cpu, gpu, card_slot, internal_storage, main_camera, main_camera_features, main_camera_video,
        selfie_camera, selfie_camera_features, selfie_camera_video, loudspeaker, "3.5mm_jack", wlan, bluetooth,
        positioning, nfc, radio, usb, sensors, battery_type, charging, colors, price
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    const stmt = await db.prepare(insertDataQuery);

    for (const item of phonespecJson) {
      const image = await uploadToCloudinary(item.img); // Implement your image upload function

      if (image && image.public_id) {
        // Extract data from the JSON and create a data object
        const data = {
          name: item.name,
          image_public_id: image.public_id,
          description: item.description,
          technology: getSpecValue(item, "Technology"),
          "2G_bands": getSpecValue(item, "2G bands"),
          "3G_bands": getSpecValue(item, "3G bands"),
          "4G_bands": getSpecValue(item, "4G bands"),
          "5G_bands": getSpecValue(item, "5G bands"),
          speed: getSpecValue(item, "Speed"),
          announced: getSpecValue(item, "Announced"),
          status: getSpecValue(item, "Status"),
          dimensions: getSpecValue(item, "Dimensions"),
          weight: getSpecValue(item, "Weight"),
          build: getSpecValue(item, "Build"),
          sim: getSpecValue(item, "SIM"),
          display_type: getSpecValue(item, "Display Type"),
          display_size: getSpecValue(item, "Display Size"),
          resolution: getSpecValue(item, "Resolution"),
          platform_os: getSpecValue(item, "OS"),
          chipset: getSpecValue(item, "Chipset"),
          cpu: getSpecValue(item, "CPU"),
          gpu: getSpecValue(item, "GPU"),
          card_slot: getSpecValue(item, "Card slot"),
          internal_storage: getSpecValue(item, "Internal"),
          main_camera: getSpecValue(item, "Main Camera"),
          main_camera_features: getSpecValue(item, "Features"),
          main_camera_video: getSpecValue(item, "Video"),
          selfie_camera: getSpecValue(item, "Selfie Camera"),
          selfie_camera_features: getSpecValue(item, "Features"),
          selfie_camera_video: getSpecValue(item, "Video"),
          loudspeaker: getSpecValue(item, "Loudspeaker"),
          "3.5mm_jack": getSpecValue(item, "3.5mm jack"),
          wlan: getSpecValue(item, "WLAN"),
          bluetooth: getSpecValue(item, "Bluetooth"),
          positioning: getSpecValue(item, "GPS"),
          nfc: getSpecValue(item, "NFC"),
          radio: getSpecValue(item, "Radio"),
          usb: getSpecValue(item, "USB"),
          sensors: getSpecValue(item, "Sensors"),
          battery_type: getSpecValue(item, "Battery"),
          charging: getSpecValue(item, "Charging"),
          colors: getSpecValue(item, "Colors"),
          price: getSpecValue(item, "Price"),
        };

        // Extract data values into an array in the order of columns
        const dataValues = [
          data.name,
          data.image_public_id,
          data.description,
          data.technology,
          data["2G_bands"],
          data["3G_bands"],
          data["4G_bands"],
          data["5G_bands"],
          data.speed,
          data.announced,
          data.status,
          data.dimensions,
          data.weight,
          data.build,
          data.sim,
          data.display_type,
          data.display_size,
          data.resolution,
          data.platform_os,
          data.chipset,
          data.cpu,
          data.gpu,
          data.card_slot,
          data.internal_storage,
          data.main_camera,
          data.main_camera_features,
          data.main_camera_video,
          data.selfie_camera,
          data.selfie_camera_features,
          data.selfie_camera_video,
          data.loudspeaker,
          data["3.5mm_jack"],
          data.wlan,
          data.bluetooth,
          data.positioning,
          data.nfc,
          data.radio,
          data.usb,
          data.sensors,
          data.battery_type,
          data.charging,
          data.colors,
          data.price,
        ];

        await stmt.run(...dataValues); // Insert data

        console.log(`Data inserted for: ${item.name}`);
      } else {
        console.error(`Error uploading image for: ${item.name}`);
      }
    }

    await stmt.finalize();
    console.log("New device data inserted into the database for phonespec.");
  } catch (error) {
    console.error("Error:", error);
  }
};

// Helper function to get a specific specification value from item.detailSpec
const getSpecValue = (item, specName) => {
  const specification = item.detailSpec.find((spec) => spec.title === specName);
  return specification ? specification.specifications[0]?.value || '' : '';
};

// ... The rest of your code ...

// const createTableAndAddDataForPhonespec = async (phonespecJson) => {
//   try {
//     const tableName = "phonespec"; // Table name for OnePlus data

//     // const dropTableQuery = `DROP TABLE IF EXISTS ${tableName};`;
//     const createTableQuery = `
//       CREATE TABLE ${tableName} (
//         id SERIAL PRIMARY KEY,
//         name TEXT,
//         image_public_id TEXT,
//         description TEXT,
//         technology VARCHAR(255),
//         "2G_bands" VARCHAR(255),
//         "3G_bands" VARCHAR(255),
//         "4G_bands" VARCHAR(255),
//         "5G_bands" VARCHAR(255),
//         speed VARCHAR(255),
//         announced DATE,
//         status VARCHAR(255),
//         dimensions VARCHAR(255),
//         weight VARCHAR(255),
//         build VARCHAR(255),
//         sim VARCHAR(255),
//         display_type VARCHAR(255),
//         display_size VARCHAR(255),
//         resolution VARCHAR(255),
//         platform_os VARCHAR(255),
//         chipset VARCHAR(255),
//         cpu VARCHAR(255),
//         gpu VARCHAR(255),
//         card_slot VARCHAR(255),
//         internal_storage VARCHAR(255),
//         main_camera VARCHAR(255),
//         main_camera_features VARCHAR(255),
//         main_camera_video VARCHAR(255),
//         selfie_camera VARCHAR(255),
//         selfie_camera_features VARCHAR(255),
//         selfie_camera_video VARCHAR(255),
//         loudspeaker VARCHAR(255),
//         "3.5mm_jack" VARCHAR(255),
//         wlan VARCHAR(255),
//         bluetooth VARCHAR(255),
//         positioning VARCHAR(255),
//         nfc VARCHAR(255),
//         radio VARCHAR(255),
//         usb VARCHAR(255),
//         sensors VARCHAR(255),
//         battery_type VARCHAR(255),
//         charging VARCHAR(255),
//         colors VARCHAR(255),
//         price VARCHAR(255)
//       );`;

//     // Define the insert data query here
//     const insertDataQuery = `
//       INSERT INTO ${tableName} (
//         name, image_public_id, description, technology, "2G_bands", "3G_bands", "4G_bands", "5G_bands", speed,
//         announced, status, dimensions, weight, build, sim, display_type, display_size, resolution, platform_os,
//         chipset, cpu, gpu, card_slot, internal_storage, main_camera, main_camera_features, main_camera_video,
//         selfie_camera, selfie_camera_features, selfie_camera_video, loudspeaker, "3.5mm_jack", wlan, bluetooth,
//         positioning, nfc, radio, usb, sensors, battery_type, charging, colors, price
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

//     await db.exec(dropTableQuery); // Drop the existing table if it exists
//     await db.exec(createTableQuery); // Create a new table

//     const stmt = await db.prepare(insertDataQuery);

//     for (const item of phonespecJson) {
//       const image = await uploadToCloudinary(item.img);

//       if (image && image.public_id) {
//         const networkSpecs = item.detailSpec[0].specifications;
//         const launchSpecs = item.detailSpec[1].specifications;
//         const bodySpecs = item.detailSpec[2].specifications;
//         const displaySpecs = item.detailSpec[3].specifications;
//         const platformSpecs = item.detailSpec[4].specifications;
//         const memorySpecs = item.detailSpec[5].specifications;
//         const mainCameraSpecs = item.detailSpec[6].specifications;
//         const selfieCameraSpecs = item.detailSpec[7].specifications;
//         const soundSpecs = item.detailSpec[8].specifications;
//         const commsSpecs = item.detailSpec[9].specifications;
//         const featuresSpecs = item.detailSpec[10].specifications;
//         const batterySpecs = item.detailSpec[11].specifications;
//         const quickSpecs = item.quickSpec;

//         const data = {
//           name: item.name,
//           image_public_id: image.public_id,
//           description: item.description,
//           technology: networkSpecs[0]?.value || '',
//           "2G_bands": networkSpecs[1]?.value || '',
//           "3G_bands": networkSpecs[2]?.value || '',
//           "4G_bands": networkSpecs[3]?.value || '',
//           "5G_bands": networkSpecs[4]?.value || '',
//           speed: networkSpecs[5]?.value || '',
//           announced: launchSpecs[0]?.value || '',
//           status: launchSpecs[1]?.value || '',
//           dimensions: bodySpecs[0]?.value || '',
//           weight: bodySpecs[1]?.value || '',
//           build: bodySpecs[2]?.value || '',
//           sim: bodySpecs[3]?.value || '',
//           display_type: displaySpecs[0]?.value || '',
//           display_size: displaySpecs[1]?.value || '',
//           resolution: displaySpecs[2]?.value || '',
//           platform_os: displaySpecs[3]?.value || '',
//           chipset: platformSpecs[0]?.value || '',
//           cpu: platformSpecs[1]?.value || '',
//           gpu: platformSpecs[2]?.value || '',
//           card_slot: platformSpecs[3]?.value || '',
//           internal_storage: memorySpecs[0]?.value || '',
//           main_camera: mainCameraSpecs[0]?.value || '',
//           main_camera_features: mainCameraSpecs[1]?.value || '',
//           main_camera_video: mainCameraSpecs[2]?.value || '',
//           selfie_camera: selfieCameraSpecs[0]?.value || '',
//           selfie_camera_features: selfieCameraSpecs[1]?.value || '',
//           selfie_camera_video: selfieCameraSpecs[2]?.value || '',
//           loudspeaker: soundSpecs[0]?.value || '',
//           "3.5mm_jack": soundSpecs[1]?.value || '',
//           wlan: commsSpecs[0]?.value || '',
//           bluetooth: commsSpecs[1]?.value || '',
//           positioning: commsSpecs[2]?.value || '',
//           nfc: commsSpecs[3]?.value || '',
//           radio: commsSpecs[4]?.value || '',
//           usb: commsSpecs[5]?.value || '',
//           sensors: featuresSpecs[0]?.value || '',
//           battery_type: batterySpecs[0]?.value || '',
//           charging: batterySpecs[1]?.value || '',
//           colors: item.detailSpec[10].specifications[0]?.value || '',
//           price: item.detailSpec[10].specifications[1]?.value || '',
//         };

//         // Extract data values into an array in the order of columns
//         const dataValues = [
//           data.name,
//           data.image_public_id,
//           data.description,
//           data.technology,
//           data["2G_bands"],
//           data["3G_bands"],
//           data["4G_bands"],
//           data["5G_bands"],
//           data.speed,
//           data.announced,
//           data.status,
//           data.dimensions,
//           data.weight,
//           data.build,
//           data.sim,
//           data.display_type,
//           data.display_size,
//           data.resolution,
//           data.platform_os,
//           data.chipset,
//           data.cpu,
//           data.gpu,
//           data.card_slot,
//           data.internal_storage,
//           data.main_camera,
//           data.main_camera_features,
//           data.main_camera_video,
//           data.selfie_camera,
//           data.selfie_camera_features,
//           data.selfie_camera_video,
//           data.loudspeaker,
//           data["3.5mm_jack"],
//           data.wlan,
//           data.bluetooth,
//           data.positioning,
//           data.nfc,
//           data.radio,
//           data.usb,
//           data.sensors,
//           data.battery_type,
//           data.charging,
//           data.colors,
//           data.price,
//         ];

//         await stmt.run(...dataValues); // Insert data

//         console.log(`Data inserted for: ${item.name}`);
//       } else {
//         console.error(`Error uploading image for: ${item.name}`);
//       }
//     }

//     await stmt.finalize();
//     console.log("Table created and data inserted into the database for OnePlus.");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };


// const createTableAndAddDataForPhonespec = async (phonespecJson) => {
//   try {
//     const tableName = "phonespec"; // Table name for OnePlus data
    
//     const existingColumns = await db.all(`PRAGMA table_info(${tableName})`);

//     const columnsToAdd = [
//       'misc TEXT',
//       'models TEXT',
//       'sar_head TEXT',
//       'sar_body TEXT',
//       'sar_eu_body TEXT',
//     ];

//     const alterTableQueries = columnsToAdd
//       .filter((column) => !existingColumns.some((col) => col.name === column.split(' ')[0]))
//       .map((column) => `ALTER TABLE ${tableName} ADD COLUMN ${column};`);

//     for (const query of alterTableQueries) {
//       await db.exec(query);
//     }
    


//     // Define the insert data query here
//     const insertDataQuery = `
//       INSERT INTO ${tableName} (
//         name, image_public_id, description, technology, "2G_bands", "3G_bands", "4G_bands", "5G_bands", speed,
//         announced, status, dimensions, weight, build, sim, display_type, display_size, resolution, platform_os,
//         chipset, cpu, gpu, card_slot, internal_storage, main_camera, main_camera_features, main_camera_video,
//         selfie_camera, selfie_camera_features, selfie_camera_video, loudspeaker, "3.5mm_jack", wlan, bluetooth,
//         positioning, nfc, radio, usb, sensors, battery_type, charging, colors, price,
//         misc,  -- Added for Misc
//         models,  -- Added for Models
//         sar_head,  -- Added for SAR Head
//         sar_body,  -- Added for SAR Body
//         sar_eu_body  -- Added for SAR EU Body
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

//     // Prepare the insert data statement
//     const stmt = await db.prepare(insertDataQuery);

//     for (const item of phonespecJson) {
//       const image = await uploadToCloudinary(item.img);

//       if (image && image.public_id) {
//         const networkSpecs = item.detailSpec[0].specifications;
//         const launchSpecs = item.detailSpec[1].specifications;
//         const bodySpecs = item.detailSpec[2].specifications;
//         const displaySpecs = item.detailSpec[3].specifications;
//         const platformSpecs = item.detailSpec[4].specifications;
//         const memorySpecs = item.detailSpec[5].specifications;
//         const mainCameraSpecs = item.detailSpec[6].specifications;
//         const selfieCameraSpecs = item.detailSpec[7].specifications;
//         const soundSpecs = item.detailSpec[8].specifications;
//         const commsSpecs = item.detailSpec[9].specifications;
//         const featuresSpecs = item.detailSpec[10].specifications;
//         const batterySpecs = item.detailSpec[11].specifications;
//         const miscSpecs = item.detailSpec[12].specifications; // Added for Misc
//         const testsSpecs = item.detailSpec[13].specifications; // Added for Tests

//         // Extract SAR EU data
//         const sarEuData = miscSpecs.find(spec => spec.name === 'SAR EU');
//         const sarEuValue = sarEuData ? sarEuData.value : '';


//         // Extract data from the JSON and create a data object
//         const data = {
//           name: item.name,
//           image_public_id: image.public_id,
//           description: item.description,
//           technology: networkSpecs[0]?.value || '',
//           "2G_bands": networkSpecs[1]?.value || '',
//           "3G_bands": networkSpecs[2]?.value || '',
//           "4G_bands": networkSpecs[3]?.value || '',
//           "5G_bands": networkSpecs[4]?.value || '',
//           speed: networkSpecs[5]?.value || '',
//           announced: launchSpecs[0]?.value || '',
//           status: launchSpecs[1]?.value || '',
//           dimensions: bodySpecs[0]?.value || '',
//           weight: bodySpecs[1]?.value || '',
//           build: bodySpecs[2]?.value || '',
//           sim: bodySpecs[3]?.value || '',
//           display_type: displaySpecs[0]?.value || '',
//           display_size: displaySpecs[1]?.value || '',
//           resolution: displaySpecs[2]?.value || '',
//           platform_os: platformSpecs[0]?.value || '',
//           chipset: platformSpecs[1]?.value || '',
//           cpu: platformSpecs[2]?.value || '',
//           gpu: platformSpecs[3]?.value || '',
//           card_slot: platformSpecs[4]?.value || '',
//           internal_storage: memorySpecs[0]?.value || '',
//           main_camera: mainCameraSpecs[0]?.value || '',
//           main_camera_features: mainCameraSpecs[1]?.value || '',
//           main_camera_video: mainCameraSpecs[2]?.value || '',
//           selfie_camera: selfieCameraSpecs[0]?.value || '',
//           selfie_camera_features: selfieCameraSpecs[1]?.value || '',
//           selfie_camera_video: selfieCameraSpecs[2]?.value || '',
//           loudspeaker: soundSpecs[0]?.value || '',
//           "3.5mm_jack": soundSpecs[1]?.value || '',
//           wlan: commsSpecs[0]?.value || '',
//           bluetooth: commsSpecs[1]?.value || '',
//           positioning: commsSpecs[2]?.value || '',
//           nfc: commsSpecs[3]?.value || '',
//           radio: commsSpecs[4]?.value || '',
//           usb: commsSpecs[5]?.value || '',
//           sensors: featuresSpecs[0]?.value || '',
//           battery_type: batterySpecs[0]?.value || '',
//           charging: batterySpecs[1]?.value || '',
//           colors: miscSpecs[0]?.value || '',  // Added for Colors
//           models: miscSpecs[1]?.value || '',  // Added for Models
//           sar_head: miscSpecs[2]?.value || '',  // Added for SAR Head
//           sar_body: miscSpecs[3]?.value || '',  // Added for SAR Body
//           sar_eu_body: miscSpecs[4]?.value || '',  // Added for SAR EU Body
//           price: item.detailSpec[10].specifications[1]?.value || '',
//           misc: JSON.stringify(miscSpecs), // Added for Misc
//         };

   
//         // Extract data values into an array in the order of columns
//         const dataValues = [
//           data.name,
//           data.image_public_id,
//           data.description,
//           data.technology,
//           data["2G_bands"],
//           data["3G_bands"],
//           data["4G_bands"],
//           data["5G_bands"],
//           data.speed,
//           data.announced,
//           data.status,
//           data.dimensions,
//           data.weight,
//           data.build,
//           data.sim,
//           data.display_type,
//           data.display_size,
//           data.resolution,
//           data.platform_os,
//           data.chipset,
//           data.cpu,
//           data.gpu,
//           data.card_slot,
//           data.internal_storage,
//           data.main_camera,
//           data.main_camera_features,
//           data.main_camera_video,
//           data.selfie_camera,
//           data.selfie_camera_features,
//           data.selfie_camera_video,
//           data.loudspeaker,
//           data["3.5mm_jack"],
//           data.wlan,
//           data.bluetooth,
//           data.positioning,
//           data.nfc,
//           data.radio,
//           data.usb,
//           data.sensors,
//           data.battery_type,
//           data.charging,
//           data.colors,
//           data.models,
//           data.sar_head,
//           data.sar_body,
//           data.sar_eu_body,
//           data.price,
//           data.misc,  // Added for Misc
//         ];

//         await stmt.run(...dataValues); // Insert data

//         console.log(`Data inserted for: ${item.name}`);
//       } else {
//         console.error(`Error uploading image for: ${item.name}`);
//       }
//     }

//     await stmt.finalize();
//     console.log("Data inserted into the database for Apple iPhone 14 Pro.");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };



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
    const tableName = "mobiles";
    const getDataQuery = `
        SELECT
          name,
          image_public_id,
          description,
          new_id,
          price,
          brand,
          currys_price,
          amazon_link,
          currys_link
        FROM
          ${tableName};
      `;

    const data = await db.all(getDataQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
      brand: item.brand,
      currys_price: item.currys_price,
      amazon_link: item.amazon_link,
      currys_link: item.currys_link
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/mobiles/:brand", async (req, res) => {
  try {
    const { brand } = req.params;

    // Ensure that the brand name corresponds to an existing table
    const validBrands = ['apple', 'samsung', 'xiaomi', 'oneplus','google', 'motorola' /* add other valid brand names */];
    if (!validBrands.includes(brand.toLowerCase())) {
      return res.status(400).json({ error: "Invalid brand" });
    }

    const getDataByBrandQuery = `
      SELECT
        name,
        image_public_id,
        description,
        new_id,
        price
      FROM
        ${brand.toLowerCase()}  -- assuming the table names match the brand names
      ORDER BY
        brand;
    `;

    const data = await db.all(getDataByBrandQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
      brand: brand.toLowerCase(),
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





app.get("/apple", async (req, res) => {
  try {
    const tableName = "apple";
    const getDataQuery = `
        SELECT
          name,
          image_public_id,
          description,
          new_id,
          price
        FROM
          ${tableName};
      `;

    const data = await db.all(getDataQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
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
          new_id,
          price
        FROM
          ${tableName};
      `;

    const data = await db.all(getDataQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/xiaomi", async (req, res) => {
  try {
    const tableName = "xiaomi";
    const getDataQuery = `
        SELECT
          name,
          image_public_id,
          description,
          new_id,
          price
        FROM
          ${tableName};
      `;

    const data = await db.all(getDataQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
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
          new_id,
          price
        FROM
          ${tableName};
      `;

    const data = await db.all(getDataQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
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
          new_id,
          price
        FROM
          ${tableName};
      `;


    const data = await db.all(getDataQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
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
          new_id,
          price
        FROM
          ${tableName};
      `;

    const data = await db.all(getDataQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.get("/mobiles", async (req, res) => {
//   try {
//     const tableName = "motorola";
//     const getDataQuery = `
//         SELECT
//           name,
//           image_public_id,
//           description,
//           new_id,
//           price
//         FROM
//           ${tableName};
//       `;

//     const data = await db.all(getDataQuery);

//     const transformedData = data.map((item) => ({
//       name: item.name,
//       img: cloudinary.url(item.image_public_id),
//       description: item.description,
//       new_id: item.new_id,
//       price: item.price,
//     }));

//     res.json(transformedData);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


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


// app.get("/products/:productId", async (req, res) => {
//   try {
//     const { productId } = req.params; // Extract the productId from the request parameters.
//     console.log(productId)
//     const device = await gsmarena.catalog.getDevice(productId);
//     console.log(device);
//     res.json(device);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


const cachedData = {};

app.get("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);

    if (cachedData[productId]) {
      // If the data for this productId is already in the cache, return it
      console.log("Data found in cache.");
      return res.json(cachedData[productId]);
    }

    const device = await gsmarena.catalog.getDevice(productId);
    console.log(device);

    // Call initializePhonespecTable to create or update the table
    await initializePhonespecTable(device);

    // Cache the data for future use
    cachedData[productId] = device;

    res.json(device);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function initializePhonespecTable(device) {
  try {
    // You can call this function when you want to create or update the table
    await 
    createTableAndAddDataForPhonespec([device]); // Wrap the 'device' in an array for consistency with your existing code
    console.log("Table created and data inserted into the database for phonespec.");
  } catch (error) {
    console.error("Error:", error);
  }
}











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

