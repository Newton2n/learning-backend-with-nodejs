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
  static deleteFromFavList(homeId,callback){
   this.getFav(favoriteList =>{
    favoriteList = favoriteList.filter((id)=>{
       return homeId !== id
    })
    fs.writeFile(filePath, JSON.stringify(favoriteList), callback);
    console.log("fav list if left" ,favoriteList)
    
   }
  )
  }
}

module.exports = Favorites;
