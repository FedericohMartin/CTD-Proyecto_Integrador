const endpoint = "http://ec2-3-20-74-75.us-east-2.compute.amazonaws.com:8080";


const add = (payload) => {
    const config = {
        method: "POST",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json; charset=UTF-8",},
        body: JSON.stringify(payload),
     };

     return fetch(`${endpoint}/users/addUser`, config)
            .then(response => response.json())
}

const authorization = (payload) => {
    const config = {
        method: "POST",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json; charset=UTF-8", },
        body: JSON.stringify(payload),
     };

     return fetch(`${endpoint}/authenticate`, config)
            .then(response => response.json())
}

const userService = {add,authorization};

export default userService;

