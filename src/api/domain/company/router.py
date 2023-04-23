from flask import request, jsonify 
from api.models.index import db, Company
import api.domain.company.controller as controller

def company_route(app):

    @app.route('/user/new_company', methods=['POST'])
    def create_company():
        body = request.get_json()
        new_company = Controller.create_company(body)
        return jsonify(new_product), 201

    @app.route('/companies', methods=['GET'])
    def get_all_companies():
        return Controller.get_all_companies()

    @app.route('/company/<int:id>', methods=['GET'])
    def get_company_by_id(id):
        return Controller.get_company_by_id(id)

    @app.route('/company/<int:id>', methods=['DELETE'])
    def delete_company(id):
        return Controller.delete_company(id)

        