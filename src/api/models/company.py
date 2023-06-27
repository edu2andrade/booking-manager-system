from api.models.db import db

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    cif = db.Column(db.String(8), unique=True, nullable=False)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(300), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    opening_time = db.Column(db.String(120), nullable=False)
    closing_time = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False, default=True)

    user = db.relationship("User")
    services = db.relationship("Services", back_populates="company")
    workers = db.relationship("Workers", back_populates="company")

    def __init__(self, user_id, cif, name, description, address, opening_time, closing_time):
        self.user_id = user_id
        self.cif = cif
        self.name = name
        self.description = description
        self.address = address
        self.opening_time = opening_time
        self.closing_time = closing_time

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "cif": self.cif,
            "name": self.name,
            "description": self.description,
            "address": self.address,
            "opening_time": self.opening_time, 
            "closing_time": self.closing_time, 
            "is_active": self.is_active,
            "services": list(map(lambda service: service.serialize(), self.services)),
            "workers": list(map(lambda worker: worker.serialize(), self.workers)),
        }


    