import api.domain.workers.repository as Repository
import api.utilities.handle_response as Response
import api.domain.users.controller as UserController
import api.domain.company.controller as CompanyController


def create_work(data, company_id):
    company = CompanyController.get_company_by_id(company_id)
    if company is None:
        return "Company not found"

    new_user = UserController.create_new_user(data)
    if new_user is None:
        return "User not found"

    worker_id = new_user.id
    if worker_id is None:
        return "Worker not found"

    return Repository.create_work(company.id, worker_id, data["working_schedule"])


def get_worker_list():
    all_workers = Repository.get_worker_list()
    return Response.response_ok("List of all workers", all_workers)


def get_worker_by_id(worker_id):
    worker = Repository.get_worker_by_id(worker_id)
    if worker is None:
        return Response.response_error("Worker not found", 404)
    return worker


def delete_worker(workers_id):
    is_deleted_worker = Repository.delete_worker(workers_id)

    if is_deleted_worker:
        return ({"message": "Worker successfully deleted."}), 200
    else:
        return ({"message": "Worker not found."}), 404
