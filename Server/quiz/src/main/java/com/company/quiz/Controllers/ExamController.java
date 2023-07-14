package com.company.quiz.Controllers;

import com.company.quiz.Dao.ExamDao;
import com.company.quiz.Models.Category;
import com.company.quiz.Models.Exam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ExamController {

    @Autowired
    ExamDao examDao;

    public Exam findId(int id){
        return examDao.findById(id).get();
    }
    public Exam create(Exam exam){
        examDao.save(exam);
        return exam ;
    }
    public List<Exam> findAllByCIDandUID(int cid,int uid){
        return examDao.findByCIDAndUID(cid,uid);
    }

    public List<Long> findCategory(int id){
        return examDao.findDistinctCategoryIdsByUserId(id);
    }
}
