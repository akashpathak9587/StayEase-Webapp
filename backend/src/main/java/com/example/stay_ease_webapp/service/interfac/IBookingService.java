package com.example.stay_ease_webapp.service.interfac;

import com.example.stay_ease_webapp.dto.Response;
import com.example.stay_ease_webapp.entity.Booking;

public interface IBookingService {
    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);
}
