from api.models.index import db, Services_workers, Booking, Workers, Company, User
import api.domain.booking.repository as Repository
import api.domain.company.controller as CompanyController
import api.domain.workers.controller as WorkersController

def create_new_booking(company_id, current_user_id, body):
    
    service_name = body['service']
    worker_name = body['worker']

    service_workers = Services_workers.query.filter_by(service_id=service_name, worker_id=worker_name).first()

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

    if user.role_type == 'admin':
        # if admin:
        company = Company.query.filter_by(user_id=current_user_id).first()
        if company is None:
            return {'msg': f'Company with id: {company.id}, does not exist in this database', 'status': 404}

    if user.role_type == 'worker': 
        # if worker
        worker = Workers.query.filter_by(user_id=current_user_id).first()
        if worker is None:
            return {'msg': f'This worker does not exist in this database', 'status': 404}
    

    if booking is None:
        return {'msg': f'The booking with id: {booking_id}, does not exist in this database.', 'status': 404}


    if current_user_id == company.user_id or company.id == (worker.company_id or None):
        return booking
        
    return {'msg': 'You do not have rights to see this bookings!', 'status': 403}
        

def get_bookings_by_company(company_id, current_user_id):

    company = CompanyController.get_company_by_id(company_id)
    bookings_by_company = Repository.get_bookings_by_company(company_id)

    if current_user_id != company.user_id:
        return {'msg': 'You do not have rights to see this bookings!', 'status': 403}
        
    return bookings_by_company