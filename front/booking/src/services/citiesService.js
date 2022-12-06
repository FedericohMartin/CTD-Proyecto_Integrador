const endpoint = "http://localhost:8080/cities";

const getAll = (signal) => {
    const config = {
        method: "GET",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
        signal: signal,
     };

     return fetch(endpoint, config)
            .then(response => response.json())
}


const citiesService = {getAll,};

export default citiesService;
