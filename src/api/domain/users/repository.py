from api.models.index import db, User
from flask import jsonify

def create_new_user(user):
    new_user = User(user['username'], user['firstname'], user['lastname'], user['email'], user['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        "message": "user has been created successfully!",
        "new user": new_user.serialize()
    })

def get_users_list():
    all_users = User.query.all()
    serialized_users = list(map(lambda user: user.serialize(), all_users))
    return serialized_users

def get_single_user(user_id):
    user = User.query.get(user_id)
    return user

def delete_user(user_id):
    user = User.query.get(user_id)
    return user







# --------------------------------------------
# DAIRO
# ROUTE
# from flask import request, jsonify                                                 
# from api.models.index import db, Products
# import api.domain.products.controller as Controller
# def products_route(app):
#     @app.route('/products', methods=['GET'])
#     def get_all_products():
#         return Controller.get_all_products()
#     @app.route('/products/<int:id>', methods=['GET'])
#     def get_product_by_id(id):
#         return Controller.get_product_by_id(id)
#     @app.route('/products', methods=['POST'])
#     def create_product():
#         body = request.get_json()
#         new_product =Controller.create_product(body)
#         return jsonify(new_product), 201


# # REPOSITORY
# from api.models.index import db, Products
# def get_all_products():
#     all_products = Products.query.all()
#     serialize_all_products = list(map(lambda products : products.serialize(), all_products))
#     return serialize_all_products
# def get_product_by_id(product_id):
#     product = Products.query.get(product_id)
#     if product is None:
#         return product
#     return product.serialize()
# def create_product(data):
#     new_product = Products(data['company_id'], data['name'], data['description'], data['price'], data['stock'])
#     db.session.add(new_product)
#     db.session.commit()
#     return new_product.serialize()


# # CONTROLLER
# import api.domain.products.repository as Repository             
# import api.utilities.handle_response as Response
# def get_all_products():
#     all_products = Repository.get_all_products()
#     return Response.response_ok(all_products)
# def get_product_by_id(product_id):
#     product = Repository.get_product_by_id(product_id)
#     if product is None:
#         return Response.response_error('user no found', 404)
#     return product
# def create_product(data):
#     if data['name'] is None or data['name'] == '':
#         return Response.response_error('name require', 400)
#     # person = UserController.get_people_by_id(data['user_id'])
#     # if person is None:
#     #     return Response.response_error('People no valid', 400)
#     return Repository.create_product(data)
    

# # HANDEL_RESPONSE
# from flask import jsonify                          
# def response_error(msg, status_code):
#     return jsonify({
#         "msg": msg,
#         "error": True
#     }), status_code
# def response_ok(data):
#     return jsonify(data), 200