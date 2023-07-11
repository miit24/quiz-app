package com.company.quiz.Dao;

import com.company.quiz.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User,Integer> {
    public User findByEmail(String name);
}
