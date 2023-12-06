const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRoute = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/categoryRoute");
const blogCatRouter = require("./routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
const enqRouter = require("./routes/enqRoute");
const colorRouter = require("./routes/colorRoute");
const uploadRouter = require("./routes/uploadRoute");
const couponRouter = require("./routes/couponRoute");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use("/user", authRoute);
app.use("/product", productRouter);
app.use("/blog", blogRouter); 
app.use("/category", categoryRouter);
app.use("/blogcategory", blogCatRouter);
app.use("/brand", brandRouter);
app.use("/enquiry", enqRouter);
app.use("/color", colorRouter);
app.use("/upload", uploadRouter);
app.use("/coupon", couponRouter);

// .connect(process.env.MONGO_URL)
  mongoose
     .connect("mongodb+srv://Raj:Raj123@cluster0.kj8ngom.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("connected to mongodb"))
    .catch((err) => console.log(err));

    app.listen(5000, () => {
      console.log(`Server connected ${5000}`);
    });
