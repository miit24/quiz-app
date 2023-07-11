package com.company.quiz.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.quiz.Models.Exam;

public interface ExamDao extends JpaRepository<Exam,Integer>{
    
}
