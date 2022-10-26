package com.grupo11.digitalbooking.digitalbookingrentalcars.service;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Category;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//CRUD of Categories
@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    //Add logger

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    //Add category (CREATE)
    public Category addCategory(Category category){
        return categoryRepository.save(category);
    }

    //Search category (READ)
    public Optional<Category> searchCategory(Integer id){
        return categoryRepository.findById(id);
    }

    //Update category (UPDATE)
    public Category updateCategory(Category category){
        return categoryRepository.save(category);
    }

    //Delete category (DELETE)
    public void deleteCategory (Integer id) throws Exception {
        Optional<Category> searchedCategory = searchCategory(id);
        if (searchedCategory.isPresent())
            categoryRepository.deleteById(id);
        else
            throw new Exception("Category not found");
    }

    //Bring all categories
    public List<Category> listCategories(){

        List<Category> categories= categoryRepository.findAll();

        return categories;
    }
}
