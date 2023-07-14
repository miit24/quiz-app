package com.company.quiz.Dao;

import com.company.quiz.Models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import com.company.quiz.Models.Exam;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExamDao extends JpaRepository<Exam,Integer>{

    @Query(value = "SELECT * FROM exam WHERE category_id = :cid AND user_id = :uid ORDER BY created_at DESC",nativeQuery = true)
    public List<Exam> findByCIDAndUID(@Param("cid") int cid,@Param("uid") int uid);

    @Query("SELECT DISTINCT e.category.id FROM Exam e WHERE e.user.id = :userId")
    List<Long> findDistinctCategoryIdsByUserId(@Param("userId") int userId);
}
