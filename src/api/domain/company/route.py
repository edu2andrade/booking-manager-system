from flask import Flask, request, jsonify, Blueprint
import api.utilities.handle_response as Response
import api.domain.company.controller as Controller
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models.index import Company


api = Blueprint("api/company", __name__)


@api.route("/register", methods=["POST"])
def create_company():
    body = request.get_json()
    
    new_company = Controller.create_company(body)

    if isinstance(new_company, Company):
        return Response.response_ok('Company has been created in database.', new_company.serialize())
    else:
        return Response.response_error(new_company['msg'], new_company['status'])

<<<<<<< HEAD

@api.route("/all", methods=["GET"])
def get_company_list():
    return Controller.get_company_list()
=======
@api.route('/all', methods=['GET'])
def get_companies_list():
    return Controller.get_companies_list()
>>>>>>> ae8538646d94f09b3fc5a16fd40a33b0542e3adc


@api.route("/<int:company_id>", methods=["GET"])
def get_company_by_id(company_id):
    company = Controller.get_company_by_id(company_id)
    print(company, "este es el comopany EDE LA RUTA")
    return company.serialize()


@api.route("/<int:company_id>", methods=["PUT"])
@jwt_required()
def update_company(company_id):
    update_company = request.get_json()
    current_user = get_jwt_identity()
<<<<<<< HEAD
    current_user_id = current_user["id"]

    company = Company.query.get(company_id)
    company_user_id = company.user_id
=======
    current_user_id = current_user['id']
>>>>>>> ae8538646d94f09b3fc5a16fd40a33b0542e3adc

    company = Controller.update_company(update_company, company_id, current_user_id)
    
    if isinstance(company, Company):
        return Response.response_ok(f'Company with id: {company_id}, has been updated in database.', company.serialize())
    else:
        return Response.response_error(company['msg'], company['status'])


@api.route("/<int:company_id>", methods=["DELETE"])
@jwt_required()
def delete_company(company_id):
    current_user = get_jwt_identity()
<<<<<<< HEAD
    current_user_id = current_user["id"]

    company = Company.query.get(company_id)
    company_user_id = company.user_id

    if current_user_id != company_user_id:
        return Response.response_error("User is not the company admin", 400)
    return Controller.delete_company(company_id)
=======
    current_user_id = current_user['id']

    company = Controller.delete_company(company_id, current_user_id)

    if isinstance(company, Company):
        return Response.response_ok(f'Company with id: {company_id}, was deleted from database.', company.serialize())
    else:
        return Response.response_error(company['msg'], company['status'])
    

    

>>>>>>> ae8538646d94f09b3fc5a16fd40a33b0542e3adc
