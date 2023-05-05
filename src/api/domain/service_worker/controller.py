from flask import Flask, request, jsonify
import api.domain.service_worker.repository as Repository
import api.utilities.handle_response as Response
import api.domain.workers.controller as UserController
import api.domain.services.controller as ServiceController
from api.models.index import db, Workers, Company


def get_all_servicesWorkers():
    all_services_workers = Repository.get_all_servicesWorkers()
    return Response.response_ok("List of all worker service", all_services_workers)


def get_service_by_id(service_id):
    service = Repository.get_service_by_id(service_id)
    print(service)
    if service is None:
        return Response.response_error("user no found", 404)
    return service


def create_service(data, service_id):
    service = ServiceRepository.get_single_service(service_id)
    print(service, "service in controller")
    print(data, "data")
    if service is None:
        return "Service not found"

    worker = UserController.create_worker(data, "service")
    print(worker, "workerincontroller")
    return ServiceRepository.create_service(service.id, worker.id, data), 201


# def delete_service(service_id):
#     is_deleted_service = Repository.delete_service(service_id)
#     if is_deleted_service:
#         return jsonify({"msg": f'User with id: {service_id}, has been deleted from database.'}), 200
#     else:
#         return Response.response_error(f'User with id: {service_id}, not found in database.', 404)
