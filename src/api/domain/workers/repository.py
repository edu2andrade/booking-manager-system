from api.models.index import db, Workers
from flask import request, jsonify


def create_work(company_id, user_id, working_schedule):
    new_work = Workers(user_id, company_id, working_schedule)
    db.session.add(new_work)
    db.session.commit()
    return new_work


def get_worker_list():
    all_workers = Workers.query.all()
    serialized_workers = list(map(lambda worker: worker.serialize(), all_workers))
    return serialized_workers


def get_worker_by_id(id):
    worker = Workers.query.get(id)
    return worker


def delete_worker(id):
    worker = Workers.query.get(id)
    if worker:
        db.session.delete(worker)
        db.session.commit()
        return True
    else:
        return False
