//core modules
const path = require("path");
const fs = require("fs");

//local modules
const rootDir = require("../util/path-utils");

module.exports = class Home {
  constructor(title, category, address, price) {
    this.title = title;
    this.category = category;
    this.address = address;
    this.price = price;
  }

  save() {
    Home.fetch((addHomeDetails) => {
      addHomeDetails.push(this);
      const filePath = path.join(rootDir, "data", "homes.json");
      fs.writeFile(filePath, JSON.stringify(addHomeDetails), (error) => {
        console.log("Error on file write", error);
      });
    });
  }

  static fetch(callback) {
    const filePath = path.join(rootDir, "data", "homes.json");
    fs.readFile(filePath, (err, data) => {
       callback(!err ? JSON.parse(data) : []);
    });

  }
};
