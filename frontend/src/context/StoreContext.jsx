import { createContext, useEffect, useState } from "react";
import axios from "axios"
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {


    const url = "http://localhost:3000";

    
    const [token, setToken] = useState("");


    const [cartItems, setCartItems] = useState({});


    const [food_list, setFoodList] = useState([])

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data);
    }


    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get", {}, {headers: {token}});
        setCartItems(response.data.cartData);
    }


    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if(token){
            await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}});
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))

        if(token){
            await axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}});
        }
    }


    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems])

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item]; 
            }
        }
        return totalAmount;
    }


    // whenever we reload the token used to be removed by default and user had to sign in again so to prevent that we use this fucntion
    // even if we reload the token state will not change, to remove the token user has to logout
    useEffect(() => {
        async function loadData(){
            await fetchFoodList()
            if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider