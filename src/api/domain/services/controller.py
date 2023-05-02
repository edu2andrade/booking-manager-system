from api.models.index import db, Company, Services
import api.domain.services.repository as Repository
import api.utilities.handle_response as Response

def create_new_service(company_id, current_user_id, body):
    company = Company.query.get(company_id)
    company_user_id = company.user_id

    if current_user_id != company_user_id:
        return Response.response_error("User is not the company admin", 400)

    # if service already exists... compare with name, id?

    new_service = Repository.create_new_service(body, company_id)
    return Response.response_ok('New service created successfully!', new_service.serialize())



def get_services_list(company_id):
    services = Services.query.all()

    services_by_company_id = Company.query.filter_by(id=company_id)
    print('services by id -->', services_by_company_id)

    # if services['company_id'] == company_id:
    #     all_services = Repository.get_services_list()

    return Response.response_ok('List of all services of this company', services_by_company_id.serialize())

