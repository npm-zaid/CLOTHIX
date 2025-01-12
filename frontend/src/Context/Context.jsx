import { createContext, useEffect, useState } from "react";
import { policyAssets, AboutAssets } from '../Assets/assets';
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
    const [search, setsearch] = useState('');
    const [showsearch, setshowsearch] = useState(false);
    const [send, setsend] = useState(false);

    //  NEWSLETTER
    const [isSubscribed, setisSubscribed] = useState(false)
    const UserSubsFetch = async () => {  
       try {
         const res = await axios.post(backendUrl + '/api/user/SingleUser', {}, { headers: { token } });
         if (res.data.success) {
           setisSubscribed(res.data.user.subscriber);
         } else {
           toast.error(res.data.message);
         }
       } catch (error) {
         console.log(error);
         toast.error("Error fetching user data");
       }
     }
    


  

    const [cartItems, setcartitems] = useState({});
    const [products, setproducts] = useState([]);

    const [token, settoken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
    const navigate = useNavigate();
    const [deliveryCharges, setdeliveryCharges] = useState(10);
    // BACKEND URL
    const backendUrl = process.env.REACT_APP_BACKEND_URL

    // add to cart logic
    const addTocart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setcartitems(cartData);

        // save cart to database
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
            } catch (error) {
                toast.error("Error saving cart to database");
            }
        }
    };

    // get user cart
    const getUserCart = async (token) => {
        
        try {
            const response = await axios.post(backendUrl + '/api/cart/get',{}, { headers: { token } });
            if (response.data.success) {
                setcartitems(response.data.cartdata);
            } else {
                toast.error("Failed to fetch cart data");
            }
        } catch (error) {
            toast.error("Error fetching cart");
        }
    };

    useEffect(() => {
        const Token = localStorage.getItem("token");
        if (Token) {
            getUserCart(Token);
            UserSubsFetch();
        }
    }, [token]);

    // no of items in cart
    const getCardCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    // Handle error
                }
            }
        }
        return totalCount;
    };

    // Cart Total
    const getCardAmount = () => {
        // Initialize total amount to 0
        let totalAmount = 0;

        // Loop through each item ID in the cart
        for (const items in cartItems) {
            // Find the product details by matching the item ID
            const itemInfo = products.find(product => product._id == items);

            // Loop through each size variant of the current item
            for (const item in cartItems[items]) {
                try {
                    // If quantity is greater than 0
                    if (cartItems[items][item] > 0) {
                        // Add to total: price * quantity
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                    // Skip if there's any error accessing the data
                }
            }
        }
        // Return the final total amount
     
        if (isSubscribed) {
            totalAmount = (totalAmount-totalAmount*0.2); // Apply 20% discount
        }

        return totalAmount;
    };

    // update a cart item
    const updateCartItem = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setcartitems(cartData);

        // update cart in database
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                toast.error("Error updating cart in database");
            }
        }
    };

    // PRODUCTS API
    const getProducts = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setproducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error fetching products");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const value = {
        backendUrl,
        products,
        policyAssets,
        AboutAssets,
        search,
        setsearch,
        showsearch,
        setshowsearch,
        send,
        setsend,
        addTocart,
        getCardCount,
        cartItems,
        updateCartItem,
        getCardAmount,
        token, 
        settoken,
        navigate,
        deliveryCharges,
        setdeliveryCharges,
        setcartitems,
        getUserCart,
        isSubscribed,
        setisSubscribed
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopProvider;