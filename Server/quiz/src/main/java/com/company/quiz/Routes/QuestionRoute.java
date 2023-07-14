package com.company.quiz.Routes;

import com.company.quiz.Controllers.QuestionController;
import com.company.quiz.Models.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    @GetMapping("/get/random/{cid}")
    public ResponseEntity<List<Question>> getRandomQuestion(@PathVariable("cid") int cid, @RequestParam("limit")Optional<Integer> limit){
        try{
            List<Question> data = questionController.getRandomQuestion(cid,limit.get());
            return ResponseEntity.status(200).body(data);
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return ResponseEntity.status(500).build();
    }

    @ExceptionHandler(Exception.class)
    public String exceptionHandler(){
        return "Someting went wrong";
    }
}
