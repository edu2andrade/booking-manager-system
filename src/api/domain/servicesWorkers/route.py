from flask import request, jsonify
from api.models.index import db, ServicesWorkers
import api.domain.servicesWorkers.controller as Controller


def servicesWorkers_route(app):

    @app.route('/services_workers', methods=['GET'])
    def get_all_servicesWorkers():
        return Controller.get_all_servicesWorkers() 

    @app.route('/services_workers/<int:id>', methods=['GET'])
    def get_service(id):
        return Controller.get_service_by_id(id)