package com.grupo11.digitalbooking.digitalbookingrentalcars.service;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    Category addCategory(Category category);

    Optional<Category> searchCategory(Integer id);

    Category updateCategory(Category category);

    void deleteCategory (Integer id) throws Exception;

    List<Category> listCategories();

}
