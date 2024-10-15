import React, { useState, useRef, useEffect } from "react";
import useCommand from "../../utilities/client/command_function";

const PayWithPayPal = ({product= {price: 777.77, description: "Fancy chair, like new", img: '../../assets/img-1.jpg'}, id_plat = "plat001"}) => {
    const [paidFor, setPaidFor] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState(null); // Stocker les infos de paiement
    const [loaded, setLoaded] = useState(false);
    const { insertCommande } = useCommand();

    const paypalRef = useRef();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AXzzJWcZOR2KYl579f93LuHej4ya_rI7aPAS71J5aA1nt9ZPeKn2HAMhvZGwHsGY2HGaZJSZAR59M2je";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script); // Nettoyage pour éviter les fuites de mémoire
        };
    }, []);

    useEffect(() => {
        if (loaded) {
            setTimeout(() => {
                window.paypal.Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description: product.description,
                                    amount: {
                                        currency_code: "USD",
                                        value: product.price,
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();

                        // Afficher les détails du paiement dans la console
                        console.log(order);

                        // Extraire les informations pertinentes du paiement
                        const paymentInfo = {
                            payerName: order.payer.name.given_name + ' ' + order.payer.name.surname,
                            payerEmail: order.payer.email_address,
                            paymentId: order.id,
                            status: order.status,
                            payeeEmail: order.purchase_units[0].payee.email_address,
                            amount: order.purchase_units[0].amount.value,
                            currency: order.purchase_units[0].amount.currency_code
                        };

                        console.log("Payment Info: ", paymentInfo);

                        setPaidFor(true);
                        setPaymentDetails(paymentInfo); // Sauvegarder les détails du paiement
                        await insertCommande(id_plat);
                    },
                }).render(paypalRef.current); // Utiliser paypalRef.current
            });
        }
    }, [loaded]);

    return (
        <>
            {paidFor ? (
                <div>
                    <h1>Payment Successful!</h1>
                    {paymentDetails && (
                        <div>
                            <p><strong>Transaction ID:</strong> {paymentDetails.paymentId}</p>
                            <p><strong>Payer Name:</strong> {paymentDetails.payerName}</p>
                            <p><strong>Payer Email:</strong> {paymentDetails.payerEmail}</p>
                            <p><strong>Amount:</strong> {paymentDetails.amount} {paymentDetails.currency}</p>
                            <p><strong>Paid to:</strong> {paymentDetails.payeeEmail}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="d-flex align-items-center justify-content-center" style={{overflow: 'scroll', flexDirection: 'column'}}>
                    <h1 style={{fontFamily: 'pacifico', fontSize: '20px'}}>
                        {product.description} for ${product.price}
                    </h1>
                    <img src={product.img} style={{width: '60%', paddingTop: '10px', paddingBottom: '10px'}} alt={product.description} />
                    <div ref={paypalRef}></div>
                </div>
            )}
        </>
    );
};

export default PayWithPayPal;
