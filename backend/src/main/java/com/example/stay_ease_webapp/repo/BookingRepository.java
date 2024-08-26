package com.example.stay_ease_webapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.stay_ease_webapp.entity.Booking;

import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByBookingConfirmationCode(String confirmationCode);
}
