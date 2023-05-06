import api.domain.service_worker.repository as Repository
import api.domain.services.controller as ServiceController
import api.domain.workers.controller as WorkerController
import api.utilities.handle_response as Response
from api.models.index import Company


def get_all_servicesWorkers():
    all_services_workers = Repository.get_all_servicesWorkers()
    return Response.response_ok(
        "List of all assign worker service", all_services_workers
    )


def create_service_worker(body, service_id, current_user_id):
    # Obtenemos el servicio con el ID dado
    service = ServiceController.get_single_service(service_id)
    worker_id = body["worker_id"]
    if service is None:
        return {
            "msg": f"The Service with id: {service_id}, do not exists in this database.",
            "status": 404,
        }
    worker = WorkerController.get_worker_by_id(worker_id)

    if worker is None:
        return {
            "msg": f"The Worker with id: {worker_id}, do not exists in this database.",
            "status": 404,
        }

    if service.company_id == worker["company_id"]:
        return Repository.create_service_worker(service_id, worker_id)
    else:
        return {
            "msg": "Worker and Service are from different companies !",
            "status": 403,
        }

    company = Company.query.get(service.company_id)

    if current_user_id == company.user_id:
        return Repository.create_new_service(body, service_id, worker_id)
    else:
        return {"msg": "You do not have rights to create new services!", "status": 403}


def delete_service_worker(service_id):
    if Repository.delete_service_worker(service_id):
        return (
            {"msg": f"User with id: {service_id}, has been deleted from database."},
            200,
        )
    else:
        return Response.response_error(
            f"User with id: {service_id}, not found in database.", 404
        )
