const express = require("express");
const faker = require("faker");

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.set("port", process.env.PORT || 3001);
app.get("/last-purchases", (req, res) => {
  const resArr = [];
  for (let i = 0; i < 10; ++i) {
    resArr.push({
      name: faker.commerce.productName(),
      department: faker.commerce.department(),
      price: faker.commerce.price()
    });
  }
  res.json({ products: resArr });
});

const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});
