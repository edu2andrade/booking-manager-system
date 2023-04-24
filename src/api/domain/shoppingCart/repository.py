from api.models.index import db, ShoppingCart



def get_all_carts():
    all_carts = ShoppingCart.query.all()
    serialize_all_carts = list(map(lambda carts : carts.serialize(), all_carts))
    return serialize_all_carts


def get_cart_by_id(cart_id):
    cart = ShoppingCart.query.get(cart_id)
    if cart is None:
        return cart
    return cart.serialize()
