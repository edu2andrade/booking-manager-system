import api.domain.shopping_cart.repository as Repository
import api.utilities.handle_response as Response


def get_all_carts():
    all_carts = Repository.get_all_carts()
    return Response.response_ok(all_carts)


def get_cart_by_id(cart_id):
    cart = Repository.get_cart_by_id(cart_id)
    if cart is None:
        return Response.response_error('user no found', 404)
    return cart

