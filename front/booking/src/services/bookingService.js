const endpoint = 'http://localhost:8080/booking';

const add = (payload) => {
    const config = {
        method: "POST",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json; charset=UTF-8" },
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

const bookingService = {
    getBookingsByProdId,
    add,
}

export default bookingService;