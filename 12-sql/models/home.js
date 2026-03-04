const db = require("../util/database");

class Home {
  constructor(
    title, category, address, price,description,imgUrl,rating,id
  ) {
    this.title = title;
    this.category = category;
    this.address = address;
    this.price = price;
    this.description = description;
    this.photoUrl = imgUrl;
    this.rating = rating;
    this.id = id;
  }

  save() {
    if (this.id) {
      return db.execute(
        "UPDATE homes SET name=?, price=?, address=?, rating=?, photoUrl=?, description=?,category=? WHERE id=?",
        [
          this.title,
          this.price,
          this.address,
          this.rating,
          this.photoUrl,
          this.description,
          this.category,
          this.id,
        ],
      );
    } else {
      // insert
      return db.execute(
        "INSERT INTO homes (name, price, address, rating, photoUrl, description,category) VALUES (?, ?, ?, ?, ?, ?,?)",
        [
          this.title,
          this.price,
          this.address,
          this.rating,
          this.photoUrl,
          this.description,
          this.category,
        ],
      );
    }
    // TO be converted into mysql
  }

  static fetch() {
    return db.execute("SELECT * FROM homes");
  }
  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id=?", [homeId]);
  }
  static deleteHome(homeId) {
    return db.execute("DELETE FROM homes WHERE id=?", [homeId]);
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
}

module.exports = Home;

// Home.getFavoriteHomeList()
