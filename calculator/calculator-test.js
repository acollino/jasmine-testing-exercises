it("should calculate the monthly rate correctly", function () {
  let values = { amount: 1000, rate: 0.015, years: 2 };
  expect(calculateMonthlyPayment(values)).toEqual("42.32");
});

it("should return a result with 2 decimal places", function () {
  let values = { amount: 0, rate: 0.015, years: 2 };
  expect(calculateMonthlyPayment(values).split(".")[1].length).toEqual(2);
});

it("should handle a 0% interest rate", function () {
  let values = { amount: 1200, rate: 0, years: 1 };
  expect(calculateMonthlyPayment(values)).toEqual("100.00");
});

it("should handle a 0-year time frame", function () {
  let values = { amount: 1200, rate: 0, years: 0 };
  expect(calculateMonthlyPayment(values)).toBeInstanceOf(String);
});

it("should account for improper inputs", function () {
  let values = { amount: 1200, rate: "five percent", years: 10 };
  expect(calculateMonthlyPayment(values)).toEqual("0, Invalid inputs detected.");
});
