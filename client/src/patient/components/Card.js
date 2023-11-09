// import { CardElement } from "@stripe/react-stripe-js";

function Card() {
  return (
    <div>
      <h1>Card</h1>

      <form id="payment-form">
        {/* <CardElement /> */}
        <button>Pay</button>
      </form>
    </div>
  )
}

export default Card;