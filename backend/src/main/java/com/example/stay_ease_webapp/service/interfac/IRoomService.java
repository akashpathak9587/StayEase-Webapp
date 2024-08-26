package com.example.stay_ease_webapp.service.interfac;

import org.springframework.web.multipart.MultipartFile;

import com.example.stay_ease_webapp.dto.Response;

import java.util.List;
import java.math.BigDecimal;
import java.time.LocalDate;

public interface IRoomService {

    Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String description);

    List<String> getAllRoomTypes();

    Response getAllRooms();

    Response deleteRoom(Long roomId);

    Response updateRoom(Long roomId, String description, String roomType, BigDecimal roomPrice, MultipartFile photo);

    Response getRoomById(Long roomId);

    Response getAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);

    Response getAllAvailableRooms();
}
