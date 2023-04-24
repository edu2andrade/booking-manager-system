import api.domain.services.repository as Repository
import api.utilities.handle_response as Response


def get_all_services():
    all_services = Repository.get_all_services()
    return Response.response_ok(all_services)


def get_service_by_id(service_id):
    service = Repository.get_service_by_id(service_id)
    if service is None:
        return Response.response_error('user no found', 404)
    return service

def create_service(data):
    if data['name'] is None or data['name'] == '':
        return Response.response_error('name require', 400)    
    return Repository.create_service(data)

# DELETE SERVICES
def delete_by_id_service(service_id):
    service = Repository.Delete_by_id_service(service_id)
    if service is None:
        return Response.response_error('user no found', 404)
    return service

