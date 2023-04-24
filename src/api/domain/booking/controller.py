import api.domain.booking.repository as Repository 
import api.utilities.handle_response as Response

def create_booking(data):
    if data['user_id'] is None or data['user_id'] == '':
        return Response.response_error('User does not exist', 400)
    
    if data['service_workers_id'] is None or data['service_workers_id'] == '':
        return Response.response_error('Service not assigned', 400)
    
    return Repository.create_booking(data), 201

def get_all_bookings():
    all_bookings = Repository.get_all_bookings()
    return Response.response_ok(all_bookings)

def get_booking_by_id(booking_id):
    booking = Repository.get_booking_by_id(booking_id)

    if booking is None:
        return Response.response_error('Booking not found', 404)
    
    return booking

def delete_booking(id):
    if not isinstance(id, int):
        return Response.response_error("ID is not a number", 404)
    booking = Repository.delete_booking(id) 
    if booking is not None:
        return Response.response_ok("Booking deleted") 
    else:
        return Response.response_error("ID not found", 404)