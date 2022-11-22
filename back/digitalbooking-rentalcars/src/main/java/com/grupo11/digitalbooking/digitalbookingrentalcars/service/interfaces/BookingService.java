package com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Booking;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.BookingDTO;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface BookingService {

    Booking saveBooking(BookingDTO dto);

    Optional<Booking> searchBooking(Integer id);

    void deleteBooking(Integer id) throws Exception;

    Set<Booking> listBookings();

    List<Booking> findByUserId(Integer users_id);

    List<Booking> findByProductId(Integer products_id);

    Object newBooking(BookingDTO booking);
}
