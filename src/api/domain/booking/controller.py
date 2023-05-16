from api.models.index import db, Company
import api.domain.booking.repository as Repository
import api.domain.company.controller as CompanyController

def create_new_booking(company_id, current_user_id, body):
    if body['user_id']:
        user_id = body['user_id']
    else:
        user_id = None

    # service_worker existe?
    

    company = CompanyController.get_company_by_id(company_id)

    if current_user_id == company.user_id:
        return Repository.create_new_booking(body, user_id)
    else:
        return {'msg': 'You do not have rights to create new services!', 'status': 403}
