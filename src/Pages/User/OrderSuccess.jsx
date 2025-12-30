// import React from "react";
// import { useParams } from "react-router-dom";

const OrderSuccess = () => {
  // const { orderId } = useParams();

  // const downloadInvoice = () => {
  //   window.open(`http://localhost:9000/Invoice/${orderId}.pdf`, "_blank");
  // };

  return (
    <div className="order-success text-center py-5 my-5">
      <h2>Thank you for your order!</h2>
      {/* <p>Your order ID: {orderId}</p>
      <button onClick={downloadInvoice}>Download Invoice</button> */}
    </div>
  );
};

export default OrderSuccess;
