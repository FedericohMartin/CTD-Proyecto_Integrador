package com.grupo11.digitalbooking.digitalbookingrentalcars.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {
    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, Object responseObj) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", message);
        map.put("data", responseObj);

        return new ResponseEntity<Object>(map,status);
    }

    public static ResponseEntity<Object> generateResponseNoContent() {
        Map<String, Object> map = new HashMap<String, Object>();

        return new ResponseEntity<Object>(map,HttpStatus.NO_CONTENT);
    }
}
