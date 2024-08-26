package com.example.stay_ease_webapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.stay_ease_webapp.entity.Room;

import java.util.List;
import java.time.LocalDate;

public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("select distinct r.roomType from Room r")
    List<String> findDistinctRoomTypes();

    @Query("select r from Room r where r.roomType like %:roomType% and r.id not in (select bk.room.id from Booking bk where (bk.checkInDate <= :checkOutDate) and (bk.checkOutDate >= :checkInDate))")
    List<Room> findAvailableRoomsByDatesAndTypes(LocalDate checkInDate, LocalDate checkOutDate, String roomType);


    @Query("select r from Room r where r.id not in (select bk.room.id from Booking bk)")
    List<Room> getAllAvailableRooms();
}
