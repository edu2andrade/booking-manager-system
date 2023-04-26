from flask import Flask, request, jsonify, Blueprint
from api.models.index import db
import api.domain.company.controller as Controller

api = Blueprint('api/company', __name__)

@api.route('/register', methods=['POST'])
def create_company():
    body = request.get_json()
    new_company = Controller.create_company(body)
    return jsonify(new_company), 201

@api.route('/<int:company_id>', methods=['GET'])
def get_company_by_id(company_id):
    return Controller.get_company_by_id(company_id)

@api.route('/<int:company_id>', methods=['PUT'])
def update_company(company_id):
    update_company = request.get_json()
    return Controller.update_company(update_company, company_id)

@api.route('/<int:company_id>', methods=['DELETE'])
def delete_company(company_id):
    return Controller.delete_company(company_id)
    

    

