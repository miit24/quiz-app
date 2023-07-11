package com.company.quiz.Routes;

import com.company.quiz.Controllers.CategoryController;
import com.company.quiz.Models.Category;
import com.company.quiz.Models.ErrorResponse;
import com.company.quiz.Models.Question;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/category")
public class CategoryRoute {

    @Autowired
    CategoryController categoryController;

    @GetMapping("/all")
    public ResponseEntity<List<Category>> findAll(){

        try{
            List<Category> list = categoryController.getAllCategory();
            if(list ==  null){
                throw new NullPointerException("Not found");
            }
            return ResponseEntity.status(HttpStatus.SC_OK).body(list);
        } catch(Exception e){
            System.out.println(e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Question>> findAllQuestion(@PathVariable("id") int cid){
        try{
            List<Question> list = categoryController.getAllQuestionsInCategory(cid);
            return ResponseEntity.status(HttpStatus.SC_OK).body(list);
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.SC_BAD_REQUEST).build();
    }

    @PostMapping("/create")
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        try{
            return ResponseEntity.status(200).body(categoryController.create(category));
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return ResponseEntity.status(500).build();
    }

    @PutMapping("/update")
    public ResponseEntity<Category> update(@RequestBody Category category){
        try{
            return ResponseEntity.status(200).body(categoryController.create(category));
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return ResponseEntity.status(500).build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/delete/{id}")
    public ResponseEntity<Integer> delete(@PathVariable("id") int id){
        try{
            System.out.println(id);
            return ResponseEntity.status(200).body(categoryController.delete(id));
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return ResponseEntity.status(500).build();
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> exceptionHandler() {
        return ResponseEntity.status(500).body(new ErrorResponse("Something bad happen",true));
    }
}
