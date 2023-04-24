from api.models.index import db, Services
from flask import jsonify # este jsonify solo esta aqui para el addpoint de delete

def get_all_services():
    all_services = Services.query.all()
    serialize_all_services = list(map(lambda services : services.serialize(), all_services))
    return serialize_all_services

def get_service_by_id(service_id):
    service = Services.query.get(service_id)
    if service is None:
        return service
    return service.serialize()
    
def create_service(data):
    new_service = Services(data['company_id'], data['date'], data['name'], data['description'], data['service_duration'], data['price'] )
    db.session.add(new_service)
    db.session.commit()
    return new_service.serialize()

# DELETE service
def delete_by_id_service(id):
    service = Services.query.get(id)
    if service:
        db.session.delete(service)
        db.session.commit()
        return jsonify({'message': 'service successfully deleted.'}), 200
    else:
        return jsonify({'message': 'service not found.'}), 404

# UPDATE SERVICE




