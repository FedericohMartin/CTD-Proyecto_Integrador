const endpoint = "http://ec2-3-20-74-75.us-east-2.compute.amazonaws.com:8080/cities";

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
