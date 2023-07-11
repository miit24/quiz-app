package com.company.quiz.Models;

public class ErrorResponse {
    private String message;
    private boolean error;

    public ErrorResponse() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isError() {
        return error;
    }

    public void setError(boolean error) {
        this.error = error;
    }

    public ErrorResponse(String message, boolean error) {
        this.message = message;
        this.error = error;
    }
}
