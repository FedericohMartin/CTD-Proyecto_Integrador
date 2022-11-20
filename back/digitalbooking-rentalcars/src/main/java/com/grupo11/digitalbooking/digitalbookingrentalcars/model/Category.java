package com.grupo11.digitalbooking.digitalbookingrentalcars.model;

import lombok.*;

import javax.persistence.*;

//Create the table "categories" in the db
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

//Name of the table in the db
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_categories")
    private Integer id;
    private String title;
    private String description;
    private String imgUrl;
}
