import Favourite from "../models/favprodModel.js";

export async function addToFavourite(req, res) {
  try {
    const { name, price, category, productId, img, user } = req.body;

    if (!name || !price || !category)
      return res
        .status(404)
        .json({ message: "Invalid product to add to favourite" });

    const existingProduct = await Favourite.findOne({ productId, user });

    if (existingProduct)
      return res
        .status(400)
        .json({ message: "Product already added to favourite" });

    const favouriteProduct = await Favourite.create({
      name,
      price,
      category,
      productId,
      user,
      img,
    });

    res
      .status(200)
      .json({ message: "Product added to favourite", favouriteProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error in addToFavourite", error);
  }
}

export async function getAllFavourites(req, res) {
  try {
    const { userId } = req.params;
    const favourite = await Favourite.find({ user: userId });
    res.status(200).json(favourite);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error in getAllFavourites", error);
  }
}

export async function deleteFavourites(req, res) {
  try {
    const { userId } = req.params;

    const deletedFavourites = await Favourite.deleteMany({ user: userId });

    if (deletedFavourites.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No favourites found for this user" });
    }

    res.status(200).json({
      message: `${deletedFavourites.deletedCount} favourite(s) deleted for user ${userId}`,
      deletedFavourites,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in deleteFavourites", error);
  }
}

export async function removeItem(req, res) {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId)
      return res
        .status(404)
        .json({ message: "Product missing from favourites" });

    const product = await Favourite.findOneAndDelete({
      user: userId,
      productId,
    });

    if (!product)
      return res
        .status(404)
        .json({ message: "Product not found in favourites" });

    res
      .status(200)
      .json({ message: "Product removed from favourites successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error in removeItem from favourite", error);
  }
}
