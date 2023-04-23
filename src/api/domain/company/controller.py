import api.domain.products.repository as Repository 
import api.utilities.handle_response as Response

def create_company(data):
    if data['cif'] is None or data['cif'] == '':
        return Response.response_error('CIF not valid', 400)
    
    if data['name'] is None or data['name'] == '':
        return Response.response_error('Company name not valid', 400)
    
    return Repository.create_company(data), 201

def get_all_companies():
    all_companies = Repository.get_all_companies()
    return Response.response_ok(all_companies)

def get_company_by_id(company_id):
    company = Repository.get_company_by_id(company_id)

    if company is None:
        return Response.response_error('Company not found', 404)
    
    return company

def delete_company(id):
    if not isinstance(id, int):
        return Response.response_error("ID is not a number", 404)
    company = Repository.delete_company(id) 
    if company is not None:
        return Response.response_ok("Company deleted") 
    else:
        return Response.response_error("ID not found", 404)