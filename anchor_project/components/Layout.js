import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const Layout = ({ title, children }) => {
  const { cart } = useSelector((state) => state.cart);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      {/* Head Tag start*/}
      <Head>
        <title>{title ? title + "-Coffee House" : "Coffee House"}</title>
        <meta name="description" content="E-Commerce Website" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {/* Head Tag end */}

      {/* Sections area start with header main and footer  */}

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/" className="text-lg font-bold ">
              The Coffee House
            </Link>
            <div>
              <Link href="/Cart" className="p-2">
                <FaShoppingCart />
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              <Link href="/login" className="p-2">
                Sign in
              </Link>
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className="flex h-12 justify-center items-center shadow-inner">
          <p>Copyright © 2022 The Coffee House</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
