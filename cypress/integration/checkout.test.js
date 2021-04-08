const TEST_CC_NUM = "4111111111111111";
const TEST_ZIP_CODE = "11372";

const addItemsToCart = () => {
  cy.findAllByText("Add To Cart").each((button, i) => {
    if (i % 2 === 1) {
      button.click();
    }
  });
};

const formData = {
  firstName: "Erica",
  lastName: "Example",
  email: "erica@example.com",
  creditCard: TEST_CC_NUM,
  zipCode: TEST_ZIP_CODE,
};

const completeForm = (params = {}) => {
  const data = { ...formData, ...params };
  const { firstName, lastName, email, creditCard, zipCode } = data;
  if (firstName) {
    cy.get("form").findByLabelText("First Name").type(firstName);
  }
  cy.get("form").findByLabelText("Last Name").type(lastName);
  cy.get("form").findByLabelText("Email").type(email);
  cy.get("form").findByLabelText("Credit Card").type(creditCard);
  cy.get("form").findByLabelText("Zip Code").type(zipCode);
};

const completeAndBuy = (params = {}) => {
  completeForm(params);
  return cy.findByText("Buy Now").click();
};

const expectAlertText = (stub, text) => {
  const alert = stub.getCall(0);
  expect(alert).to.exist;

  const alertText = alert.args.join(" ");
  expect(alertText).to.include(text);
};

describe("checkout", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("I can complete the inputs in the checkout form", () => {
    completeForm();

    Object.values(formData).forEach((val) => {
      cy.findByDisplayValue(val);
    });
  });

  describe("When I complete the form with valid input and click Buy Now", () => {
    let stub;
    beforeEach(() => {
      stub = cy.stub();
      cy.on("window:alert", stub);
    });

    it("an alert tells me the purchase was successful", () => {
      completeAndBuy().then(() => {
        expectAlertText(stub, "Purchase complete");
      });
    });

    it("an alert tells me the total amount I will be charged", () => {
      addItemsToCart();
      completeAndBuy().then(() => {
        expectAlertText(stub, "$73.49");
      });
    });
  });

  describe("When I complete the form with invalid inputs and click Buy Now", () => {
    let stub;
    beforeEach(() => {
      stub = cy.stub();
      cy.on("window:alert", stub);
    });

    it("an alert tells me input is invalid if data is missing", () => {
      completeAndBuy({ firstName: "" }).then(() => {
        expectAlertText(stub, "Input is not valid");
      });
    });

    it("an alert tells me if the credit card number is invalid", () => {
      completeAndBuy({ creditCard: "42" }).then(() => {
        expectAlertText(stub, "Credit card number is not valid");
      });
    });

    it("an alert tells me if the zip code is invalid", () => {
      completeAndBuy({ zipCode: "42" }).then(() => {
        expectAlertText(stub, "Zip code is not valid");
      });
    });
  });
});
