from flask import Blueprint, request
import api.domain.booking.controller as Controller
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models.index import Booking
import api.utilities.handle_response as Response

api = Blueprint('api/booking', __name__)

@api.route('/<int:company_id>/', methods=["POST"])
@jwt_required()
def create_new_booking(company_id):
    current_user = get_jwt_identity()
    current_user_id = current_user['id']
    
    body = request.get_json()

    new_booking = Controller.create_new_booking(company_id, current_user_id, body)

    if isinstance(new_booking, Booking):
        return Response.response_ok('New booking created successfully!', new_booking.serialize())
    else:
        return Response.response_error(new_booking['msg'], new_booking['status'])


@api.route('/admin/<int:company_id>/', methods=["POST"])
@jwt_required()
def admin_create_new_booking(company_id):
    current_user = get_jwt_identity()
    current_user_id = current_user['id']
    
    body = request.get_json()

    new_booking = Controller.admin_create_new_booking(company_id, current_user_id, body)

    if isinstance(new_booking, Booking):
        return Response.response_ok('New booking created successfully!', new_booking.serialize_admin_booking())
    else:
        return Response.response_error(new_booking['msg'], new_booking['status'])


@api.route('/<int:company_id>/<int:booking_id>', methods=['GET'])
@jwt_required()
def get_booking(company_id, booking_id):
    current_user = get_jwt_identity()
    current_user_id = current_user['id']

    booking = Controller.get_booking(company_id, booking_id, current_user_id)

    if isinstance(booking, Booking):
        return Response.response_ok(f'Booking with id: {booking_id}, was found in database.', booking.serialize())
    else:
        return Response.response_error(booking['msg'], booking['status'])


@api.route('/company/<int:company_id>', methods=['GET'])
@jwt_required()
def get_bookings_by_company(company_id):
    current_user = get_jwt_identity()
    current_user_id = current_user['id']

    bookings_by_company = Controller.get_bookings_by_company(company_id, current_user_id)

    if isinstance(bookings_by_company, list):
        serialized_bookings = list(map(lambda booking: booking.serialize(), bookings_by_company))
        return Response.response_ok(f'List of all bookings of the company with id: {booking_id}.', serialized_bookings)
    else:
        return Response.response_error(bookings_by_company['msg'], bookings_by_company['status'])


# get_bookings_client - validations: if client
# get_bookings_worker - validations: if worker or admin
# delete_booking - validations: if admin or worker