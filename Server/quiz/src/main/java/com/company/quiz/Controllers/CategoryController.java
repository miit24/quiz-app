package com.company.quiz.Controllers;

import com.company.quiz.Dao.CategoryDao;
import com.company.quiz.Dao.QuestionDao;
import com.company.quiz.Models.Category;
import com.company.quiz.Models.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryController {

    @Autowired
    CategoryDao categoryDao;
    @Autowired
    QuestionDao questionDao;

    public List<Category> getAllCategory(){
        return categoryDao.findAll();
    }

    public List<Question> getAllQuestionsInCategory(int id){
        return questionDao.findByCategoryId(id);
    }

    public Category create(Category c){
        categoryDao.save(c);
        return c;
    }

    public int delete(int id){
        categoryDao.deleteById(id);
        return id;
    }
}
