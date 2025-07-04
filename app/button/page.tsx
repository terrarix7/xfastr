"use client";

import { api } from "@/convex/_generated/api";
import { Authenticated, useAction, useQuery } from "convex/react";
import { CheckoutLink } from "@convex-dev/polar/react";
import React from "react";

function Page() {
  const products = useQuery(api.myFunctions.listProducts);
  const syncProducts = useAction(api.myFunctions.syncProducts);

  return (
    <div>
      <button onClick={() => syncProducts()}>Sync Products</button>
      <h1>Products</h1>
      {products === undefined ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Found {products.length} products:</p>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <p>Price: ${product.prices?.[0]?.priceAmount || "N/A"}</p>
                <p>ID: {product.id}</p>
                <Authenticated>
                  <CheckoutLink
                    polarApi={{
                      generateCheckoutLink: api.polar.generateCheckoutLink,
                    }}
                    productIds={[product.id]}
                  >
                    Subscribe
                  </CheckoutLink>
                </Authenticated>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Page;
