from api.models.db import db

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    cif = db.Column(db.Integer(), nullable=False)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(300))
    address = db.Column(db.String(200), unique=True, nullable=False)
    working_schedule = db.Column(db.String(120), unique=True, nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False, default=True)
    user = db.relationship("User")
    services = db.relationship("Services", back_populates = "company")
    products = db.relationship("Products", back_populates = "company")
    workers = db.relationship("Workers", back_populates = "company")

    def __init__(self, user_id, cif, name, description, address, working_schedule):
        self.user_id = user_id
        self.cif = cif
        self.name = name
        self.description = description
        self.address = address
        self.working_schedule = working_schedule

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "cif": self.cif,
            "name": self.name,
            "description": self.description,
            "address": self.address,
            "working_schedule": self.working_schedule,
            "is_active": self.is_active
        }
    
    def serialize_services(self):
        return {
            "id": self.id,
            "services": list(map(lambda service: service.serialize_populate(), self.services))
        }

    def serialize_products(self):
        return {
            "id": self.id,
            "products": list(map(lambda product: product.serialize_populate(), self.products))
        }

    def serialize_workers(self):
        return {
             "id": self.id,
            "workers": list(map(lambda worker: worker.serialize_populate(), self.workers))
        }

    