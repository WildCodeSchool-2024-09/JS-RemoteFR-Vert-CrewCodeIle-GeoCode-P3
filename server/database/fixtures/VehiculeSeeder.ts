import AbstractSeeder from "./AbstractSeeder";

class BrandSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "brand", truncate: true });
  }

  run() {
    for (let i = 0; i < 10; i += 1) {
      const fakeVehicule = {
        brand: this.faker.vehicle.manufacturer(),
        refBrand: `brand_${i}`,
      };

      this.insert(fakeVehicule);
    }
  }
}

export default BrandSeeder;
