from api.models.index import db, Services_workers



def get_all_servicesWorkers():
    all_servicesWorkers = Services_workers.query.all()
    serialize_all_servicesWorkers = list(map(lambda services_workers : services_workers.serialize(), all_servicesWorkers))
    return serialize_all_servicesWorkers

def get_service_by_id(service_id):
    service = ServicesWorkers.query.get(service_id)
    if service is None:
        return service
    return service.serialize()