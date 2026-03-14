const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  imgUrl: String,
  rating: Number,
});

// homeSchema.pre("findOneAndDelete", async function () {
//   console.log("Came to pre hook while deleting a home");
//   const homeId = this.getQuery()._id;
//   await Favorite.findOneAndDelete({ homeId: homeId });
// });

module.exports = mongoose.model("Home", homeSchema);
