package com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo11.digitalbooking.digitalbookingrentalcars.exceptions.BadRequestException;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Category;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.City;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.CategoryRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.CityRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ProductFeatureRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ProductRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.ProductService;
import com.grupo11.digitalbooking.digitalbookingrentalcars.util.FilteredProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CityRepository cityRepository;
    private final CategoryRepository categoryRepository;
    private final ProductFeatureRepository productFeatureRepository;
    private ObjectMapper mapper;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, CityRepository cityRepository, CategoryRepository categoryRepository, ProductFeatureRepository productFeatureRepository, ObjectMapper mapper) {
        this.productRepository = productRepository;
        this.cityRepository = cityRepository;
        this.categoryRepository = categoryRepository;
        this.productFeatureRepository= productFeatureRepository;
        this.mapper = mapper;
    }

    //Agregar producto
    public Product addProduct(Product product){
        Optional<City> city =  cityRepository.findById(product.getCity().getId());
        product.setCity(city.get());
        Optional<Category> category =  categoryRepository.findById(product.getCategory().getId());
        product.setCategory(category.get());
        return productRepository.save(product);
    }

    //Actualizar producto
    public Product updateProduct(Product product){
        Optional<City> ciudad =  cityRepository.findById(product.getCity().getId());
        product.setCity(ciudad.get());
        Optional<Category> category =  categoryRepository.findById(product.getCategory().getId());
        product.setCategory(category.get());
        return productRepository.save(product);
    }

    //Buscar producto
    public Optional<Product> searchProduct(Integer id){
        return productRepository.findById(id);
    }

    //Buscar todos los productos
    public List<Product> listProduct(){
        return productRepository.findAll();
    }

    //Eliminar productos
    public void deleteProduct(Integer id) throws Exception {
        Optional<Product> searchedProduct = searchProduct(id);
        if (searchedProduct.isPresent())
            productRepository.deleteById(id);
        else
            throw new Exception("Product with id: "+id+" not found");

    }
    //Buscar productos por categoría
    public List<Product> searchByCategory(Integer id){
        return productRepository.findByCategoryId(id);
    }

    //Buscar productos por ciudad
    public List<Product> searchByCity(Integer id){
        return productRepository.findByCityId(id);
    }


    public List<Product> getProductsByCityAndDate(FilteredProduct filter) throws BadRequestException {
        //errores
        boolean noNullData = filter.getInitialDate() != null && filter.getFinalDate() != null && filter.getCityId() != null;

        if(!noNullData){throw new BadRequestException("The filter comes with null data");}

        boolean datesAreInOrder = filter.getFinalDate().isAfter(filter.getInitialDate());

        boolean oldCheckIn = LocalDate.now().isAfter(filter.getInitialDate());

        if(!datesAreInOrder){throw new BadRequestException("The dates are in the wrong order or are the same");}

        if(oldCheckIn){throw new BadRequestException("Check In cannot be in the past");}
        //searchByCity(filter.getCityId());
        //TODO: para cuando cree el Service de City: cityService.searchByCity(filter.getCityId());     //si no existe el id, arroja un badRequest

        List<Product> results = productRepository.getProductsByCityAndDates(filter.getCityId(), filter.getInitialDate(), filter.getFinalDate());

        if (results == null){
            //TODO: a verificar
            throw new BadRequestException("No available cars found with your search");
        }else{
            return results;
        }
        //return results;
    };
}
