from api.models.index import db, Company

def create_company(data):
    new_company = Company(data['user_id'], data['cif'], data['name'], data['description'], data['address'], data['working_schedule'])
    db.session.add(new_company)
    db.session.commit()
    return new_company.serialize()

def get_company_by_id(id):
    company = Company.query.get(id)
    return company.serialize()

def update_company(data, company_id):
    company = Company.query.get(company_id)
    if company:
        company.user_id = data['user_id']
        company.cif = data['cif']
        company.name = data['name']
        company.description = data['description']
        company.address = data['address']
        company.working_schedule = data['working_schedule']
        db.session.commit()
        return company
    else:
        return None

def delete_company(id):
    company = Company.query.get(id)
    if company is None:  
        return company  
    else:
        #add delete functions for services, workers and products 
        db.session.delete(company)
        db.session.commit()
    return company