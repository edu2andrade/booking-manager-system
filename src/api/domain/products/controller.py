import api.domain.products.repository as Repository
import api.utilities.handle_response as Response


def get_all_products():
    all_products = Repository.get_all_products()
    return Response.response_ok(all_products)


def get_product_by_id(product_id):
    product = Repository.get_product_by_id(product_id)
    if product is None:
        return Response.response_error('user no found', 404)
    return product

def create_product(data):
    if data['name'] is None or data['name'] == '':
        return Response.response_error('name require', 400)
    return Repository.create_product(data)

# DELETE PRODUCTS
def delete_by_id_product(product_id):
    product = Repository.delete_by_id_product(product_id)
    if product is None:
        return Response.response_error('user no found', 404)
    return product