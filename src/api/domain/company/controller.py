import api.domain.company.repository as Repository 
import api.utilities.handle_response as Response

def create_company(data):
    if data['cif'] is None or data['cif'] == '':
        return Response.response_error('Company CIF not found', 400)
    
    if data['name'] is None or data['name'] == '':
        return Response.response_error('Company name not found', 400)
    
    return Repository.create_company(data), 201

def get_company_by_id(company_id):
    company = Repository.get_company_by_id(company_id)

    if company is None:
        return Response.response_error('Company not found', 404)
    return company

def update_company(update_company, company_id):
    update_company = Repository.update_company(update_company, company_id)
    if update_company:
        return Response.response_ok(f'User with id: {company_id}, has been updated in database.', update_company.serialize())
    else:
        return Response.response_error(f'User with id: {company_id}, not found in database.', 404)

def delete_company(id):
    if not isinstance(id, int):
        return Response.response_error("ID is not a number", 404)
    company = Repository.delete_company(id) 
    if company is not None:
        return Response.response_ok("Company deleted", 200) 
    else:
        return Response.response_error("ID not found", 404)