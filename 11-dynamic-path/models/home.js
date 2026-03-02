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
    Home.fetch((addHomeDetails) => {
      if (this.id) {
        addHomeDetails = addHomeDetails.map((home) => {
          return home.id === this.id ? this : home;
        });
        console.log("New home edit in save", addHomeDetails);
      } else {
        this.id = Math.random().toString();
        addHomeDetails.push(this);
      }
      fs.writeFile(filePath, JSON.stringify(addHomeDetails), (error) => {
        console.log("Error on file write", error);
      });
    });
  }

  static fetch(callback) {
    fs.readFile(filePath, (err, data) => {
      // console.log(data)
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
  static editHome(homeId, callback) {
    this.fetch((homes) => {
      const homeFound = homes.find((home) => {
        const result = home.id === homeId;
        return result;
      });
      callback(homeFound);
    });
  }
  static deleteHome(homeId, callback) {
    this.fetch((homes) => {
      const homeLeft = homes.filter((home) => {
        const result = home.id !== homeId;
        return result;
      });
      
      fs.writeFile(filePath, JSON.stringify(homeLeft), (error) => {
        console.log("Error on file write", error);
        Favorite.deleteFromFavList(homeId,callback)
      });;
    });
  }
}

module.exports = Home;

// Home.getFavoriteHomeList()
