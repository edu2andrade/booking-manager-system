from api.models.index import db, Shopping_cart



def get_all_carts():
    all_carts = Shopping_cart.query.all()
    serialize_all_carts = list(map(lambda carts : carts.serialize(), all_carts))
    return serialize_all_carts


def get_cart_by_id(cart_id):
    cart = Shopping_cart.query.get(cart_id)
    if cart is None:
        return cart
    return cart.serialize()
