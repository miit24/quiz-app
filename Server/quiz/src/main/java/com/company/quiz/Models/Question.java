package com.company.quiz.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String question;
    private String A;
    private String B;
    private String C;
    private String D;
    private String codeSnippet;
    private String answer;
    @ManyToOne
    private Category category;

    public Question(int id, String question, String a, String b, String c, String d, String answer,String codeSnippet, Category category) {
        this.id = id;
        this.question = question;
        A = a;
        B = b;
        C = c;
        D = d;
        this.answer = answer;
        this.category = category;
        this.codeSnippet = codeSnippet;
    }

    public Question() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getA() {
        return A;
    }

    public void setA(String a) {
        A = a;
    }

    public String getB() {
        return B;
    }

    public void setB(String b) {
        B = b;
    }

    public String getC() {
        return C;
    }

    public void setC(String c) {
        C = c;
    }

    public String getD() {
        return D;
    }

    public void setD(String d) {
        D = d;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getCodeSnippet() {
        return codeSnippet;
    }

    public void setCodeSnippet(String codeSnippet) {
        this.codeSnippet = codeSnippet;
    }

    @Override
    public String toString() {
        return "Question [id=" + id + ", question=" + question + ", A=" + A + ", B=" + B + ", C=" + C + ", D=" + D
                + ", answer=" + answer + ", category=" + category + "]";
    }

}
