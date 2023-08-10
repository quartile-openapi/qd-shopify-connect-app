import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { login } from "../../shopify.server";

import indexStyles from "./style.css";

export const links = () => [{ rel: "stylesheet", href: indexStyles }];


export async function loader({ request }) {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return json({ showForm: Boolean(login), buildId: process.env.BUILD_ID || "0", buildNumber: process.env.BUILD_NUMBER || "0" });
}



export default function App() {
  const { showForm, buildId, buildNumber } = useLoaderData();

  return (
    <div className="index">
      <div className="content">
        <h1>Shopify connect version: {buildId} - {buildNumber} </h1>
        <p>This application allows you to connect your Shopify account with Quartile LLC</p>
        {showForm && (
          <Form method="post" action="/auth/login">
            <label>
              <span>Shop domain</span>
              <input type="text" name="shop" />
              <span>e.g: my-shop-domain.myshopify.com</span>
            </label>
            <button type="submit">Log in</button>
          </Form>
        )}
      </div>
    </div>
  );
}
