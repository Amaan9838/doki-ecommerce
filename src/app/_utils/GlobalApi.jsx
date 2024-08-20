const { default: axios } = require ("axios" ) ;

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api'
})

const getCategory =()=> axiosClient.get('/categories?populate=*') ;

const getProducts =()=> axiosClient.get('/products?populate=*') ;


export default{
getCategory,
getProducts
}