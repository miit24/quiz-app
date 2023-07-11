package com.company.quiz.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.quiz.Models.Question;

import java.util.List;

public interface QuestionDao extends JpaRepository<Question,Integer>{

    public List<Question> findByCategoryId(int id);
}
