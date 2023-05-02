from api.models.index import db, Services
from flask import jsonify

def create_new_service(body, company_id):
    new_service = Services(company_id, body['date'], body['name'], body['description'], body['service_duration'], body['price'])
    db.session.add(new_service)
    db.session.commit()
    return new_service

def get_services_list(all_services):
    serialized_services = list(map(lambda service: service.serialize(), all_services))
    return serialized_services
