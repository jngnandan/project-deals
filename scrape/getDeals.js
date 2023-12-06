const gsmarena = require('gsmarena-api');

async function main() {
  try {
    // Fetch deals from gsmarena
    const deals = await gsmarena.deals.getDeals();
    console.log(deals);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
