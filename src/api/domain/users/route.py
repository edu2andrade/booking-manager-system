from flask import Flask, request, jsonify, Blueprint
import api.utilities.handle_response as Response
import api.domain.users.controller as Controller
from api.models.index import User
from flask_jwt_extended import jwt_required, get_jwt_identity
import bcrypt

api = Blueprint('api/users', __name__)

@api.route("/register", methods=["POST"])
def create_new_user():
    body = request.get_json()
    
    user = Controller.create_new_user(body, 'client')
    
    if isinstance(user, User):
        return Response.response_ok('User has been created in database.', user.serialize())
    else:
        return Response.response_error(user['msg'], user['status'])

@api.route('/', methods=["GET"])
def get_users_list():
    return Controller.get_users_list()

@api.route('/<int:user_id>', methods=['GET'])
#make it a private route
def get_single_user(user_id):
    return Controller.get_single_user(user_id)

@api.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    return Controller.delete_user(user_id)

@api.route('/<int:user_id>', methods=['PUT'])
def update(user_id):
    update_user = request.get_json()
    return Controller.update_user(update_user, user_id)

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    token = Controller.login(body)

    if token.get('token'):
        return jsonify(token), 200
    return jsonify(token), token['status']


