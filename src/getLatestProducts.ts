export default async function getLatestProducts() {
  const res = await (await fetch(
    "http://localhost:3001/last-purchases"
  )).json();
  return res.products;
}
