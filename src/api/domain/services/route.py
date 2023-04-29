from flask import Blueprint, request
import api.domain.services.controller as Controller

api = Blueprint('api/services', __name__)

@api.route('/<int:company_id>', methods=["POST"])
def create_new_service(company_id):
    body = request.get_json()
    return Controller.create_new_service(body, company_id)