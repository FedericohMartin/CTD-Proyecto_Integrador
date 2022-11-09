const endpoint = "http://localhost:8080/products";

const getAll = () => {
    const config = {
        method: "GET",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
     };

     return fetch(endpoint+"/bringAll", config)
            .then(response => response.json())

}

const getById = (id) => {
    const config = {
        method: "GET",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
     };

    return fetch(`${endpoint}/searchProductById/${id}`, config)
           .then(response => response.json())
}

const productService = {
    getAll,
    getById,
}

export default productService;