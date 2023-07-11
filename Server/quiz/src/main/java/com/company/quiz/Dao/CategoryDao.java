package com.company.quiz.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.quiz.Models.Category;

public interface CategoryDao extends JpaRepository<Category,Integer> {

}
