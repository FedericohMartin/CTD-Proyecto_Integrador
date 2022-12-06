const endpoint = "http://localhost:8080/features";


const add = (payload) => {
    const config = {
        method: "POST",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(payload),
     };

     return fetch(`${endpoint}/addFeature`, config)
            .then(response => response.json())
}

const featureService = {
    add,
}

export default featureService;