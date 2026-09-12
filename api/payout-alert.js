export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, userId, amount, coins, method, account } = req.body;
  const BOT_TOKEN = "8656552035:AAGNrF-04-VISuC_-RvCtMH2z9XfICvKV6g";
  const ADMIN_ID = "7504650333";

  const msgText = `🚨 *NEW CASHOUT REQUEST!*\n\n` +
                  `👤 *User:* ${name}\n` +
                  `🆔 *User ID:* \`${userId}\`\n` +
                  `💰 *Amount:* ₹${amount} (${coins} Coins)\n` +
                  `💳 *Method:* ${method}\n` +
                  `📌 *UPI / Account:* \`${account}\`\n` +
                  `🕒 *Time:* ${new Date().toLocaleString()}`;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: ADMIN_ID,
        text: msgText,
        parse_mode: 'Markdown'
      })
    });

    const data = await telegramRes.json();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

