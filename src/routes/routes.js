import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../App";
import PaymentStatus from "../components/paymentStatusComponent";

const Routes = () => {
  return (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/payment/status/:paymentId" component={PaymentStatus} />
        </Switch>
    </Router>
  )
};

export default Routes;
