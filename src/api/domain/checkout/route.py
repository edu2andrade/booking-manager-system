import os
from flask import Flask, Blueprint, redirect, jsonify
import stripe

stripe.api_key = os.environ['STRIPE_SECRET_KEY']
MY_DOMAIN = os.environ['FRONTEND_URL']

# dredlock= price_1NQEYiIEtd5JLSEzZBQErgG9
# woman haircut= price_1NQEXuIEtd5JLSEzD3Q5Dl3A


api = Blueprint('api/checkout', __name__)


@api.route('/haircut', methods=['POST'])
def create_checkout_session():
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price': 'price_1NQEWmIEtd5JLSEzvpd7SFB3',
                    'quantity': 1,
                },
            ],
            allow_promotion_codes=True,
            mode='payment',
            success_url=MY_DOMAIN + '?success=true',
            cancel_url=MY_DOMAIN + '?canceled=true',
        )
    except Exception as e:
        return str(e)

    return jsonify({ "sessionId": checkout_session.id }), 303
    # return redirect(checkout_session.url, code=303)
    