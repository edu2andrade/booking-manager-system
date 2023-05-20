from api.models.index import db, Services_workers, Booking, Workers, Company, User
import api.domain.booking.repository as Repository
import api.domain.company.controller as CompanyController
import api.domain.workers.controller as WorkersController

def create_new_booking(company_id, current_user_id, body):
    
    service_name = body['service']
    worker_name = body['worker']

    service_workers = Services_workers.query.filter_by(service_id=service_name, worker_id=worker_name).first()

    if service_workers is None:
        return {'msg': 'This service / Worker relationship does not exist', 'status': 404}

    new_booking = Repository.create_new_booking(body, current_user_id, company_id, service_workers.id)

    return new_booking


def admin_create_new_booking(company_id, current_user_id, body):
    
    company = Company.query.filter_by(id=company_id).first()
    worker = Workers.query.filter_by(user_id=current_user_id).first()

    if company is None:
        return {'msg': f'Company with id: {company_id}, does not exist in this database', 'status': 404}

    if worker is None:
        return {'msg': f'Worker with id: {current_user_id}, does not exist in this database', 'status': 404}

    if current_user_id == company.user_id or company_id == worker.company_id:
        service_name = body['service']
        worker_name = body['worker']

        service_workers = Services_workers.query.filter_by(service_id=service_name, worker_id=worker_name).first()

        new_booking = Repository.admin_create_new_booking(None, body, company_id, service_workers.id)

        return new_booking
    else:
        return {'msg': 'You do not have rights to create new bookings!', 'status': 403}


def get_booking(booking_id, current_user_id):

    booking = Repository.get_booking(booking_id)
    user = User.query.filter_by(id=current_user_id).first()

    if booking is None:
        return {'msg': f'The booking with id: {booking_id}, does not exist in this database.', 'status': 404}

    if user.roles.type == 'admin':
        company = Company.query.filter_by(user_id=current_user_id).first()
        if company is None:
            return {'msg': f'Company with id: {company.id}, does not exist in this database', 'status': 404}

    if user.roles.type == 'worker': 
        worker = Workers.query.filter_by(user_id=current_user_id).first()
        company = Company.query.filter_by(id=worker.company_id).first()
        if worker is None or company is None:
            return {'msg': 'This worker / company does not exist in this database', 'status': 404}

    if user.roles.type == 'client':
        return booking

    if current_user_id == company.user_id or company.id == worker.company_id:
        return booking
        
    return {'msg': 'You do not have rights to see this bookings!', 'status': 403}
        

def get_bookings_by_company(company_id, current_user_id):

    bookings_by_company = Repository.get_bookings_by_company(company_id)
    user = User.query.filter_by(id=current_user_id).first()

    if user.roles.type == 'admin':
        company = Company.query.filter_by(user_id=current_user_id).first()
        if company is None:
            return {'msg': f'Company with id: {company.id}, does not exist in this database', 'status': 404}

    if user.roles.type == 'worker': 
        worker = Workers.query.filter_by(user_id=current_user_id).first()
        company = Company.query.filter_by(id=worker.company_id).first()
        if worker is None or company is None:
            return {'msg': 'This worker / company does not exist in this database', 'status': 404}

    if user.roles.type == 'client':
        return bookings_by_company
    

    if current_user_id != company.user_id:
        return {'msg': 'You do not have rights to see this bookings!', 'status': 403}
        
    return bookings_by_company

def get_bookings_by_user_id(user_id, current_user_id):

    if user_id == current_user_id:
        return Repository.get_booking_by_user_id(user_id)
    else:
        return {'msg': 'You do not have rights to see this bookings!', 'status': 403}

def delete_booking(booking_id, current_user_id):
    
    booking = Booking.query.get(booking_id)
    user = User.query.filter_by(id=current_user_id).first()

    if booking is None:
        return {'msg': f'The booking with id: {booking_id}, does not exist in this database.', 'status': 404}

    if user.roles.type == 'admin' or user.roles.type == 'worker':
        company = Company.query.filter_by(user_id=current_user_id).first()
        worker = Workers.query.filter_by(user_id=current_user_id).first()

        if worker is None or company is None:
            return {'msg': 'This worker / company does not exist in this database', 'status': 404}

        if current_user_id == company.user_id or company.id == worker.company_id:
            return Repository.delete_booking(booking_id)
        

    if user.roles.type == 'client':
        if current_user_id == user.id:
            return Repository.delete_booking(booking_id)

    return {'msg': 'You do not have rights to see this bookings!', 'status': 403}