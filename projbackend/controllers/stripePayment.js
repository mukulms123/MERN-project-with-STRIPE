const SK = process.env.SK;
const stripe = require("stripe")(SK);
const {v4: uuid} = require("uuid");

exports.makePayment = (req, res) => {
  const {token, products} = req.body;
  var amount = 0;
  products.map((product, index) => {
    amount = amount + product.price;
  });
  amount = amount * 100;
  console.log("Charges: ", amount);

  const idempotencyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            customer: customer.id,
            amount: amount,
            currency: "inr",
            receipt_email: token.email,
            description: "a test account",
          },
          {idempotencyKey}
        )
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => console.log(err));
    });
};
