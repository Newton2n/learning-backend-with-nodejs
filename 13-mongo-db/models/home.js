const { getDb } = require("../util/database");
const { ObjectId } = require("mongodb");
class Home {
  constructor(
    title,
    category,
    address,
    price,
    description,
    imgUrl,
    rating,
    _id,
  ) {
    this.title = title;
    this.category = category;
    this.address = address;
    this.price = price;
    this.description = description;
    this.photoUrl = imgUrl;
    this.rating = rating;
    this._id = _id;
    console.log(_id)
  }

  save() {
    const db = getDb();
    if (this._id) {
      const updateFields = {
        title: this.title,
        category: this.category,
        address: this.address,
        price: this.price,
        description: this.description,
        photoUrl: this.photoUrl,
        rating: this.rating,
      };
      console.log("Update details",updateFields ,this._id)
      return db
        .collection("homes")
        .updateOne(
          { _id: new ObjectId(String(this._id)) },
          { $set: updateFields },
        );
    } else {
      // insert
      return db.collection("homes").insertOne(this);
    }
    // TO be converted into mysql
  }

  static fetch() {
    const db = getDb();
    return db.collection("homes").find().toArray();
  }
  static findById(homeId) {
    console.log("home id in find by id method", homeId);
    const db = getDb();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }
  static deleteHome(homeId) {
    const db = getDb();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
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
