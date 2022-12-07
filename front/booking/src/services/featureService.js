const endpoint = "http://ec2-3-20-74-75.us-east-2.compute.amazonaws.com/features";


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