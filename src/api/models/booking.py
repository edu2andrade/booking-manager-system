
from api.models.db import db
from sqlalchemy import DateTime
import datetime 

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)
    service_workers_id = db.Column(db.Integer, db.ForeignKey("services_workers.id"))
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow())
    start_service = db.Column(DateTime, nullable=False)
    description = db.Column(db.Text)
    user = db.relationship("User")
    services_workers = db.relationship("Services_workers")

    def __init__(self, user_id, service_workers_id, start_service, description):
        self.user_id = user_id
        self.service_workers_id = service_workers_id
        self.start_service = start_service
        self.description = description

    def serialize(self):
        return {
            "id": self.id, 
            "created_at": self.created_at,
            "user_id": self.user_id,
            "user": self.user.serialize(),
            "service_workers_id": self.service_workers_id,
            "start_service": self.start_service,
            "description": self.description,
            "services_workers": self.services_workers.serialize()
        }