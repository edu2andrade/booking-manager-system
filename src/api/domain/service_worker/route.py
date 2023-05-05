from flask import Flask, request, jsonify, Blueprint
import api.domain.service_worker.controller as Controller


api = Blueprint("api/service_worker", __name__)


@api.route("/", methods=["GET"])
def get_all_servicesWorkers():
    return Controller.get_all_servicesWorkers()


@api.route("/<int:id>", methods=["GET"])
def get_service(id):
    return Controller.get_service_by_id(id)


@api.route("<int:service_id>", methods=["POST"])
def create_service(service_id):
    print("service_id_enroute", service_id)
    body = request.get_json()
    print("body_enroute", body)
    new_service = Controller.create_service(body, service_id)
    print("new_service_enroute", new_service)
    print("new_service_enroute", body)
    print("new_service_enroute", service_id)
    return jsonify(new_service), 201


# @api.route('/<int:service_id>', methods=['DELETE'])
# def delete_service(service_id):
#     return Controller.delete_service(service_id)
