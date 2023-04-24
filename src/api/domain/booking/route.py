from flask import request, jsonify 
from api.models.index import db, Booking
import api.domain.booking.controller as Controller

def booking_route(app):
    
    @app.route('/booking', methods=['POST'])
    def create_booking():
        body = request.get_json()
        new_company = Controller.create_company(body)
        return jsonify(new_product), 201

    @app.route('/bookings', methods=['GET'])
    def get_all_bookings():
        return Controller.get_all_bookings()

    @app.route('/booking/<int:id>', methods=['GET'])
    def get_booking_by_id(id):
        return Controller.get_booking_by_id(id)

    @app.route('/company/<int:id>', methods=['DELETE'])
    def delete_booking(id):
        return Controller.delete_booking(id)