import React, { useEffect, useState } from "react";
import { getOrder } from "./apiCalls";
// require('dotenv').config();

import "./App.css";

function App() {
  const [values, setValues] = useState({
    amount: 0,
    orderId: "",
    error: "",
    success: false,
  });

  const { amount, orderId, error, success } = values;

  useEffect(() => {
    createOrder();
  }, []);

  const createOrder = () => {
    getOrder().then((response) => {
      if(response.error){
        setValues({...values,error:response.error,success:false})
      }else{
        setValues({...values,error:'',success:true,orderId:response.id,amount:response.amount})
      }
    });
  };

  useEffect(() => {
    if(amount > 0 && orderId !== ""){
      showRazorPay();
    }
  },[amount])

  const showRazorPay = () => {
    const { amount, orderId } = values;

    const form = document.createElement("form");
    form.setAttribute("action", `http://localhost:5000/api/payment/callback`);
    form.setAttribute("method", "POST");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.setAttribute("data-key", 'rzp_live_U7D4hIOYxYPTUa');
    script.setAttribute("data-amount", amount);
    script.setAttribute("data-name","InnovationM")
    script.setAttribute("data-profill.contact", "7415318367");
    script.setAttribute("data-profile.email","shivamkosti570@gmail.com");
    script.setAttribute("data-order_id", orderId);
    script.setAttribute("data-profill.name", "Shivam Kosta");
    script.setAttribute("data-image", `http://localhost:5000/api/logo`);
    script.setAttribute("data-buttontext", "Buy Now!!!");
    document.body.appendChild(form);
    form.appendChild(script);
    const input = document.createElement("input");
    input.type = "hidden";
    input.custom = "Hidden Element";
    input.name = "hidden";
    form.appendChild(input);
  };
  return (
    <div className="App">
      {amount == 0 && orderId == "" && <h1>Loading...</h1>}
    </div>
  );
}

export default App;
