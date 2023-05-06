from api.models.index import db, Services_workers


def get_all_servicesWorkers():
    all_servicesWorkers = Services_workers.query.all()
    serialize_all_servicesWorkers = list(
        map(lambda services_workers: services_workers.serialize(), all_servicesWorkers)
    )
    return serialize_all_servicesWorkers


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
