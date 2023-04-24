from flask import Flask, request, jsonify
from api.models.index import db, User
import bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt

import domains.user.repository as Repository
import api.utilities.handle_response as Response


def create_new_user(user):
    if user['email'] is None or user['email'] == "":
        return Response.response_error('Email is not valid', 400)
    
    if user['username'] is None or user['username'] == "":
        return Response.response_error('Username is not valid', 400)

    return jsonify(Repository.create_new_user(user)), 201

def get_users_list():
	all_users = Repository.get_users_list()
	return Response.response_ok('Ok!', all_users)

def get_single_user(user_id):
    user = Repository.get_single_user(user_id)
    if user is None:
        return Response.response_error('User not found', 404)

    return Response.response_ok('Ok!',user.serialize())


def delete_user(user_id):
    user = Repository.delete_user(user_id)
    if user is None:
        return Response.response_error(f'User with id: {user_id}, not found in database.', 404)
    else:
        db.session.delete(user)
        db.session.commit()
        return Response.response_ok(f'User with id: {user_id}, is successfully deleted.', user)