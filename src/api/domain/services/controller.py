import api.domain.services.repository as Repository
import api.utilities.handle_response as Response

def create_new_service(body, company_id):
    new_service = Repository.create_new_service(body, company_id)
    return Response.response_ok('New service created successfully!', new_service)
