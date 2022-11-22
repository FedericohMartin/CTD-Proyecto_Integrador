package com.grupo11.digitalbooking.digitalbookingrentalcars.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_products")
    private Integer id;
    private String name;
    private String description;
    private Integer stock;
    private Integer carryOn;
    private Integer suitcase;

    //Ticket Nº 27
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "cities_id")
    @ToString.Exclude
    private City city;

    //Ticket Nº 22
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "categories_id")
    @ToString.Exclude
    private Category category;

    //Ticket Nº 30
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product", fetch = FetchType.LAZY, orphanRemoval = true)
    @ToString.Exclude
    private List<ProductImage> images = new ArrayList<>();

    //Ticket Nº 24
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "product", fetch = FetchType.LAZY, orphanRemoval = true)
    @ToString.Exclude
    private List<ProductFeature> features = new ArrayList<>();

}
