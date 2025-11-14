const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).end();
  const { timestamp, signature, apiKey } = req.query;
  const url = `https://api.binance.com/api/v3/account?timestamp=${timestamp}&signature=${signature}`;
  try {
    const resp = await fetch(url, { headers: { 'X-MBX-APIKEY': apiKey } });
    const data = await resp.json();
    res.status(resp.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
