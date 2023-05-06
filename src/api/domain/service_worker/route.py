from flask import Flask, request, jsonify, Blueprint
import api.domain.service_worker.controller as Controller
import api.utilities.handle_response as Response
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models.index import db, Services_workers, Company
import api.domain.services.controller as ServiceController

api = Blueprint("api/service_worker", __name__)


@api.route("/", methods=["GET"])
def get_all_servicesWorkers():
    return Controller.get_all_servicesWorkers()


@api.route("<int:service_id>", methods=["POST"])
@jwt_required()
def create_service_worker(service_id):
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]
    body = request.get_json()
    assign_service_worker = Controller.create_service_worker(
        body, service_id, current_user_id
    )

    if isinstance(assign_service_worker, Services_workers):
        return Response.response_ok(
            "New Services_workers created successfully!",
            assign_service_worker.serialize(),
        )
    else:
        return Response.response_error(
            assign_service_worker["msg"], assign_service_worker["status"]
        )


@api.route("/<int:service_id>", methods=["DELETE"])
@jwt_required()
def delete_service_worker(service_id):
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]
    service = Services_workers.query.get(service_id)
    if current_user_id != service:
        return Controller.delete_service_worker(service_id)
    return Response.response_error("User is not the company admin", 400)
