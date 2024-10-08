import Cart from "../models/cartModel.js";

export async function addToCart(req, res) {
  try {
    const { name, img, price, quantity, user, productId } = req.body;

    if (!name || !img || !quantity || !price)
      return res
        .status(400)
        .json({ error: "all product required fields must be provided" });

    let cartItem = await Cart.findOne({ productId, user });

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.totalPrice = cartItem.price * cartItem.quantity;
    } else {
      const totalPrice = price * quantity;

      cartItem = await Cart.create({
        name,
        img,
        price,
        quantity,
        user,
        productId,
        totalPrice,
      });
    }

    await cartItem.save();

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

export async function removeItemFromCart(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    await Favourite.deleteMany({ user: userId });

    res.status(200).json({ message: "All favourites cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error clearing favourites", error);
  }
}
