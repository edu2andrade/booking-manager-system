from api.models.index import db, Booking

def create_new_booking(body, user_id):
    new_booking = Booking(user_id, body['service_workers_id'], body['start_service'], body['description'])
    db.session.add(new_booking)
    db.session.commit()
    return new_booking