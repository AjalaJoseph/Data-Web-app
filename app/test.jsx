import fetch from "node-fetch"; // if you're on Next.js 14/15, fetch is built-in, so you can remove this line

const token = "b936cc2e899b287163f70e96e2957ff20bf98791";

async function testAirtime() {
  try {
    const res = await fetch("https://client.peyflex.com.ng/api/airtime/topup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        network: "MTN",
        amount: "100",
        mobile_number: "09130286805",
        Ported_number: true,
      }),
    });

    const data = await res.json();
    console.log("✅ Peyflex Response:", data);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

testAirtime();
