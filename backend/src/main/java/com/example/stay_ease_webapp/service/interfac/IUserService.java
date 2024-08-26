package com.example.stay_ease_webapp.service.interfac;

import com.example.stay_ease_webapp.dto.LoginRequest;
import com.example.stay_ease_webapp.dto.Response;
import com.example.stay_ease_webapp.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);
    
    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);
}
