const db = require("../util/database");

class Home {
  constructor(title, category, address, price, description, imgUrl, id) {
    this.title = title;
    this.category = category;
    this.address = address;
    this.price = price;
    this.description = description;
    this.imgUrl = imgUrl;
    this.id = id;
  }

  save() {
    // Home.fetch()
    //   .then((HomeDetails) => {
    //     if (this.id) {
    //       HomeDetails = HomeDetails.map((home) => {
    //         return home.id === this.id ? this : home;
    //       });
    //       // console.log("New home edit in save", HomeDetails);
    //     } else {
    //       this.id = Math.random().toString();
    //       HomeDetails.push(this);
    //     }
    //     // fs.writeFile(filePath, JSON.stringify(HomeDetails), (error) => {
    //     //   console.log("Error on file write", error);
    //     // }); // to be in to connect db
    //   })
    //   .catch((error) => {
    //     console.log("error on file read home model ", error);
    //   });
    TO be converted into mysql
  }

  static fetch() {
    return db.execute("SELECT * FROM homes");
  }
  static findById(homeId) {
    return this.fetch()
      .then(([homes]) => {
        // console.log("in Find by id",homes)
        const homeFound = homes.find((home) => home.id == homeId);
        // console.log("Home found in find by id",homeFound)
        return homeFound;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static editHome(homeId, callback) {
    this.fetch()
      .then((homes) => {
        const homeFound = homes.find((home) => {
          const result = home.id === homeId;
          return result;
        });
        callback(homeFound);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static deleteHome(homeId, callback) {
    this.fetch()
      .then((homes) => {
        const homeLeft = homes.filter((home) => {
          const result = home.id !== homeId;
          return result;
        });

        fs.writeFile(filePath, JSON.stringify(homeLeft), (error) => {
          console.log("Error on file write", error);
          Favorite.deleteFromFavList(homeId, callback);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = Home;

// Home.getFavoriteHomeList()
