package com.company.quiz.Models;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "exam")
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "wrong_answer")
    private int wrong;


    @Column(name = "right_answer")
    private int right;

    @Column(name = "createdAt", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date timestamp;
    @ManyToOne
    private User user;
    @ManyToOne
    private Category category;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getWrong() {
        return wrong;
    }

    public void setWrong(int wrong) {
        this.wrong = wrong;
    }

    public int getRight() {
        return right;
    }

    public void setRight(int right) {
        this.right = right;
    }

    public Date getDate() {
        return timestamp;
    }

    public void setDate(Date date) {
        this.timestamp = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Exam(int id, int wrong, int right, Date date, User user, Category category) {
        this.id = id;
        this.wrong = wrong;
        this.right = right;
        this.timestamp = date;
        this.user = user;
        this.category = category;
    }

    public Exam() {
    }

    @Override
    public String toString() {
        return "Exam [id=" + id + ", wrong=" + wrong + ", right=" + right + ", date=" + timestamp + ", user=" + user
                + ", category=" + category + "]";
    }

}
