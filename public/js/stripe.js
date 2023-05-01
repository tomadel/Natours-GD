/*eslint-disable*/
import axios from 'axios';

export const bookTour = async tourId => {
  const stripe = Stripe(
    'pk_test_51N12yZDdtcZJgpwWKLs4LEkzAMHdmVkoFoONms7sEqlNfdKLjfy4FmECtl4XKVJlzC3To1weDi4Zip4LOrTzYlND00hdaql1q8'
  );

  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
