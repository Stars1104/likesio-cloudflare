import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = () => {
    return (
        <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "" }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "10.00", // Set the price dynamically
                                },
                            },
                        ],
                    });
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order?.capture();
                    console.log("Order Successful: ", order);
                    alert("Payment Successful!");
                }}
                onError={(err) => {
                    console.error("Payment Error: ", err);
                    alert("Payment failed!");
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;