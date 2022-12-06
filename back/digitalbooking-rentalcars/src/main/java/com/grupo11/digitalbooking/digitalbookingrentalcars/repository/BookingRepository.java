package com.grupo11.digitalbooking.digitalbookingrentalcars.repository;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//Ticket Nº 59 (Creación de servicios mediante JPARepository).
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findByUserId(Integer users_id);
    List<Booking> findByProductId(Integer products_id);

}
