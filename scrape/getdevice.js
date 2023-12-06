const gsmarena = require('gsmarena-api');

async function main() {
  try {
    // Fetch detailed specifications for the Apple iPhone 13 Pro Max
    const device = await gsmarena.catalog.getDevice('apple_iphone_13_pro_max-11089');
    console.log('Device Details:', device);

    // Access the 'detailSpec' array
    for (const category of device.detailSpec) {
      console.log('Category:', category.category);
      for (const specification of category.specifications) {
        console.log('Specification:', specification);
      }
    }

    // Access the 'quickSpec' array
    for (const item of device.quickSpec) {
      console.log('Quick Spec:', item.name, item.value);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
