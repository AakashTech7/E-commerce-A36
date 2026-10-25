package com.study.ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.study.ecommerce.entities.Category;
import com.study.ecommerce.projections.CategoryProjection;

@RepositoryRestResource(path = "categories",excerptProjection=CategoryProjection.class)
@CrossOrigin(origins = "http://localhost:5173")
public interface CategoryRepository extends JpaRepository<Category, Integer>{

}
