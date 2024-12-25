package com.iset.drblythe.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public CustomError handleNotFoundException(NotFoundException ex) {
        return new CustomError(LocalDateTime.now(), getExceptionMessage(ex));
    }

    private String getExceptionMessage(Exception exception) {
        return
            exception.getMessage() == null
            ? exception.getCause().getMessage()
            : exception.getMessage();
    }
}
