package com.grupo11.digitalbooking.digitalbookingrentalcars.model;

import lombok.*;

import javax.persistence.*;

//Crear la tabla "categorias" en la db
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

//Nombre de la tabla en la db
@Entity
@Table(name = "categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String titulo;
    private String descripcion;
    private String urlImg;
}
