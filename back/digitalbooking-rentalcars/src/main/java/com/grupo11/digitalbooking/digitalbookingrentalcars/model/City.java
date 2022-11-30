package com.grupo11.digitalbooking.digitalbookingrentalcars.model;

import lombok.*;
import javax.persistence.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//Ticket Nº 26
@Entity
@Table(name="cities")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_cities")
    private Integer id;
    private String name;
    private String country;
    private String state;
}
