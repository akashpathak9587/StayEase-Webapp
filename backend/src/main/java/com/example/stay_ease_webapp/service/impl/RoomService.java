package com.example.stay_ease_webapp.service.impl;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.stay_ease_webapp.dto.Response;
import com.example.stay_ease_webapp.dto.RoomDTO;
import com.example.stay_ease_webapp.entity.Room;
import com.example.stay_ease_webapp.exception.OurException;
import com.example.stay_ease_webapp.repo.RoomRepository;
import com.example.stay_ease_webapp.service.AWSS3Service;
import com.example.stay_ease_webapp.service.interfac.IRoomService;
import com.example.stay_ease_webapp.utils.Utils;

import java.math.BigDecimal;
import java.util.List;
import java.time.LocalDate;

@Service
public class RoomService implements IRoomService {

    private final RoomRepository roomRepository;

    private final AWSS3Service awsS3Service;

    public RoomService(RoomRepository roomRepository, AWSS3Service awsS3Service) {
        this.roomRepository = roomRepository;
        this.awsS3Service = awsS3Service;
    }


    private static final String SUCCESS_MESSAGE = "successful";
    private static final String ERROR_MESSAGE = "Room not found";


    @Override
    public Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String description) {
        Response response = new Response();
        try {
            String imageUrl = awsS3Service.saveImagesToS3(photo);
            Room room = new Room();
            room.setRoomPhotoUrl(imageUrl);
            room.setRoomType(roomType);
            room.setRoomPrice(roomPrice);
            room.setRoomDescription(description);
            Room savedRoom = roomRepository.save(room);
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(savedRoom);
            response.setStatusCode(200);
            response.setMessage(SUCCESS_MESSAGE);
            response.setRoom(roomDTO);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during room creation " + e.getMessage());
        }
        return response;
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public Response getAllRooms() {
        Response response = new Response();
        try {
            List<Room> roomList = roomRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);
            response.setStatusCode(200);
            response.setMessage(SUCCESS_MESSAGE);
            response.setRoomList(roomDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during room retrieval " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteRoom(Long roomId) {
        Response response = new Response();
        try {
            roomRepository.deleteById(roomId);
            response.setStatusCode(200);
            response.setMessage(SUCCESS_MESSAGE);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during room deletion " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateRoom(Long roomId, String description, String roomType, BigDecimal roomPrice,
            MultipartFile photo) {
        Response response = new Response();
        try {
            String imageUrl = null;
            if (photo != null && !photo.isEmpty()) {
                imageUrl = awsS3Service.saveImagesToS3(photo);
            }
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new OurException(ERROR_MESSAGE));
            if (roomType != null)
                room.setRoomType(roomType);
            if (roomPrice != null)
                room.setRoomPrice(roomPrice);
            if (description != null)
                room.setRoomDescription(description);
            if (imageUrl != null)
                room.setRoomPhotoUrl(imageUrl);

            Room updatedRoom = roomRepository.save(room);
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(updatedRoom);
            response.setStatusCode(200);
            response.setMessage(SUCCESS_MESSAGE);
            response.setRoom(roomDTO);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during room update " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getRoomById(Long roomId) {
        Response response = new Response();
        try {
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new OurException(ERROR_MESSAGE));
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(room);
            response.setStatusCode(200);
            response.setMessage(SUCCESS_MESSAGE);
            response.setRoom(roomDTO);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during room retrieval " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        Response response = new Response();
        try {
            List<Room> availaleRooms = roomRepository.findAvailableRoomsByDatesAndTypes(checkInDate, checkOutDate,
                    roomType);
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(availaleRooms);
            response.setStatusCode(200);
            response.setMessage(SUCCESS_MESSAGE);
            response.setRoomList(roomDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during room availability check " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllAvailableRooms() {
        Response response = new Response();
        try {
            List<Room> roomList = roomRepository.getAllAvailableRooms();
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);
            response.setStatusCode(200);
            response.setMessage(SUCCESS_MESSAGE);
            response.setRoomList(roomDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during room availability check " + e.getMessage());
        }
        return response;
    }

}
