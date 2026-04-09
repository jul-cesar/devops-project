package com.example.devopsproject.controller;

import com.example.devopsproject.dto.BaseResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/devops")
public class BaseController {

    @GetMapping
    public ResponseEntity<BaseResponse> Test() {

        BaseResponse res = new BaseResponse(
                200,
                "Hola ejemplo prueba"
        );
        return ResponseEntity.ok(res);
    }
}
