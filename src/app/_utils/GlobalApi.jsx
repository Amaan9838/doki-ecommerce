// _utils/GloabalApi.jsx

const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'https://doki-ecommerce-backend.onrender.com/api'
});

const axiosClientNew = axios.create({
    baseURL: 'http://localhost:3000/api'
});

const getCategory = () => axiosClient.get('/categories?populate=*');

const getProducts = () => axiosClient.get('/products?populate=*');

const getProductById = (id) => axiosClient.get(`/products/${id}?populate=*`);

const getHeroSections = () => axiosClient.get('/hero-sections?populate=*');

const getCategoryList = () => axiosClient.get('/categories?populate=*').then(resp=>{
    return resp.data.data;
})

const getProductList = () => axiosClient.get('/products?populate=*').then(resp=>{
    return resp.data.data;
})
const getProductByCategory = (category)=>axiosClient.get('/products?filters[categories][name][$in]='+category+'&populate=*').then(resp=>{
    return resp.data.data;
})

const registerUser = (
    //  firstName, lastName,
username,
    email,
    password) => axiosClient.post('/auth/local/register',{
        // firstName:firstName,
        // lastName:lastName,
        username:username,
        email:email,
        password:password,
    });

    const SignIn = (email,password,) => axiosClient.post('/auth/local',{
            identifier:email,
            password:password
        });
const addToCart = (data,jwt)=>axiosClient.post('/user-carts',data,{
    headers:{
        Authorization:'Bearer '+jwt
       }
})

const addToWishList = (data,jwt)=>axiosClient.post('/user-wishlists',data,{
    headers:{
        Authorization:'Bearer '+jwt
       }
})

const postReviews = (data,jwt)=>axiosClient.post('/reviews',data,{
    headers:{
        Authorization:'Bearer '+jwt
       }
}
)

const getCartItems=(userId,jwt)=>axiosClient.get('/user-carts?filters[userId][$eq]='+userId+'&[populate][products][populate][images][populate][0]=url',
    {
        headers:{
            Authorization:'Bearer '+jwt
           }  
    }).then(resp=>{
        const data=resp.data.data;
        const cartItemsList=data.map((item,index)=>({
         name:item.attributes.products?.data[0].attributes.title,
         quantity:item.attributes.quantity,
         amount:item.attributes.amount,
         image:item.attributes.products?.data[0].attributes.images.data[0].attributes.url,
         actualPrice:item.attributes.products?.data[0].attributes.price,
         id:item.id,
         product:item?.attributes.products?.data[0].id,
         price:item.attributes.amount,
        }))
        return cartItemsList
    })
    
    const createPaymentIntent=(amount)=>axiosClientNew.post('/create-payment-intent',amount,{
        headers: {
            "Content-Type": "application/json",
          },
    })
    const createOrder=(data,jwt)=>axiosClient.post('/orders',data,{
        headers:{
            Authorization:'Bearer '+jwt
           }  
    })
    const getWishlistItems=(userId,jwt)=>axiosClient.get('/user-wishlists?filters[userId][$eq]='+userId+'&[populate][products][populate][images][populate][0]=url',
        {
            headers:{
                Authorization:'Bearer '+jwt
               }  
        }).then(resp=>{
            const data=resp.data.data;
            const wishlistItemsList=data.map((item,index)=>({
             name:item?.attributes.products?.data[0].attributes.title,
             image:item?.attributes.products?.data[0].attributes.images.data[0].attributes.url,
             price:item?.attributes.products?.data[0].attributes.price,
             id:item?.id,
             productId:item?.attributes.products?.data[0].id
            }))
            return wishlistItemsList
        })

    const deleteCartItems=(id,jwt)=>axiosClient.delete('/user-carts/'+id, 
        {
        headers:{
            Authorization:'Bearer '+jwt
           }  
    })

    const getMyOrder=(userId, jwt)=>axiosClient.get('/orders?filters[userId][$eq]='+userId+'&populate[orderItemList][populate][product][populate][images]=url',
        {
            headers:{
                Authorization:'Bearer '+jwt
               }  
        }
    )
    
    .then(resp=>{
        const response=resp.data.data;
        const orderList=response.map(item=>({
            id:item.id,
            totalOrderAmount:item.attributes.totalOrderAmount,
            paymentId:item.attributes.paymentId,
            orderItemList:item.attributes.orderItemList,
            createdAt:item.attributes.createdAt,
            status:item.attributes.status
        }));

        return orderList;
    })
    const deleteWishlistItems=(id,jwt)=>axiosClient.delete('/user-wishlists/'+id, 
        {
        headers:{
            Authorization:'Bearer '+jwt
           }  
    })

    const updateCartItem = (id, data, jwt) => axiosClient.put(`/user-carts/${id}`, {
        data: {
            quantity: data?.quantity,
            amount: data?.amount,
        }
    }, {
        headers: {
            Authorization: 'Bearer ' + jwt
        }
    });

    
export default {
    getCategory,
    getProducts,
    getHeroSections,
    getProductById,
    getProductByCategory,
    registerUser,
    SignIn,
    addToCart,
    getCategoryList,
    getProductList,
    getCartItems,
    deleteCartItems,
    updateCartItem,
    postReviews,
    addToWishList,
    getWishlistItems,
    deleteWishlistItems,
    createOrder,
    createPaymentIntent,
    getMyOrder,
};
