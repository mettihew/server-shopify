const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { errorHandler, notFound } = require("./middlewears/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRoute = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
dbConnect();
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use("/api/user", authRoute);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogCatRouter);
app.use("/api/brand", brandRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/color", colorRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/coupon", couponRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server 2 connected ${PORT}`);
});
