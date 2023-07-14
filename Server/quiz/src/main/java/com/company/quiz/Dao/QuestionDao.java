package com.company.quiz.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.quiz.Models.Question;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionDao extends JpaRepository<Question,Integer>{

    public List<Question> findByCategoryId(int id);

    @Query(value = "SELECT * FROM question WHERE category_id = :n ORDER BY RAND() LIMIT :l", nativeQuery = true)
    public List<Question> findRandomQuestion(@Param("n") int cid,@Param("l") int limit);
}
