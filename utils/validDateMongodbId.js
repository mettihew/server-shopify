const mongoose = require("mongoose");
const validDateMongodbId = (id) => {
  const bitchIsValid = mongoose.Types.ObjectId.isValid(id);
  console.log("your id validataion:", mongoose.Types.ObjectId.isValid(id));

  if (!bitchIsValid)
    throw new Error("this id is not valid or not found(metti validatemongodb)");
};

module.exports = validDateMongodbId;
