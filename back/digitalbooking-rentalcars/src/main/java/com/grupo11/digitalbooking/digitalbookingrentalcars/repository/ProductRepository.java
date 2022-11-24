package com.grupo11.digitalbooking.digitalbookingrentalcars.repository;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByCategoryId(Integer id_categories);

    List<Product> findByCityId(Integer cities_id);

    @Query( value = "select P.* from products P where P.categories_id in :ids", nativeQuery = true )
    List<Product> findByCategoryIds(@Param("ids") List<Integer> categoryIdList);

    @Query(value = "select P.* from products P\n" +
            "where P.id_products not in ( select B.product_id from bookings B \n" +
            "where (B.initial_date >= :initial_date AND B.final_date <= :final_date)\n" +
            "OR (:initial_date between B.initial_date AND B.final_date)\n" +
            "OR (:final_date between B.initial_date AND B.final_date)\n" +
            " group by B.product_id " +
            "HAVING count(B.product_id)=P.stock);", nativeQuery = true)
    List<Product> getProductsByDate(LocalDate initial_date, LocalDate final_date);

    @Query(value = "select P.* from products P " +
            "where P.cities_id = ?1 " +
            "and P.id_products not in ( select B.product_id from bookings B \n" +
            "where (B.initial_date >= ?2 AND B.final_date <= ?3)\n" +
            "OR (?2 between B.initial_date AND B.final_date)\n" +
            "OR (?3 between B.initial_date AND B.final_date)\n" +
            " group by B.product_id " +
            "HAVING count(B.product_id)=P.stock);"
            , nativeQuery = true)
    List<Product> getProductsByCityAndDates(Integer cities_id,
                                             LocalDate initialDate,
                                             LocalDate finalDate);

}
