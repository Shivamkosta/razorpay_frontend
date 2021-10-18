import React, { useEffect, useState } from "react";
import { grabStatus } from "../apiCalls";

const PaymentStatus = ({ match }) => {
  const [values, setValues] = useState({
    amount: "",
    error: "",
  });

  const { amount, error } = values;

  useEffect(() => {
    getPaymentStatus(match.params.paymentId);
  }, []);
  
  const getPaymentStatus = (paymentId) => {
    grabStatus(paymentId).then((response) => {
      if (response.error) {
        setValues({ ...values, error: response.error, amount: "" });
      } else {
        setValues({ ...values, error: "", amount: response.amount });
      }
    });
  };
  return (
    <div>
      { error && <h1 style={{color:'red'}}>{error}</h1>}
      { amount > 0 && <h1 style={{color:'green'}}>Your Order of Rs.{amount/100} Successfully</h1>}
      { !error && !amount && <h1 style={{color:'Orange'}}>Loading...</h1> }
    </div>
  );
};

export default PaymentStatus;
