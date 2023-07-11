package com.company.quiz.Controllers;

import com.company.quiz.Dao.UserDao;
import com.company.quiz.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserController {

    @Autowired
    UserDao userDao;

    public User create(User user){
        userDao.save(user);
        return user;
    }

    public User find(String id){
        return userDao.findByEmail(id);
    }
}
