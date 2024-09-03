import { toast } from '@/components/ui/use-toast';
import GlobalApi from '../_utils/GlobalApi';

const getOrCreateCart = async (userId, jwt) => {
  try {
    const response = await GlobalApi.getCartItems(userId, jwt);
    if (response && response.length > 0) {
      return response[0]; // Assuming the first item is the user's cart
    } else {
      // Create a new cart if one doesn't exist
      const newCart = await GlobalApi.addToCart({
        data: {
          ProductList: [],
          amount: 0,
          users_permissions_users: userId,
          userId: userId,
        }
      }, jwt);
      return newCart.data;
    }
  } catch (error) {
    console.error('Error getting or creating cart:', error);
    throw error;
  }
};

const addToCart = async (product, quantity, selectedSize, user, jwt, setLoading, setUpdateCart, router) => {
  setLoading(true);
  if (!jwt) {
    router.push("/SignIn");
    setLoading(false);
    return;
  }

  try {
    const cart = await getOrCreateCart(user.id, jwt);
    
    let updatedProductList = Array.isArray(cart.attributes.ProductList) 
      ? [...cart.attributes.ProductList] 
      : [];

    const existingProductIndex = updatedProductList.findIndex(
      (item) => item.product === product.id && item.size === selectedSize
    );

    if (existingProductIndex !== -1) {
      // Update quantity if product already exists
      updatedProductList[existingProductIndex].quantity += quantity;
    } else {
      // Add new product to list
      updatedProductList.push({
        product: product.id,
        quantity: quantity,
        size: selectedSize,
      });
    }

    // Calculate total amount
    const totalAmount = await calculateTotalAmount(updatedProductList);

    const data = {
      data: {
        ProductList: updatedProductList,
        amount: totalAmount.toFixed(2),
        users_permissions_users: user.id,
        userId: user.id,
      },
    };

    await GlobalApi.updateCartItem(cart.id, data, jwt);
    setUpdateCart(prev => !prev);
    setLoading(false);
    toast({title: 'Cart Updated Successfully!'});
  } catch (error) {
    console.error('Error updating cart:', error);
    toast({title: "Error updating cart"});
    setLoading(false);
  }
};

// Helper function to calculate total amount
const calculateTotalAmount = async (productList) => {
  let totalAmount = 0;
  for (const item of productList) {
    const productDetails = await GlobalApi.getProductById(item.product);
    const price = productDetails.attributes.discount
      ? productDetails.attributes.price * (1 - productDetails.attributes.discount / 100)
      : productDetails.attributes.price;
    totalAmount += price * item.quantity;
  }
  return totalAmount;
};

export default addToCart;