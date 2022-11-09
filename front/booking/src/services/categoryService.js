const endpoint = "http://localhost:8080/categories";

const getAll = () => {
    const config = {
        method: "GET",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
     };

     return fetch(endpoint, config)
            .then(response => response.json())
}


const categoryService = {getAll,};

export default categoryService;