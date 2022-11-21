package com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo11.digitalbooking.digitalbookingrentalcars.exceptions.BadRequestException;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Category;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.City;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.ProductList;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.CategoryRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.CityRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ProductFeatureRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ProductRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.ProductService;
import com.grupo11.digitalbooking.digitalbookingrentalcars.util.FilteredProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CityRepository cityRepository;
    private final CategoryRepository categoryRepository;
    private final ProductFeatureRepository productFeatureRepository;
    private ObjectMapper mapper;

    private final Integer LIMIT_RANDOM = 3;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, CityRepository cityRepository, CategoryRepository categoryRepository, ProductFeatureRepository productFeatureRepository, ObjectMapper mapper) {
        this.productRepository = productRepository;
        this.cityRepository = cityRepository;
        this.categoryRepository = categoryRepository;
        this.productFeatureRepository= productFeatureRepository;
        this.mapper = mapper;
    }

    public Product addProduct(Product product){
        Optional<City> city =  cityRepository.findById(product.getCity().getId());
        product.setCity(city.get());
        Optional<Category> category =  categoryRepository.findById(product.getCategory().getId());
        product.setCategory(category.get());
        return productRepository.save(product);
    }

    public Product updateProduct(Product product){
        Optional<City> ciudad =  cityRepository.findById(product.getCity().getId());
        product.setCity(ciudad.get());
        Optional<Category> category =  categoryRepository.findById(product.getCategory().getId());
        product.setCategory(category.get());
        return productRepository.save(product);
    }

    public Optional<Product> searchProduct(Integer id){
        return productRepository.findById(id);
    }

    public ProductList listProduct(){
        List<Product> items = productRepository.findAll();
        ProductList response = new ProductList();
        response.setItems(items);
        response.setTotal(items.size());

        return response;
    }

    public void deleteProduct(Integer id) throws Exception {
        Optional<Product> searchedProduct = searchProduct(id);
        if (searchedProduct.isPresent())
            productRepository.deleteById(id);
        else
            throw new Exception("Product with id: "+id+" not found");

    }

    public ProductList searchByCategory(Integer id){
        List<Product> items = productRepository.findByCategoryId(id);
        ProductList response = new ProductList();
        response.setItems(items);
        response.setTotal(items.size());

        return response;
    }

    public ProductList searchByCity(Integer id){
        List<Product> items = productRepository.findByCityId(id);
        ProductList response = new ProductList();
        response.setItems(items);
        response.setTotal(items.size());

        return response;
    }
    //Ticket Nº 55
    public List<Product> getProductsByCityAndDate(FilteredProduct filter) throws BadRequestException {
        //errores
        boolean noNullData = filter.getInitialDate() != null && filter.getFinalDate() != null && filter.getCityId() != null;

        if(!noNullData){throw new BadRequestException("The filter comes with null data");}

        boolean datesAreInOrder = filter.getFinalDate().isAfter(filter.getInitialDate());

        boolean oldCheckIn = LocalDate.now().isAfter(filter.getInitialDate());

        if(!datesAreInOrder){throw new BadRequestException("The dates are in the wrong order or are the same");}

        if(oldCheckIn){throw new BadRequestException("Check In cannot be in the past");}

        List<Product> results = productRepository.getProductsByCityAndDates(filter.getCityId(), filter.getInitialDate(), filter.getFinalDate());

        if (results == null){

            throw new BadRequestException("No available cars found with your search");
        }else{
            return results;
        }

    }


    //Ticket Nº 32 (Mostrar productos aleatorios)
    @Override
    public List<Product> randomProducts() {
        List<Category> categories = categoryRepository.findAll();
        Collections.shuffle(categories);
        Integer indexEnd = categories.size() < LIMIT_RANDOM ? categories.size()-1 : LIMIT_RANDOM -1;
        List<Category> categoriesSubList = categories.subList(0, indexEnd);
        if (categories.isEmpty()){
            return Collections.EMPTY_LIST;
        }
        List<Product> products = productRepository
                .findByCategoryIds(
                        categoriesSubList
                                .stream()
                                .map(Category::getId)
                                .toList()
                );
        Collections.shuffle(products);
        return products.subList(0, getRandomNumber(0, products.size() -1));//Map: toma un objeto, lo convierte y devuelve siempre la misma cantidad. Transforma la lista de categorías en una lista de enteros (misma cantidad).
    }

    public int getRandomNumber(int min, int max) {
        Random random = new Random();
        return random.ints(min, max)
                .findFirst()
                .getAsInt();
    }
}
