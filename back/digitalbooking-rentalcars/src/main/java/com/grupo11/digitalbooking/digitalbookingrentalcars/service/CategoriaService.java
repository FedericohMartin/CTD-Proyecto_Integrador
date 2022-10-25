package com.grupo11.digitalbooking.digitalbookingrentalcars.service;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Categoria;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//CRUD de Categorias
@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;
    //Agregar logger

    @Autowired
    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    //Agregar categoria (CREATE)
    public Categoria agregarCategoria(Categoria categoria){
        return categoriaRepository.save(categoria);
    }

    //Buscar categoria (READ)
    public Optional<Categoria> buscarCategoria(Integer id){
        return categoriaRepository.findById(id);
    }

    //Actualizar categoria (UPDATE)
    public Categoria actualizarCategoria(Categoria categoria){
        return categoriaRepository.save(categoria);
    }

    //Eliminar categoria (DELETE)
    public void eliminarCategoria (Integer id) throws Exception {
        Optional<Categoria> categoriaBuscada = buscarCategoria(id);
        if (categoriaBuscada.isPresent())
            categoriaRepository.deleteById(id);
        else
            throw new Exception("Categoría no encontrada");
    }

    //Traer todas las categorias
    public List<Categoria> listarCategorias(){

        List<Categoria> categorias= categoriaRepository.findAll();

        return categorias;
    }
}
