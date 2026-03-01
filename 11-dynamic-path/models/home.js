//core modules
const path = require("path");
const fs = require("fs");

//local modules
const rootDir = require("../util/path-utils");
const Favorite = require("./favorite");
const filePath = path.join(rootDir, "data", "homes.json");

class Home {
  constructor(title, category, address, price) {
    this.title = title;
    this.category = category;
    this.address = address;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    Home.fetch((addHomeDetails) => {
      addHomeDetails.push(this);
      fs.writeFile(filePath, JSON.stringify(addHomeDetails), (error) => {
        console.log("Error on file write", error);
      });
    });
  }

  static fetch(callback) {
    fs.readFile(filePath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
  static findById(homeId, callback) {
    this.fetch((homes) => {
      const homeFound = homes.find((home) => {
        const result = home.id === homeId;
        return result;
      });
      callback(homeFound);
    });
  }
 
}

module.exports = Home;

// Home.getFavoriteHomeList()
