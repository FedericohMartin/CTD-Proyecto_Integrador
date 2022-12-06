package com.grupo11.digitalbooking.digitalbookingrentalcars.controller;

import com.grupo11.digitalbooking.digitalbookingrentalcars.handler.ResponseHandler;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Booking;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.BookingDTO;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @GetMapping("/listBooking")
    public ResponseEntity<Object> listBooking() throws Exception{
        return ResponseHandler.generateResponse("Reservation list", HttpStatus.OK, bookingService.listBookings());
    }

    //Ticket Nº 59
    @PostMapping("/saveBooking")
    public ResponseEntity<Object> saveBooking(@RequestBody BookingDTO booking) throws Exception{
        return ResponseHandler.generateResponse("The reservation was successfully saved", HttpStatus.CREATED, bookingService.newBooking(booking));
    }

    @GetMapping("/searchBooking/{id}")
    public ResponseEntity<Object> searchBooking(@PathVariable Integer id) throws Exception{
        return ResponseHandler.generateResponse("The reservation was found", HttpStatus.OK, bookingService.searchBooking(id));
    }

    @DeleteMapping("/deleteBooking/{id}")
    public ResponseEntity<Object> deleteBooking(@PathVariable Integer id) throws Exception{
        ResponseEntity<Object> response = null;

        if (bookingService.searchBooking(id).isPresent()) {

            bookingService.deleteBooking(id);
            response = ResponseHandler.generateResponse("Reservation removed", HttpStatus.OK, null);

        }else {
            response = ResponseHandler.generateResponse("Reservation NOT found", HttpStatus.NOT_FOUND, null);
        }
        return response;

    }

    //Endpoint para buscar reservas por usuario
    @GetMapping("/listByUser/{id}")
    public ResponseEntity<Object> listBookingsByUser(@PathVariable Integer id) throws Exception{
        ResponseEntity<Object> response = null;
        if (bookingService.findByUserId(id).isEmpty()){
            response = ResponseHandler.generateResponse("The user has no reservations", HttpStatus.NOT_FOUND, null);
        }else {
            response=ResponseHandler.generateResponse("Reservation list", HttpStatus.OK, bookingService.findByUserId(id));
        }
        return response;
    }

    //Ticket Nº 59
    //Consulta de reservas por Id de Producto
    @GetMapping("/listByProduct/{id}")
    public ResponseEntity<Object> listBookingsByProductId(@PathVariable Integer id) throws Exception{
        ResponseEntity<Object> response = null;
        if (bookingService.findByProductId(id).isEmpty()){
            response = ResponseHandler.generateResponse("The product has no reservations", HttpStatus.NOT_FOUND, null);
        }else {
            response=ResponseHandler.generateResponse("Reservation list", HttpStatus.OK, bookingService.findByProductId(id));
        }
        return response;
    }
}
