package br.com.rafael.parkingcontrol.handler;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ResponseError {
    private Date timestamp = new Date();
    private String status = "error";
    private int statusCode;
    private String error;
    private List<String> errors;

    public ResponseError(String error, int statusCode, List<String> errors) {
        this.error = error;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
