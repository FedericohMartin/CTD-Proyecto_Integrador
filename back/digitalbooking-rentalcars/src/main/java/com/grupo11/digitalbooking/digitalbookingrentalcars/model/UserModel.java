package com.grupo11.digitalbooking.digitalbookingrentalcars.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import javax.persistence.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "users")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_users")
    private Integer id;
    private String name;
    private String surname;
    private String email;
    private String password;
    @Column(name = "user_city")
    private String userCity;
    private String username;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "roles_id")
    private UserRole role;
}
