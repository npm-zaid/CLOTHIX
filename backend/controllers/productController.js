import ProductModel from "../models/productModel.js";
import {v2 as cloudinary} from 'cloudinary';


//Add Product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category , subCategory, sizes , bestSeller } = req.body;
        const image1 =  req.files.image1 && req.files.image1[0]
        const image2 =  req.files.image2 && req.files.image2[0]
        const image3 =  req.files.image3 && req.files.image3[0]
        const image4 =  req.files.image4 && req.files.image4[0]
        const Images = [image1,image2,image3,image4].filter((item)=>item !== undefined)
        
        //Upload Images to Cloudinary
        const uploadedImages = await Promise.all(
            Images.map(async (image) => {
                const result = await cloudinary.uploader.upload(image.path, {resource_type:"image"});
                return result.secure_url;
            })
        );

        //Create Product

        const productData={
            name,
            description,
            price:Number(price),
            images:uploadedImages,
            category,
            subCategory,
            sizes:JSON.parse(sizes),
            bestSeller,
            date:Date.now() 
        }

        /*const product = await ProductModel.create(productData)*/
        //we can use this or below one
        const product = new ProductModel(productData)
        await product.save()

        res.json({success:true,message:"Product Added Successfully"})

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

//Remove Product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findByIdAndDelete(id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

//List Products
const listProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

//Single Product
const singleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export { addProduct, removeProduct, listProducts, singleProduct };
