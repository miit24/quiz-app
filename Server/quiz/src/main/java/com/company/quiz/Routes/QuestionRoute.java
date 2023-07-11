package com.company.quiz.Routes;

import com.company.quiz.Controllers.QuestionController;
import com.company.quiz.Models.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
public class QuestionRoute {
    @Autowired
    QuestionController questionController;
    @GetMapping("/all/{cid}")
    public ResponseEntity<List<Question>> getAllQuestion(@PathVariable("cid") int cid){
        List<Question> list = questionController.getAllQuestionByCID(cid);
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getAQuestion(@PathVariable("id") int id){
            Question question  = questionController.getAQuestion(id);
            return ResponseEntity.status(200).body(question);
    }

    @PostMapping("/create")
    public ResponseEntity<Question> createQuestion(@RequestBody Question question){
        return ResponseEntity.status(200).body(questionController.create(question));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Integer> delete(@PathVariable("id") int id){
        return ResponseEntity.status(200).body(questionController.delete(id));
    }

    @ExceptionHandler(Exception.class)
    public String exceptionHandler(){
        return "Someting went wrong";
    }
}
