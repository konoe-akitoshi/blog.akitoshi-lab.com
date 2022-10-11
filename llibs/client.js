// libs/client.js
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "akitoshi-lab",
  apiKey: process.env.API_KEY,
});
