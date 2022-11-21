package com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo11.digitalbooking.digitalbookingrentalcars.exceptions.ResourceNotFoundException;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Booking;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.UserModel;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.BookingRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ProductRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.UserRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    ObjectMapper mapper;

    public Optional<Booking> searchBooking(Integer id) {
        return bookingRepository.findById(id);
    }

    public Booking saveBooking(Booking booking) {
        UserModel userModel = userRepository.findById(booking.getUserModel().getId()).get();
        Product product = productRepository.findById(booking.getProduct().getId()).get();

        booking.setUserModel(userModel);
        booking.setProduct(product);

        return bookingRepository.save(booking);
    }

    public Booking newBooking(Booking booking) {
        return saveBooking(booking);
    }

    public void deleteBooking(Integer id) throws ResourceNotFoundException {
        Optional<Booking> bookingFound = searchBooking(id);
        if (bookingFound.isPresent()) {
            bookingRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException(
                    "The reservation with id: " + id + " could not be deleted. Reservation NOT found");
        }
    }

    public List<Booking> listBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        Set<Booking> bookings1 = new HashSet<>();

        for (Booking booking : bookings) {
            bookings1.add(mapper.convertValue(booking, Booking.class));
        }
        return (List<Booking>) bookings1;
    }

    public List<Booking> findByUserId(Integer id) {
        return bookingRepository.findByUserId(id);
    }

}
