describe("Helpers tests", function () {
  beforeEach(function () {
    billAmtInput.value = 50;
    tipAmtInput.value = 10;
    allPayments['payment1'] = createCurPayment();
    billAmtInput.value = 40;
    tipAmtInput.value = 20;
    curPayment = createCurPayment();
    allPayments['payment2'] = createCurPayment();
    billAmtInput.value = 30;
    tipAmtInput.value = 0;
    curPayment = createCurPayment();
    allPayments['payment3'] = createCurPayment();
  });

  it("should sum up each payment type for sumPaymentTotal()", function () {
    let bill = sumPaymentTotal("billAmt");
    let tip = sumPaymentTotal("tipAmt");
    let percent = sumPaymentTotal("tipPercent");

    expect(bill).toEqual(120);
    expect(tip).toEqual(30);
    expect(percent).toEqual(70);
  });

  it("should compute the tip as a percentage of the bill for calculateTipPercent()", function () {
    expect(calculateTipPercent(50, 10)).toEqual(20);
    expect(calculateTipPercent(40, 20)).toEqual(50);
    expect(calculateTipPercent(30, 0)).toEqual(0);
  });

  it("should append cells to a single row in appendTd()", function () {
    let testTr = document.createElement('tr');
    appendTd(testTr, "testServer1");
    appendTd(testTr, "testServer2");
    appendTd(testTr, "testServer3");
    serverTbody.append(testTr);

    expect(serverTbody.children.length).toEqual(1);
    expect(testTr.children.length).toEqual(3);
  });

  afterEach(function () {
    allPayments = {};
    paymentId = 0;
    billAmtInput.value = "";
    tipAmtInput.value = "";
    serverTbody.innerHTML = "";
  });
});
