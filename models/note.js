const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log(`connecting to url ${url}`);

mongoose
  .connect(url, { family: 4 })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(`error connecting to MongoDB ${error}`);
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    mingLength: 5,
    required: true,
  },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__V;
  },
});

module.exports = mongoose.model("Note", noteSchema);
