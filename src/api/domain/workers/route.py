from flask import Flask, request, jsonify, Blueprint
import api.domain.workers.controller as Controller

api = Blueprint("api/workers", __name__)


@api.route("/add_work/<int:company_id>", methods=["POST"])
def create_work(company_id):
    body = request.get_json()
    new_work = Controller.create_work(body, company_id)
    return jsonify(new_work.serialize()), 201


@api.route("/all", methods=["GET"])
def get_worker_list():
    return Controller.get_worker_list()


@api.route("/<int:worker_id>", methods=["GET"])
def get_worker_by_id(worker_id):
    worker_by_id = Controller.get_worker_by_id(worker_id)
    return worker_by_id.serialize()


@api.route("/<int:id>", methods=["DELETE"])
def delete_worker(id):
    eliminate_workers = Controller.delete_worker(id)
    return jsonify(eliminate_workers)
