package com.grupo11.digitalbooking.digitalbookingrentalcars.repository;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Booking;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

//Ticket Nº 59
//Creación de servicios mediante JPARepository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findByUserId(Integer users_id);
    List<Booking> findByProductId(Integer products_id);

    //Ticket Nº 55
    @Query("SELECT b FROM Booking b WHERE b.booking.name = :initialDate")//JPQL
    List<Product>findByInitialDate(@Param("initialDate") String initialDate);

    @Query("SELECT b FROM Booking b WHERE b.booking.name = :finalDate")//JPQL
    List<Product>findByFinalDate(@Param("finalDate") String finalDate);

}
