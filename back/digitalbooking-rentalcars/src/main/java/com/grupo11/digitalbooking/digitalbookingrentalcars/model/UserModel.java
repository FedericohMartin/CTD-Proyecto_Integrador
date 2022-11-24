package com.grupo11.digitalbooking.digitalbookingrentalcars.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "users")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< HEAD
    @Column(name = "id_users")
=======
    @Column(name="id_users")
>>>>>>> b259c9a65ccc642016d7ce740431e1f1958046f3
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
    /* @Enumerated(EnumType.STRING)*/
    private UserRole role;
}
