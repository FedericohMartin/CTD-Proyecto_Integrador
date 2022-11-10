package com.grupo11.digitalbooking.digitalbookingrentalcars.repository;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByCategoryId(Integer id_categories);

    List<Product> findByImageId(Integer id);

    List<Product> findByCityId(Integer cities_id);

    @Query( value = "select P.* from products P where P.categories_id in :ids", nativeQuery = true )
    List<Product> findByCategoryIds(@Param("ids") List<Integer> categoryIdList);

    @Query(value = "select P.* from products P " +
            "where P.cities_id = ?1 " +
            "and P.id not in ( " +
            "    select distinct R.products_id " +
            "    from reservas R " +
            "    where (R.fecha_final > ?2 and R.fecha_inicial < ?3) " +
            ")" +
            " group by P.id; ", nativeQuery = true)
    List<Product> getProductsByCityAndDates(Integer cities_id,
                                             LocalDate initialDate,
                                             LocalDate finalDate);

}
