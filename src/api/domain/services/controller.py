from api.models.index import db, Company, Services
import api.domain.services.repository as Repository

def create_new_service(company_id, current_user_id, current_user_role_id, body):
    company = Company.query.get(company_id)

    if company is None:
        return {'msg': f'The Company with id: {company_id}, do not exists in this database.', 'status': 404}

    if current_user_id == company.user_id and ucurrent_user_role_id == 1:
        return Repository.create_new_service(body, company_id)
    else:
        return {'msg': 'You do not have rights to create new services!', 'status': 403}

def get_services_by_company(company_id):
    company = Company.query.get(company_id)
    if company is None:
        return {'msg': f'The Company with id: {company_id}, does not exists in this database.', 'status': 404}

    services = Repository.get_services_by_company(company_id)
    return services

def get_single_service(service_id):
    service = Repository.get_single_service(service_id)
    if service is None:
        return {'msg': f'The service with id: {service_id}, does not exists in this database.', 'status': 404}

    return service

def delete_service(service_id, current_user_id, current_user_role_id):
    service = Services.query.get(service_id)

    if service is None:
        return {'msg': f'The service with id: {service_id}, does not exists in this database.', 'status': 404}
        
    service_company_id = service.company_id
    company = Company.query.get(service_company_id)

    if company is None:
        return {'msg': f'The Company with id: {service_company_id}, does not exists in this database.', 'status': 404}

    company_user_id = company.user_id
    
    if current_user_id == company_user_id and current_user_role_id == 1:
        deleted_service = Repository.delete_service(service_id)
        return deleted_service
    else:
        return {'msg': 'You do not have rights to delete services!', 'status': 403}
