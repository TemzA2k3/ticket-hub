package com.amazon.tickethub.service;

import com.amazon.tickethub.dto.category.CategoryCountDTO;
import com.amazon.tickethub.entity.Category;
import com.amazon.tickethub.repository.CategoryRepository;
import com.amazon.tickethub.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final EventRepository eventRepository;

    public CategoryService(CategoryRepository categoryRepository, EventRepository eventRepository) {
        this.categoryRepository = categoryRepository;
        this.eventRepository = eventRepository;
    }

    public List<CategoryCountDTO> getCategoriesWithEventCounts() {
        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(category -> new CategoryCountDTO(
                        category.getName(),
                        eventRepository.countByCategory(category)
                ))
                .toList();
    }
}
