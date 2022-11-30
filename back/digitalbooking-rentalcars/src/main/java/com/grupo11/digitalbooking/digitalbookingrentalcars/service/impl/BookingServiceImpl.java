package com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo11.digitalbooking.digitalbookingrentalcars.exceptions.ResourceNotFoundException;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Booking;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.UserModel;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.BookingDTO;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.BookingRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ProductRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.UserRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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

    public Booking saveBooking(BookingDTO dto) {
        UserModel userModel = userRepository.findById(dto.getUserId()).get();
        Product product = productRepository.findById(dto.getProductId()).get();

        Booking booking = new Booking();
        booking.setHour(LocalTime.parse(dto.getHour()));
        booking.setInitialDate(stringToLocalDateTime(dto.getInitialDate()));
        booking.setFinalDate(stringToLocalDateTime(dto.getFinalDate()));
        booking.setUserId(dto.getUserId());
        booking.setUserModel(userModel);
        booking.setProduct(product);

        return bookingRepository.save(booking);
    }

    public Booking newBooking(BookingDTO booking) {
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

    public Set<Booking> listBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        Set<Booking> bookings1 = new HashSet<>();

        for (Booking booking : bookings) {
            bookings1.add(mapper.convertValue(booking, Booking.class));
        }
        return bookings1;
    }

    public List<Booking> findByUserId(Integer id) {
        return bookingRepository.findByUserId(id);
    }

    public List<Booking> findByProductId(Integer id) {
        return bookingRepository.findByProductId(id);
    }


    public LocalDate stringToLocalDateTime(String stringDate){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(stringDate, formatter);
        return date;
    }
}
