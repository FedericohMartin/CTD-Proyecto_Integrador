package com.grupo11.digitalbooking.digitalbookingrentalcars.repository;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
