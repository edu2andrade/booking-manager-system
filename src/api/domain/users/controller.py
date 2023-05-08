import api.domain.users.repository as Repository
import api.utilities.handle_response as Response
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt
import bcrypt


def create_new_user(body, role_type):
    if body['email'] is None or body['email'] == "":
        return Response.response_error('Email is not valid', 400)
    
    if body['username'] is None or body['username'] == "":
        return Response.response_error('Username is not valid', 400)

    hashed = bcrypt.hashpw(body['password'].encode(), bcrypt.gensalt())
    body['password'] = hashed.decode()
    
    return Repository.create_new_user(body, role_type)


def get_users_list():

	all_users = Repository.get_users_list()
	return all_users

def get_single_user(user_id):
    user = Repository.get_single_user(user_id)
    if user is None:
        return Response.response_error(f'User with id: {user_id}, do not exists in this database.', 404)

    return Response.response_ok(f'User with id: {user_id}, was found in database.',user.serialize())


def delete_user(user_id):
    is_deleted_user = Repository.delete_user(user_id)
    if is_deleted_user:
        return jsonify({"msg": f'User with id: {user_id}, has been deleted from database.'}), 200
    else:
        return Response.response_error(f'User with id: {user_id}, not found in database.', 404)
        

def update_user(update_user, user_id):
    updated_user = Repository.update_user(update_user, user_id)
    if updated_user:
        return Response.response_ok(f'User with id: {user_id}, has been updated in database.', updated_user.serialize())
    else:
        return Response.response_error(f'User with id: {user_id}, not found in database.', 404)

    
def verify_user_email_and_pass(user):
    if user['email'] is None or user['email'] == "":
        return {"msg": "Bad request", "error": True, "status": 400 }
    
    if user['password'] is None or user['password'] == "":
        return {"msg": "Bad request", "error": True, "status": 400 }  
    return user

def login(body):
    user_verify = verify_user_email_and_pass(body)
    if user_verify.get('error') is not None:
        return user_verify

    user = Repository.get_user_by_email(body['email'])

    if user is None: 
        return {"msg": "User not found", "error": True, "status": 404 }
    
    if bcrypt.checkpw(body['password'].encode(), user.password.encode()):
        new_token = create_access_token(identity=user.serialize())
        return {"token": new_token}

    return {"msg": "User not found", "error": True, "status": 404 }