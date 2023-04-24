from api.models.index import db, Products
from flask import jsonify # este jsonify solo esta aqui para el addpoint de delete



def get_all_products():
    all_products = Products.query.all()
    serialize_all_products = list(map(lambda products : products.serialize(), all_products))
    return serialize_all_products


def get_product_by_id(product_id):
    product = Products.query.get(product_id)
    if product is None:
        return product
    return product.serialize()
    
def create_product(data):
    new_product = Products(data['company_id'], data['name'], data['description'], data['price'], data['stock'])
    db.session.add(new_product)
    db.session.commit()
    return new_product.serialize()

# DELETE PRODUCT
def delete_by_id_product(id):
    product = Products.query.get(id)
    if product:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'product successfully deleted.'}), 200
    else:
        return jsonify({'message': 'product not found.'}), 404

