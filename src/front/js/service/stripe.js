import { loadStripe } from "@stripe/stripe-js";

const stripeApiPublicKey = process.env.STRIPE_PUBLISHABLE_KEY;

const getStripeJs = async () => {
  const stripeJs = await loadStripe(stripeApiPublicKey || "");
  return stripeJs;
};

export default getStripeJs;
