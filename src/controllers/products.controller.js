import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user : req.user.id }).populate('user');
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      user: req.user.id,
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Producto no encontrado." });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const productUpdated = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { name, description, price, quantity },
      { new: true }
    );
    return res.json(productUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado." });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchProduct = async (req, res) => {
  try {
    // const { name } = req.body
    const name = req.query.name;
    const userId = req.user.id;
    // Obtiene el término de búsqueda de la consulta de la URL. 
    //req.query.name para obtener el valor del parámetro de consulta name de la URL de la solicitud.
    const escapedProductSearch = name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`^${escapedProductSearch}`, "i");
    
    const productSearch = await Product.find({ 
      name: { $regex: regex },
      user: userId 
    }).populate('user');

    // const productSearch = await Product.find({ 
    //   name: { $regex: name, $options: 'i' },
    //   user: userId 
    // }).populate('user');

    //$regex para realizar una búsqueda por coincidencia parcial del nombre 
    //$options: 'i' para que la búsqueda sea insensible a mayúsculas y minúsculas.
    return res.json(productSearch);  
  } catch (error) {
    console.log(">>>>>>>>>>>>>>>>ERROR EN CONTROLLER")
    return res.status(500).json({ message: error.message });
  }
};