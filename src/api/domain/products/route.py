from flask import request, jsonify
from api.models.index import db, Products
import api.domain.products.controller as Controller


def products_route(app):

    @app.route('/products', methods=['GET'])
    def get_all_products():
        return Controller.get_all_products()    

    @app.route('/products/<int:id>', methods=['GET'])
    def get_product_by_id(id):
        return Controller.get_product_by_id(id)

    @app.route('/products', methods=['POST'])
    def create_product():
        body = request.get_json()
        new_product =Controller.create_product(body)
        return jsonify(new_product), 201
    # DELETE PRODUCTS
    @app.route('/products/<int:id>', methods=['DELETE'])
    def delete_product(id):

        return Controller.delete_by_id_product(id)