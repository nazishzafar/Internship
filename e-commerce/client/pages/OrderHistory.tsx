import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import {
  Fetch_fail1,
  Fetch_request1,
  Fetch_success1,
} from "./product/cartSlice";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: Fetch_request1 });
        const { data } = await axios.get("/api/order/history");

        dispatch({ type: Fetch_success1, payload: data });
      } catch (error) {
        dispatch({ type: Fetch_fail1, payload: getError(error) });
      }
    };
    fetchOrders();
  }, []);

  return (
    <Layout title="Order History">
      <h1 className="mb-4 text-lg">Order History</h1>
      {cart.loading ? (
        <div>Loading...</div>
      ) : cart.error ? (
        <div className="alert-error">{cart.error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left">ID</th>
                <th className="p-5 text-left">DATE</th>
                <th className="p-5 text-left">TOTAL</th>
                <th className="p-5 text-left">PAID</th>
                <th className="p-5 text-left">Delivered</th>
                <th className="p-5 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {cart?.orders?.map((orders) => (
                <tr key={orders?._id} className="border-b">
                  <td className="p-5">{orders._id.substring(20, 24)}</td>
                  <td className="p-5">{orders.createdAt.substring(0, 10)}</td>
                  <td className="p-5">{orders.totalPrice}</td>
                  <td className="p-5">
                    {orders.isPaid
                      ? `${orders.paidAt.substring(0, 10)}`
                      : "Not Paid"}
                  </td>
                  <td className="p-5">
                    {orders.isDelivered
                      ? `${orders.deliveredAt.substring(0, 10)}`
                      : "Not Delivered"}
                  </td>
                  <td className="p-5">
                    <Link href={`/orders/${orders._Id}`} passHref>
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

OrderHistory.auth = true;
export default OrderHistory;
