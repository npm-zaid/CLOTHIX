import express from 'express';
import connectDB from './config/Database.js';
import 'dotenv/config';
import cors from 'cors';
import UserRouter from './routes/UserRoutes.js';
import ProductRouter from './routes/ProductRoutes.js';
import connectCloudinary from './config/cloudnary.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
const app = express();

const port = process.env.PORT 
//Database Connection
connectDB()
//Cloudinary Connection
connectCloudinary()

//App Config
app.use(express.json());
app.use(cors())


//api endpoints
app.use("/api/user",UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);


//Routes
app.get('/', (req, res) =>{
    res.send('HELLO CLOTHIX WORLD');
})

app.listen(port, () => {
    console.log('Server is running on port 3001');
})

