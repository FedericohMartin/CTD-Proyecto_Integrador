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
    private Boolean carry_on;
    private Boolean suitcase;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "cities_id")
    private City city;

    //Ticket Nº 22
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "id_categories")
    private Category category;

    //Ticket Nº 24
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<ProductFeature> features = new ArrayList<>();

}
