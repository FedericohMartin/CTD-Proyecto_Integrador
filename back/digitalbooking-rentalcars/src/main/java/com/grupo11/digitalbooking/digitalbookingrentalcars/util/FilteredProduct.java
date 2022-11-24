package com.grupo11.digitalbooking.digitalbookingrentalcars.util;

import java.time.LocalDate;
//Ticket Nº 55
public class FilteredProduct {

    //Attributes
    private LocalDate initialDate;
    private LocalDate finalDate;
    private Integer cityId;
    private Integer categoryId;
    private Integer offset;
    private Integer limit;

    public FilteredProduct(LocalDate initialDate, LocalDate finalDate, Integer cityId, Integer categoryId) {
        this.initialDate = initialDate;
        this.finalDate = finalDate;
        this.cityId = cityId;
        this.categoryId = categoryId;
    }

    public FilteredProduct() {
    }

    public LocalDate getInitialDate() {
        return initialDate;
    }

    public void setInitialDate(LocalDate initialDate) {
        this.initialDate = initialDate;
    }

    public LocalDate getFinalDate() {
        return finalDate;
    }

    public void setFinalDate(LocalDate finalDate) {
        this.finalDate = finalDate;
    }

    public Integer getCityId() {
        return cityId;
    }

    public void setCityId(Integer cityId) {
        this.cityId = cityId;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }
}
