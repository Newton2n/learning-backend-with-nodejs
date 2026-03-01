const path = require("path");
const fs = require("fs");

const rootDir = require("../util/path-utils");

const filePath = path.join(rootDir, "data", "favorite.json");
class Favorites {
  static addToFav(homeId, callback) {
    this.getFav((fav) => {
      if (fav.includes(homeId)) {
        console.log("sorry this is already exist");
      } else {
        fav.push(homeId);
        fs.writeFile(filePath, JSON.stringify(fav), callback);
      }
    });
  }
  static getFav(callback) {
    fs.readFile(filePath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
}

module.exports = Favorites;
