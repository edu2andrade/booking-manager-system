import api.domain.company.repository as Repository 
from api.models.index import db, Company, User

def create_company(body):
    user_id = body['user_id']
    user = User.query.get(user_id)
    print(user.id, "user printed")

    if user is None: 
        return {'msg': 'User does not exist', 'status': 400}
    
    return Repository.create_company(body)

def get_companies_list():

	all_companies = Repository.get_companies_list()
	return all_companies

def get_company_by_id(company_id):
    company = Company.query.get(company_id)

    if company is None:
        return {'msg': f'Company with id: {company_id}, do not exists in this database.', 'status': 404}
    
    company = Repository.get_company_by_id(company_id)
    return company

def update_company(company_id, current_user_id, update_company):
    company = Company.query.get(company_id)

    company_user_id = company.user_id
    
    if current_user_id != company_user_id:
        return {'msg': 'You do not have rights to update this company!', 'status': 403}

    updated_company = Repository.update_company(update_company, company_id)
    return updated_company

def delete_company(company_id, current_user_id):
    company = Company.query.get(company_id)
    
    company_user_id = company.user_id

    if current_user_id != company_user_id:
        return {'msg': 'You do not have rights to delete this company!', 'status': 403}

    deleted_company = Repository.delete_company(company_id) 
    return deleted_company
    