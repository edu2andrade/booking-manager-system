from flask import Flask, request, jsonify
import domains.user.controller as Controller
import bcrypt

def user_routes(app):
    @api.route("/users/register", methods=["POST"])
    def create_new_user():
        new_user = request.get_json()
        return Controller.create_new_user(new_user)

    @app.route('/users', methods=['GET'])
    def get_users_list():
        return Controller.get_users_list()

    @app.route('/users/<int:user_id>', methods=['GET'])
    def get_single_user(user_id):
        return Controller.get_single_user(user_id)

    @api.route('/users/<int:user_id>', methods=['DELETE'])
    def delete_user(user_id):
        return Controller.delete_user(user_id)







# @api.route('/users/login', methods = ['POST'])
# def login():
#     body = request.get_json()
#     user = User.query.filter_by(email = body['email']).one()

#     if bcrypt.checkpw(body['password'].encode(), user.password.encode()):
#         create_token = create_access_token(identity=user.id)
#         return jsonify(create_token)
#     else:
#         return jsonify('User not exists in database!'), 404



# @api.route('/login', methods=['POST'])
# def login():
#     body = request.get_json()
#     token = Controller.login(body)

#     if token.get('token'):
#         return jsonify(token), 200
#     return jsonify(token), token['status']