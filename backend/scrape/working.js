const gsmarena = require('gsmarena-api');

async function main() {
  try {
    // Fetch a list of available brands
    // const brands = await gsmarena.catalog.getBrands();
    // console.log('Available Brands:', brands);

    // Fetch devices for a specific brand (Apple in this case)
    // const devices = await gsmarena.catalog.getBrand('apple-phones-48');
    // console.log('Apple Devices:', devices);

    // Fetch details for a specific device (Apple iPhone 13 Pro Max in this case)
    const device = await gsmarena.catalog.getDevice('apple_iphone_13_pro_max-11089');
    console.log('Device Details:', device);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the async function to start the process
main();
