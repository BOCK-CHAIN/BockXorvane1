
import { Client,Environment } from "@paypal/paypal-server-sdk";

export const paypalclient = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET as string,
  },
  timeout: 0,
  environment: process.env.NEXT_PUBLIC_PAYPAL_ENV as Environment,
});