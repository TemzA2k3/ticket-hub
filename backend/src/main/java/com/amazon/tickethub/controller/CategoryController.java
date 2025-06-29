package com.amazon.tickethub.controller;

import com.amazon.tickethub.dto.category.CategoryCountDTO;
import com.amazon.tickethub.service.CategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<CategoryCountDTO> getCategoriesWithCounts() {
        return categoryService.getCategoriesWithEventCounts();
    }
}
