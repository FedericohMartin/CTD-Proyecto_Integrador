const endpoint = "http://localhost:8080/products";

const getAll = () => {
    const config = {
        method: "GET",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json; charset=UTF-8" },
     };

     return fetch(endpoint+"/bringAll", config)
            .then(response => response.json())

}

const getById = (id) => {
    const config = {
        method: "GET",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json; charset=UTF-8" },
     };

    return fetch(`${endpoint}/searchProductById/${id}`, config)
           .then(response => response.json())
}

const getByCityId = (id) => {
    const config = {
        method: "GET",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
     };

    return fetch(`${endpoint}/city/${id}`, config)
           .then(response => response.json())
}

const getByCategoryId= (id) => {
    const config = {
        method: "GET",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
     };

    return fetch(`${endpoint}/category/${id}`, config)
           .then(response => response.json())
}

const getByDates = (payload) => {
    const config = {
        method: "GET",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
     };

    return fetch(`${endpoint}/searchByDates?initialDate=${payload.dateRange.startDate?.toISOString().split('T')[0]}&finalDate=${payload.dateRange.endDate?.toISOString().split('T')[0]}`, config)
           .then(response => response.json())
}

const getBycityAndDates = (payload) => {
    const config = {
        method: "GET",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
     };

    return fetch(`${endpoint}/search?cityId=${payload.city}&initialDate=${payload.dateRange.startDate?.toISOString().split('T')[0]}&finalDate=${payload.dateRange.endDate?.toISOString().split('T')[0]}`, config)
           .then(response => response.json())
}

const productService = {
    getAll,
    getById,
    getByCityId,
    getByCategoryId,
    getBycityAndDates,
    getByDates,
}

export default productService;