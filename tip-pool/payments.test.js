describe("Payments tests", function () {
  beforeEach(function () {
    billAmtInput.value = 20;
    tipAmtInput.value = 5;
  });

  it("should add the payment info to allPayments on submitPaymentInfo()", function () {
    submitPaymentInfo();

    expect(Object.keys(allPayments).length).toEqual(1);
    expect(allPayments["payment" + paymentId].billAmt).toEqual("20");
    expect(allPayments["payment" + paymentId].tipAmt).toEqual("5");
    expect(allPayments["payment" + paymentId].tipPercent).toEqual(25);
  });

  it("should calculate correctly with $0 tip", function () {
    tipAmtInput.value = 0;
    let curPayment = createCurPayment();

    expect(curPayment.billAmt).toEqual("20");
    expect(curPayment.tipAmt).toEqual("0");
    expect(curPayment.tipPercent).toEqual(0);
  });

  it("should update payment table on appendPaymentTable()", function () {
    let curPayment = createCurPayment();
    appendPaymentTable(curPayment);

    expect(paymentTbody.children.length).toEqual(1);
  });

  it("should update summary table on updateSummary()", function () {
    allPayments['payment' + paymentId] = createCurPayment();
    updateSummary();

    expect(summaryTds[0].textContent).toEqual("$20");
    expect(summaryTds[1].textContent).toEqual("$5");
    expect(summaryTds[2].textContent).toEqual("25%");
  });

  afterEach(function () {
    allPayments = {};
    paymentId = 0;
    billAmtInput.value = "";
    tipAmtInput.value = "";
    paymentTbody.innerHTML = "";
    summaryTds[0].innerHTML = "";
    summaryTds[1].innerHTML = "";
    summaryTds[2].innerHTML = "";
  });
});
