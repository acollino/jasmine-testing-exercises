window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +document.getElementById("loan-amount").value,
    years: +document.getElementById("loan-years").value,
    rate: +document.getElementById("loan-rate").value,
  };
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  document.getElementById("loan-amount").value = 10000;
  document.getElementById("loan-years").value = 5;
  document.getElementById("loan-rate").value = 0.015;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let values = getCurrentUIValues();
  let monthly = calculateMonthlyPayment(values);
  updateMonthly(monthly);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  if (checkImproperInputs(values)) {
    return "0, Invalid inputs detected.";
  }
  let monthlyValues = {
    principle: values.amount,
    periodicInterest: values.rate / 12,
    numberOfPayments: values.years * 12,
  };
  let monthly;
  if (values.years == 0) {
    monthly = calculateImmediatePayment(monthlyValues);
  } else if (values.rate == 0) {
    monthly = calculateMonthyNoInterest(monthlyValues);
  } else {
    monthly = calculateMonthyWithInterest(monthlyValues);
  }
  return monthly.toFixed(2);
}

function checkImproperInputs(values) {
  for (property in values) {
    let isNotPrimitiveNum = typeof (values[property]) != "number";
    let isNotNumber = typeof (values[property]) != "Number";
    let isNaN = Number.isNaN(values[property]);
    if ((isNotPrimitiveNum && isNotNumber) || isNaN) {
      return true;
    }
  }
  return false;
}

function calculateMonthyWithInterest(values) {
  let numerator = values.principle * values.periodicInterest;
  let denominator =
    1 - Math.pow(1 + values.periodicInterest, -1 * values.numberOfPayments);
  return numerator / denominator;
}

function calculateMonthyNoInterest(values) {
  return values.principle / values.numberOfPayments;
}

function calculateImmediatePayment(values) {
  return values.principle;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById("monthly-payment").textContent = "$" + monthly;
}
