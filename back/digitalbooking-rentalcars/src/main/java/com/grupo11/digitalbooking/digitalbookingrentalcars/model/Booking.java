package com.grupo11.digitalbooking.digitalbookingrentalcars.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_bookings")
    private Integer id;
    private LocalTime hour;
    private LocalDate initialDate;
    private LocalDate finalDate;
    private Integer userId;


    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    @JoinColumn(name = "product_id")
    private Product product;

    //Ticket Nº 58 (Mapeo de las tablas “usuarios” y "reservas" con clases de nuestro modelo).
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    @JoinColumn(name = "users_id")
    private UserModel userModel;

}
