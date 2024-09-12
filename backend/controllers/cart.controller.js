import Cart from "../models/cartModel.js";

export async function addToCart(req, res) {
  try {
    const { name, img, price, quantity, user, productId } = req.body;

    if (!name || !img || !quantity || !price)
      return res
        .status(400)
        .json({ error: "all product required fields must be provided" });

    const totalPrice = price * quantity;

    const cartItem = await Cart.create({
      name,
      img,
      price,
      quantity,
      user,
      productId,
      totalPrice,
    });

    return res
      .status(200)
      .json({ message: "cart added successfully", cartItem: cartItem });
  } catch (error) {
    console.log("error in addtocart: ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

export async function getCart(req, res) {
  try {
    const { userId } = req.params;
    const cart = await Cart.find({ user: userId });
    res.status(200).json(cart);
  } catch (error) {
    console.log("error in getCart: ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

export async function updatecartdata(req, res) {
  try {
    const { cartItemId, quantity } = req.body;

    if (!cartItemId || !quantity)
      return res
        .status(400)
        .json({ error: "cart item ID and Quantity are missing" });

    const cartItem = await Cart.findById(cartItemId);

    if (!cartItem)
      return res.status(400).json({ error: "cart item not found" });

    cartItem.quantity = quantity;
    cartItem.totalPrice = cartItem.price * quantity;

    await cartItem.save();

    return res
      .status(200)
      .json({ message: "Cart item updated successfully", cartItem });
  } catch (error) {
    console.log("error in updatecartdata: ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

export async function removeCartProduct(req, res) {
  try {
    const { cartId } = req.params;

    const product = await Cart.findById(cartId);

    if (!product) return res.status(404).json({ error: "product not found" });

    await Cart.findByIdAndDelete(cartId);

    res.status(200).json({ message: "Cart product deleted successfully" });
  } catch (error) {
    console.log("error in removeCartProduct: ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

export async function getcartProduct(req, res) {
  try {
    const { productId } = req.params;

    const product = await Cart.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product found", product });
  } catch (error) {
    console.log("Error in getcartProduct: ", error.message);
    return res.status(500).json({ error: error.message });
  }
}
