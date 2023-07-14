package com.company.quiz.Controllers;

import com.company.quiz.Dao.QuestionDao;
import com.company.quiz.Models.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class QuestionController {

    @Autowired
    QuestionDao questionDao;

    public List<Question> getAllQuestionByCID(int cid){
        return questionDao.findByCategoryId(cid);
    }

    public Question getAQuestion(int id){
        return questionDao.findById(id).get();
    }

    public Question create(Question question){
        questionDao.save(question);
        return question;
    }

    public int delete(int id){
        questionDao.deleteById(id);
        return id;
    }

    public List<Question> getRandomQuestion(int cid,int limit){
        return questionDao.findRandomQuestion(cid,limit);
    }
}
