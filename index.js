const express = require("express")
const app = express();
const dotenv = require("dotenv")
const userRoute = require("./routers/userRoute")
const productRoute = require("./routers/productRoute")
const mongoose = require("mongoose")

dotenv.config();
app.use(express.json());


mongoose
.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB connected successfully!")
})
.catch((error) => {
    console.log(error)
})

const PORT = process.env.PORT;

app.use('/api/user', userRoute);
app.use('/api/product', productRoute);

app.listen(PORT, ()=> {
    console.log(`Server started at ${PORT}`)
})