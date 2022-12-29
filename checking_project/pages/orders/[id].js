import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import {
  Fetch_fail,
  Fetch_request,
  Fetch_success,
  pay_fail,
  pay_request,
  pay_reset,
  pay_success,
} from "../product/cartSlice";

const OrderScreen = () => {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { query } = useRouter();
  const orderId = query.id;
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: Fetch_request });
        const { data } = await axios.get(`/api/order/${orderId}`);

        dispatch({ type: Fetch_success, payload: data });
      } catch (error) {
        dispatch({ type: Fetch_fail, payload: getError(error) });
      }
    };

    if (
      !cart?.order?._id ||
      cart?.order?._id ||
      cart?.successPay ||
      cart?.order?._id !== orderId
    ) {
      fetchOrder();
      if (cart?.successPay) {
        dispatch({ type: pay_reset });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientid } = await axios.get("/api/keys/paypal");
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientid,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [cart.order, orderId, paypalDispatch, cart?.successPay]);

  const ShippingAddress = cart?.order?.shippingAddress;
  const paymentMethod = cart?.order?.paymentMethod;
  const orderItems = cart?.order?.orderItems;
  const itemsPrice = cart?.order?.itemsPrice;
  const taxPrice = cart?.order?.taxPrice;
  const shippingPrice = cart?.order?.shippingPrice;
  const totalPrice = cart?.order?.totalPrice;
  const isPaid = cart?.order?.isPaid;
  const paidAt = cart?.order?.paidAt;
  const isDelivered = cart?.order?.isDelivered;
  const deliveredAt = cart?.order?.deliveredAt;

  const createOrder = (actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprove = (actions) => {
    return actions.order.capture().then(async function details() {
      try {
        dispatch({ type: pay_request });
        const { data } = await axios.put(
          `api/order/${cart?.order?.id}/pay`,
          details
        );
        dispatch({ type: pay_success, payload: data });
        toast.success("Order is paid successfully");
      } catch (error) {
        dispatch({ type: pay_fail, payload: getError(error) });
        toast.error(getError(error));
      }
    });
  };

  function onError(err) {
    toast.error(err);
  }

  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>

      {cart.loading ? (
        <div>Loading...</div>
      ) : cart.error ? (
        <div className="alert-error">{cart.error}</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="md:col-span-3 overflow-x-auto">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {ShippingAddress?.fullName},{ShippingAddress?.address},{""}
                {ShippingAddress?.city},{ShippingAddress?.postalCode},{""}
              </div>
              {isDelivered ? (
                <div className="alert-success">Delivered At {deliveredAt}</div>
              ) : (
                <div className="alert-error">Not delivered</div>
              )}
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success">Paid At {paidAt}</div>
              ) : (
                <div className="alert-error">Not Paid</div>
              )}
            </div>

            <div className="overflow-x-auto p-5 card">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems?.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="mb-2 text-lg">Order Summary</h2>
            <ul>
              <li>
                <div className="flex justify-between mb-2">
                  <div>Items</div>
                  <div>${itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between mb-2">
                  <div>Tax</div>
                  <div>${taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between mb-2">
                  <div>Shipping</div>
                  <div>${shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between mb-2">
                  <div>Total Price</div>
                  <div>${totalPrice}</div>
                </div>
              </li>
              {!isPaid && (
                <li>
                  {isPending ? (
                    <div>Loading...</div>
                  ) : (
                    <div className="w-full">
                      <PayPalScriptProvider
                        options={process.env.PAYPAL_CLIENT_ID}
                      >
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </PayPalScriptProvider>
                    </div>
                  )}
                  {cart?.loadingPay && <div>Loading...</div>}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default OrderScreen;
OrderScreen.auth = true;
