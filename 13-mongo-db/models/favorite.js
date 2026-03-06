const { getDb } = require("../util/database");
class Favorites {
  constructor(homeId) {
    this.homeId = homeId;
  }
   addToFavList() {
    console.log(this.homeId);
    const db = getDb();
    return db.collection("favoriteHomeList").insertOne(this);
  }
  static getFavList() {
    const db = getDb();
    return db.collection("favoriteHomeList").find().toArray();
  }
  static deleteFromFavList(homeId) {

        const db = getDb();
        return db
          .collection("favoriteHomeList")
          .deleteOne({homeId:homeId});
  }
}
module.exports = Favorites;
