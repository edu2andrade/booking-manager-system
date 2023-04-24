from api.models.index import db, Booking

def create_booking(data):
    new_booking = Booking(data['user_id'], data['service_workers_id'], data['created_at'], data['start_service'], data['end_service'])
    db.session.add(new_booking)
    db.session.commit()
    return new_booking.serialize()

def get_all_bookings(): 
    bookings = Booking.query.all()
    serialize_all_bookings = list(map(lambda booking: booking.serialize(), bookings))
    return serialize_all_bookings

def get_booking_by_id(id):
    booking = Booking.query.get(id)
    return booking.serialize()

def delete_booking(id):
    booking = Booking.query.get(id)
    if booking is None:  
        return booking  
    else:
        db.session.delete(booking)
        db.session.commit()
    return company
