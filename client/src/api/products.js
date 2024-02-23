import axios from "./axios.js";

export const getProductsRequest = () => axios.get(`/products`);

export const getProductRequest = (id) => axios.get(`/products/${id}`);

export const createProductRequest = (product) => axios.post(`/products`, product);

export const updateProductRequest = (id, product) =>
  axios.put(`/products/${id}`, product);//la tarea va concatenada con su id p saber que tarea modificar

export const deleteProductRequest = (id) => axios.delete(`/products/${id}`);

export const searchProductRequest = (name) => axios.get(`/products?name=${name}`);

// export const searchProductRequest = (name) => {
//   try {
//     axios.get(`/products?name=${name}`);
//     // console.log(res.data)
//   } catch (error) {
//     console.log(">>>searchProductRequest");
//     console.error(error)
//   }
// };,
