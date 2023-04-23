from api.models.index import db, Company

def create_company(data):
    new_company = Company(data['user_id'], data['cif'], data['name'], data['description'], data['address'], data['working_schedule'])
    db.session.add(new_company)
    db.session.commit()
    return new_company.serialize()

def get_all_companies(): 
    companies = Company.query.all()
    serialize_all_companies = list(map(lambda company: company.serialize(), companies))
    return serialize_all_companies

def get_company_by_id(id):
    company = Company.query.get(id)
    return company.serialize()

def delete_company(id):
    company = Company.query.get(id)
    if company is None:  
        return company  
    else:
        #add delete functions for services, workers and products 
        db.session.delete(company)
        db.session.commit()
    return company