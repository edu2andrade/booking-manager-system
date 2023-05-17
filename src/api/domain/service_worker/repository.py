from api.models.index import db, Services_workers

def create_service_worker(worker_id, service_id ):
    new_service_worker = Services_workers(worker_id, service_id )
    db.session.add(new_service_worker)
    db.session.commit()
    return new_service_worker

def get_workers_by_service(service_id):
    workers_by_service = Services_workers.query.filter_by(service_id=service_id).all()
    return workers_by_service

def get_services_by_worker(worker_id):
    services_by_worker = Services_workers.query.filter_by(worker_id=worker_id).all()
    return services_by_worker

# def get_services_workers_by_company(company_id):
#     services = Services_workers.query.filter_by(services.company_id==company_id).all()
#     # services_workers_by_company = Services_workers.query.filter_by(services.company_id=services.company_id).all()

#     # services_workers_by_company = db.session.query(Services_workers).join(Services).filter(Services.company_id == company_id).join(Workers).all()
#     # serialized_services_by_company_id = list(map(lambda service: service.serialize(), services_worker_by_company))
#     return services_workers_by_company

def delete_service_worker(service_worker_id):
    service_worker = Services_workers.query.get(service_worker_id)
    if service_worker:
        db.session.delete(service_worker)
        db.session.commit()
    else:
        return None
    return service_worker
