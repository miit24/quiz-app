package com.company.quiz.Routes;

import com.company.quiz.Controllers.ExamController;
import com.company.quiz.Models.Category;
import com.company.quiz.Models.ErrorResponse;
import com.company.quiz.Models.Exam;
import com.company.quiz.Models.User;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/exam")
public class ExamRoute {

    @Autowired
    ExamController examController;
    @GetMapping("/find/{cid}")
    public ResponseEntity<List<Exam>> find(Authentication authentication,@PathVariable("cid") int cid){
        try {
            User user = (User) authentication.getPrincipal();
            List<Exam> data = examController.findAllByCIDandUID(cid, user.getId());
            return ResponseEntity.status(200).body(data);
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return ResponseEntity.status(500).build();
    }

    @GetMapping("/find/id/{id}")
    public ResponseEntity<Exam> findbyID(@PathVariable("id") int id){
        Exam data = examController.findId(id);
        return ResponseEntity.status(200).body(data);
    }

    @GetMapping("/find/category")
    public ResponseEntity<List<Long>> findbycategory(Authentication authentication){
        User user = (User) authentication.getPrincipal();
        List<Long> data = examController.findCategory(user.getId());
        return ResponseEntity.status(200).body(data);
    }

    @PostMapping("/create")
    public ResponseEntity<Exam> create(Authentication authentication,@RequestBody Exam exam){
        try{
            User user = (User) authentication.getPrincipal();
            Date todayDate = new Date();
            exam.setTimestamp(todayDate);
            exam.setUser(user);
            Exam data = examController.create(exam);
            return ResponseEntity.status(200).body(data);
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return ResponseEntity.status(500).build();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> exceptionHandler(Exception e) {
        System.out.println(e.getMessage());
        return ResponseEntity.status(500).body(new ErrorResponse("Something bad happen",true));
    }
}
