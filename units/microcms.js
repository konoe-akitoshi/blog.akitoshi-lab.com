const { createClient } = require('microcms-js-sdk');
require('dotenv').config();
const { API_KEY, SERVICE_ID } = 2e58c920057b4ccdb387c5bb4eb04ba5201c, akitoshi-lab;
export const client = createClient({
  serviceDomain: SERVICE_ID,
  apiKey: API_KEY,
});