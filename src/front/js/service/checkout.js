import { URL } from ".";
import getStripeJs from "./stripe.js";

export const createHaircutCheckout = async () => {
  const response = await fetch(`${URL}/checkout/haircut`, {
    method: "POST",
  });
  const { sessionId } = await response.json();
  const stripe = await getStripeJs();
  if (stripe) {
    const result = await stripe.redirectToCheckout({
      sessionId,
    });
    if (result.error) {
      console.error(`Something goes wrong here --> ${result.error.message}`);
    }
  } else {
    console.error("Failed to load Stripe.js");
  }
};
