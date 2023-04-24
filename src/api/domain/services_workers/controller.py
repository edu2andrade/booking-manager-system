import api.domain.services_workers.repository as Repository
import api.utilities.handle_response as Response


def get_all_servicesWorkers():
    all_services_workers = Repository.get_all_servicesWorkers()
    return Response.response_ok(all_services_workers)


def get_service_by_id(service_id):
    service = Repository.get_service_by_id(service_id)
    if service is None:
        return Response.response_error('user no found', 404)
    return service