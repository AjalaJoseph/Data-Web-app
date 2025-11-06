export async function POST() {
const res = await fetch("https://client.peyflex.com.ng/api/topup/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${process.env.peyflex_key}`,
  },
  body: JSON.stringify({
    network: "MTN",
    amount: 100,
    mobile_number: "09130286805",
    Ported_number: true,
  }),
});

const data = await res.json();
console.log("⚡ Peyflex airtime response:", data);
}