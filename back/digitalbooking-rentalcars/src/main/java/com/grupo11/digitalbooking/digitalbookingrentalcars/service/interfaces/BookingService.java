package com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Booking;

import java.util.List;
import java.util.Optional;

public interface BookingService {

    Booking saveBooking(Booking booking);

    Optional<Booking> searchBooking(Integer id);

    void deleteBooking(Integer id) throws Exception;

    List<Booking> listBookings();

    List<Booking> findByUserId(Integer users_id);

    List<Booking> findByProductId(Integer products_id);

    Object newBooking(Booking booking);
}
