import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import data from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import { addToCart } from "./cartSlice";

const ProductScreen = () => {
  const { query } = useRouter();
  const { slug } = query;
  const { cart } = useSelector((state) => state.cart);
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product Not found</div>;
  }

  const dispatch = useDispatch();
  const router = useRouter();

  const addToCartHandler = (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInstock < quantity) {
      alert("Sorry! Product is out of stock");
      return;
    }

    dispatch({
      type: addToCart,
      payload: { ...product, quantity },
    });

    router.push("/Cart");
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/"> Back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>

        <div>
          <ul>
            <li>
              <h1 className="text-3xl">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>

            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>
                {product.countInstock > 0 ? "In stock" : " unavailable"}
              </div>
            </div>
            <button
              className="primary-button w-full"
              onClick={() => addToCartHandler(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;
