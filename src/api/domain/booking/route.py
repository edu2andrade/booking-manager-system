from flask import Blueprint, request
import api.domain.booking.controller as Controller
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models.index import Booking
import api.utilities.handle_response as Response

api = Blueprint('api/booking', __name__)

@api.route('/<int:company_id>', methods=["POST"])
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