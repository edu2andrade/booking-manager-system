from api.models.index import db, Services_workers, Services, Workers


def get_all_servicesWorkers():
    all_servicesWorkers = Services_workers.query.all()
    serialize_all_servicesWorkers = list(
        map(lambda services_workers: services_workers.serialize(), all_servicesWorkers)
    )
    return serialize_all_servicesWorkers


def get_service_worker_by_id(service_id):
    service_worker = Services_workers.query.get(service_id)
    if service_worker is None:
        return service_worker
    return service_worker.serialize()


def get_services_workers_by_company(company_id):
    services_workers_by_company = db.session.query(Services_workers).join(Services).filter(Services.company_id == company_id).join(Workers).all()
    return services_workers_by_company

def create_service_worker(service_id, worker_id):
    new_service_worker = Services_workers(worker_id, service_id)
    db.session.add(new_service_worker)
    db.session.commit()
    return new_service_worker


def delete_service_worker(service_id):
    service_worker = Services_workers.query.get(service_id)
    if service_worker is not None:
        db.session.delete(service_worker)
        db.session.commit()
        return True
    else:
        return False
