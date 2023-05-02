from flask import Blueprint, request
import api.domain.services.controller as Controller
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api/services', __name__)

@api.route('/<int:company_id>', methods=["POST"])
@jwt_required()
def create_new_service(company_id):
    current_user = get_jwt_identity()
    current_user_id = current_user['id']
    
    body = request.get_json()

    return Controller.create_new_service(company_id, current_user_id, body)



@api.route('/<int:company_id>', methods=['GET'])
def get_services_list(company_id):
    return Controller.get_services_list(company_id)

