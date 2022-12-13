const endpoint = 'http://ec2-3-20-74-75.us-east-2.compute.amazonaws.com:8080/bookings';

const add = (payload) => {
    const config = {
        method: "POST",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json; charset=UTF-8",
                    authorization: `Bearer ${payload.jwt}` },
        body: JSON.stringify(payload),
     };

     return fetch(`${endpoint}/saveBooking`, config)
            .then(response => response.json())
}

const getBookingsByProdId = (id, signal) => {
    const config = {
        method: "GET",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        signal: signal,
     };

     return fetch(`${endpoint}/listByProduct/${id}`, config)
            .then(response => response.json())
}

const getBookingsByUserId = (id, signal) => {
    const config = {
        method: "GET",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        signal: signal,
     };

     return fetch(`${endpoint}/listByUser/${id}`, config)
            .then(response => response.json())
}

const deleteById = (id, token) => {
    const config = {
        method: "DELETE",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json; charset=UTF-8",
                    authorization:`Bearer ${token}` },
     };

     return fetch(`${endpoint}/deleteBooking/${id}`, config)
            .then(response => response.json())
}

const bookingService = {
    getBookingsByProdId,
    getBookingsByUserId,
    deleteById,
    add,
}

export default bookingService;