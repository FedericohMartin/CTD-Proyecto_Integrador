package com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo11.digitalbooking.digitalbookingrentalcars.exceptions.BadRequestException;
import com.grupo11.digitalbooking.digitalbookingrentalcars.exceptions.ProductNotFoundException;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.*;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.ProductDTO;
<<<<<<< HEAD
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.ProductUpdateDTO;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.CategoryRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.CityRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.FeatureRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ProductRepository;
=======
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.ProductList;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.ProductUpdateDTO;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.*;
>>>>>>> b259c9a65ccc642016d7ce740431e1f1958046f3
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.ProductService;
import com.grupo11.digitalbooking.digitalbookingrentalcars.util.FilteredProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CityRepository cityRepository;
    private final CategoryRepository categoryRepository;
    private final FeatureRepository featureRepository;
    private ObjectMapper mapper;

    private final Integer LIMIT_RANDOM = 3;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository,
                              CityRepository cityRepository,
                              CategoryRepository categoryRepository,
                              FeatureRepository featureRepository,
                              ObjectMapper mapper) {
        this.productRepository = productRepository;
        this.cityRepository = cityRepository;
        this.categoryRepository = categoryRepository;
        this.featureRepository = featureRepository;
        this.mapper = mapper;
    }

    @Transactional(rollbackFor = Exception.class)
    public Product addProduct(ProductDTO dto){

        City city =  cityRepository
                .findById(dto.getCityId())
                .orElseThrow(() -> new RuntimeException("City not found"));

        Category category =  categoryRepository
                .findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setStock(dto.getStock());
        product.setCarryOn(dto.getCarryOn());
        product.setSuitcase(dto.getSuitcase());
        product.setCity(city);
        product.setCategory(category);

        List<ProductImage> productImages = dto
                .getImages()
                .stream()
                .map(imgUrl -> {
                    Image img = new Image();
                    img.setName(product.getName());
                    img.setImgUrl(imgUrl);
                    return img;
                }).map(image -> {
                    ProductImage productImage = new ProductImage();
                    productImage.setProduct(product);
                    productImage.setImage(image);
                    return productImage;
                }).toList();

        List<ProductFeature> productFeatures = featureRepository
                .findByFeatureIds(dto.getFeature_ids())
                .stream()
                .map(feature -> {
                    ProductFeature productFeature = new ProductFeature();
                    productFeature.setProduct(product);
                    productFeature.setFeature(feature);
                    return productFeature;
                }).toList();

        product.getImages().addAll(productImages);
        product.getFeatures().addAll(productFeatures);

        return productRepository.save(product);
    }

    public Product updateProduct(ProductUpdateDTO dto){
        Product  product = searchProduct(dto.getId())
                .orElseThrow(() -> new ProductNotFoundException(dto.getId()));

        City city =  cityRepository
                .findById(dto.getCityId())
                .orElseThrow(() -> new RuntimeException("City not found"));

        Category category =  categoryRepository
                .findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        List<ProductImage> productImages = dto
                .getImages()
                .stream()
                .map(img ->
                        product.getImages()
                                .stream()
                                .filter(x -> x.getImage().getId().equals(img.getId()))
                                .toList()
                                .stream()
                                .findFirst()
                                .map(x -> {
                                    x.getImage().setName(img.getName());
                                    x.getImage().setImgUrl(img.getImgUrl());
                                    return x;
                                })
                                .orElse(new ProductImage(null, product, new Image(img.getId(), img.getName(), img.getImgUrl()))))
                .toList();

        List<ProductFeature> productFeatures = featureRepository
                .findByFeatureIds(dto.getFeature_ids())
                .stream()
                .map(feature -> product.getFeatures()
                        .stream()
                        .filter(featureProduct ->
                                Objects.equals(
                                        featureProduct.getFeature().getId(), feature.getId())
                        ).toList().stream().findFirst()
                        .orElse(new ProductFeature(null, product, feature))).toList();

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setStock(dto.getStock());
        product.setCarryOn(dto.getCarryOn());
        product.setSuitcase(dto.getSuitcase());
        product.setCity(city);
        product.setCategory(category);
        product.getImages().clear();
        product.getFeatures().clear();
        product.getImages().addAll(productImages);
        product.getFeatures().addAll(productFeatures);

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

    @Override
    public ProductList searchByDates(LocalDate initialDate, LocalDate finalDate) throws BadRequestException {
        boolean noNullData = initialDate != null && finalDate != null;

        if(!noNullData){throw new BadRequestException("The filter comes with null data");}

        boolean datesAreInOrder = finalDate.isAfter(initialDate);

        boolean oldCheckIn = LocalDate.now().isAfter(initialDate);

        if(!datesAreInOrder){throw new BadRequestException("The dates are in the wrong order or are the same");}

        if(oldCheckIn){throw new BadRequestException("Check In cannot be in the past");}

        List<Product> items = productRepository.getProductsByDate(initialDate, finalDate);

        ProductList response = new ProductList();
        response.setItems(items);
        response.setTotal(items.size());

        if (items == null){

            throw new BadRequestException("No available cars found with your search");
        }else{
            return response;
        }
    }

<<<<<<< HEAD
    public List<Product> getProductsByCityAndDate(FilteredProduct filter) throws BadRequestException {
=======

    //Ticket Nº 55
    public ProductList getProductsByCityAndDate(FilteredProduct filter) throws BadRequestException {
>>>>>>> b259c9a65ccc642016d7ce740431e1f1958046f3
        //errores
        boolean noNullData = filter.getInitialDate() != null && filter.getFinalDate() != null && filter.getCityId() != null;

        if(!noNullData){throw new BadRequestException("The filter comes with null data");}

        boolean datesAreInOrder = filter.getFinalDate().isAfter(filter.getInitialDate());

        boolean oldCheckIn = LocalDate.now().isAfter(filter.getInitialDate());

        if(!datesAreInOrder){throw new BadRequestException("The dates are in the wrong order or are the same");}

        if(oldCheckIn){throw new BadRequestException("Check In cannot be in the past");}
        //searchByCity(filter.getCityId());
        //TODO: para cuando cree el Service de City: cityService.searchByCity(filter.getCityId());     //si no existe el id, arrojará un badRequest

<<<<<<< HEAD
        List<Product> results = productRepository.getProductsByCityAndDates(
                filter.getCityId(),
                filter.getInitialDate(),
                filter.getFinalDate()
        );

        if (results == null){
            //TODO: a verificar
=======
        List<Product> items = productRepository.getProductsByCityAndDates(filter.getCityId(), filter.getInitialDate(), filter.getFinalDate());
        ProductList response = new ProductList();
        response.setItems(items);
        response.setTotal(items.size());

        if (items == null){

>>>>>>> b259c9a65ccc642016d7ce740431e1f1958046f3
            throw new BadRequestException("No available cars found with your search");
        }else{
            return response;
        }
        //return results;
    }


    //Ticket Nº 32 (Mostrar productos aleatorios)
    @Override
    public List<Product> randomProducts() {
        List<Category> categories = categoryRepository.findAll();
        Collections.shuffle(categories);
        Integer indexEnd = categories.size() < LIMIT_RANDOM ? categories.size()-1 : LIMIT_RANDOM -1;
        List<Category> categoriesSubList = categories.subList(0, indexEnd);
        if (categories.isEmpty()){
            return Collections.emptyList();
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
