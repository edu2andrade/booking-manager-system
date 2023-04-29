from api.models.index import db, Services
from flask import jsonify

# Each new service must be associated with a company so,
# company_id must be included in body or params, wich of this makes more sense?
def create_new_service(body, company_id):
    new_service = Services(company_id, body['date'], body['name'], body['description'], body['service_duration'], body['price'])
    db.session.add(new_service)
    db.session.commit()
    return new_service