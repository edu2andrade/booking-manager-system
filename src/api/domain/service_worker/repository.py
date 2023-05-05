from api.models.index import db, Services_workers, Services, Workers
from flask import jsonify


def get_all_servicesWorkers():
    all_servicesWorkers = Services_workers.query.all()
    serialize_all_servicesWorkers = list(
        map(lambda services_workers: services_workers.serialize(), all_servicesWorkers)
    )
    return serialize_all_servicesWorkers


def get_service_by_id(service_id):
    service = Services_workers.query.get(service_id)
    if service is None:
        return service
    return service.serialize()


def create_service(service_id, worker_id, data):
    new_service = Services_workers(worker_id, service_id)
    db.session.add(new_service)
    db.session.commit()
    return new_service


# def delete_service(service_id):
#     service = Services_workers.query.get(service_id)
#     if service:
#         db.session.delete(service)
#         db.session.commit()
#         return True
#     else:
#         return False
