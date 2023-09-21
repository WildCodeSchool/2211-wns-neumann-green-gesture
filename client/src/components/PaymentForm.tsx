import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { useState } from "react";

const PaymentForm = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>("");
  const [success, setSuccess] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/",
      },
      redirect: "if_required",
    });

    if (error) {
      setSuccess(false);
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setSuccess(true);
      setMessage(`Paiement effectué avec succès`);
    } else {
      setSuccess(false);
      setMessage("Etat de paiement inattendu");
    }

    setProcessing(false);
  };

  return (
    <div className=" bg-white rounded-lg shadow-2xl p-5">
      <PaymentElement />
      <button
        onClick={handlePayment}
        disabled={processing}
        className="w-full my-5"
      >
        {processing ? "Loading..." : "Pay"}
      </button>
      {message && (
        <p
          className={`text-center font-bold ${
            success ? "text-green-500" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default PaymentForm;
