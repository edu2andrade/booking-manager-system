from flask import request, jsonify
from api.models.index import db, Shopping_cart
import api.domain.shopping_cart.controller as Controller


def cart_route(app):

    @app.route('/shooping_cart', methods=['GET'])
    def get_all_cart():
        return Controller.get_all_carts()    
    
    @app.route('/shooping_cart/<int:id>', methods=['GET'])
    def get_cart(id):
        return Controller.get_cart_by_id(id)