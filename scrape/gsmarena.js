const gsmarena = require('gsmarena-api');
const sqlite3 = require('sqlite3').verbose();

async function main() {
  try {
    // Initialize SQLite database
    const db = new sqlite3.Database('mobiles.db');

    // Create a table to store the data
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS mobiles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          brand TEXT,
          model TEXT,
          network TEXT,
          dimensions TEXT,
          weight TEXT,
          build TEXT,
          sim TEXT,
          displayType TEXT,
          displaySize TEXT,
          displayResolution TEXT,
          os TEXT,
          chipset TEXT,
          cpu TEXT,
          gpu TEXT,
          memoryCardSlot TEXT,
          internalMemory TEXT,
          mainCamera TEXT,
          selfieCamera TEXT,
          loudspeaker TEXT,
          headphoneJack TEXT,
          wlan TEXT,
          bluetooth TEXT,
          gps TEXT,
          nfc TEXT,
          radio TEXT,
          usb TEXT,
          sensors TEXT,
          battery TEXT,
          colors TEXT,
          models TEXT,
          sar TEXT
        )
      `);
    });

    // Fetch devices for a specific brand (e.g., Apple)
    const devices = await gsmarena.catalog.getBrand('apple-phones-48');

    for (const device of devices) {
      // Customize this part to match the data structure returned by the API
      const {
        model,
        network,
        dimensions,
        weight,
        build,
        sim,
        displayType,
        displaySize,
        displayResolution,
        os,
        chipset,
        cpu,
        gpu,
        memoryCardSlot,
        internalMemory,
        mainCamera,
        selfieCamera,
        loudspeaker,
        headphoneJack,
        wlan,
        bluetooth,
        gps,
        nfc,
        radio,
        usb,
        sensors,
        battery,
        colors,
        models,
        sar,
        // Add more properties to match the number of columns
      } = device;

      // Define a function to handle missing data
      const handleMissingData = (value) => (value ? value : 'N/A');

      // Insert the data into the SQLite database
      db.run(
        `
        INSERT INTO mobiles (
          brand, model, network, dimensions, weight, build, sim, displayType, displaySize, displayResolution,
          os, chipset, cpu, gpu, memoryCardSlot, internalMemory, mainCamera, selfieCamera, loudspeaker, 
          headphoneJack, wlan, bluetooth, gps, nfc, radio, usb, sensors, battery, colors, models, sar
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          'Apple',
          model,
          handleMissingData(network),
          handleMissingData(dimensions),
          handleMissingData(weight),
          handleMissingData(build),
          handleMissingData(sim),
          handleMissingData(displayType),
          handleMissingData(displaySize),
          handleMissingData(displayResolution),
          handleMissingData(os),
          handleMissingData(chipset),
          handleMissingData(cpu),
          handleMissingData(gpu),
          handleMissingData(memoryCardSlot),
          handleMissingData(internalMemory),
          handleMissingData(mainCamera),
          handleMissingData(selfieCamera),
          handleMissingData(loudspeaker),
          handleMissingData(headphoneJack),
          handleMissingData(wlan),
          handleMissingData(bluetooth),
          handleMissingData(gps),
          handleMissingData(nfc),
          handleMissingData(radio),
          handleMissingData(usb),
          handleMissingData(sensors),
          handleMissingData(battery),
          handleMissingData(colors),
          handleMissingData(models),
          handleMissingData(sar),
          // Add more values to match the number of columns
        ]
      );

      console.log(`Inserted data for Apple - ${model}`);
    }

    // Close the database connection
    db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
