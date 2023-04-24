from flask import request, jsonify
from api.models.index import db, Services
import api.domain.services.controller as Controller


def services_route(app):

    @app.route('/services', methods=['GET'])
    def get_all_services():
        return Controller.get_all_services()    

    
    @app.route('/services/<int:id>', methods=['GET'])
    def get_service_by_id(id):

        return Controller.get_service_by_id(id)


    @app.route('/services', methods=['POST'])
    def create_service():
        body = request.get_json()
        new_service =Controller.create_service(body)
        return jsonify(new_service), 201
    
    # DELETE SERVICES
    @app.route('/services/<int:id>', methods=['DELETE'])
    def delete_service(id):

        return Controller.Delete_by_id_service(id)
   
    

    