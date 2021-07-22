//write tests here
describe("Quotes app", () => {
  beforeEach(() => {
    //arbitrary code we want running before our test run
    cy.visit("http://localhost:3000");
  });

  const submitBtn = () => cy.get("button");
  const nameInput = () => cy.get(".inputs > :nth-child(2) > input");
  const emailInput = () => cy.get(":nth-child(3) > input");
  const passwordInput = () => cy.get(":nth-child(4) > input");
  const tosBtn = () => cy.get(".checkboxes > label > input");
  const userP = () => cy.get("p");

  //here go our tests
  it("sanity test to make sure our tests work", () => {
    //'expect' is an assertions
    //there can be many assertions per test
    //though inside the 'it' statement (the test),
    //usually those assertions are logically grouped together
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5);
    expect({}).not.to.equal({}); //not strict (==)
    expect({}).to.eql({}); //strict (===)
  });

  it("Check to make sure the elements we will be testing exist", () => {
    cy.get("button").should("exist");
    cy.get(".inputs > :nth-child(2) > input").should("exist");
    cy.get(":nth-child(3) > input").should("exist");
    cy.get(":nth-child(4) > input").should("exist");
    cy.get(".checkboxes > label > input").should("exist");
    cy.get("p").should("not.exist");
  });

  it("Check the app to see if it works correctly", () => {
    submitBtn().should("be.disabled");
    nameInput()
      .should("have.value", "")
      .type("Jesse")
      .should("have.value", "Jesse");
    submitBtn().should("be.disabled");

    emailInput()
      .should("have.value", "")
      .type("Jleegwater")
      .should("have.value", "Jleegwater");

    submitBtn().should("be.disabled");

    emailInput().type("@live.com").should("have.value", "Jleegwater@live.com");

    passwordInput()
      .should("have.value", "")
      .type("password")
      .should("have.value", "password");

    tosBtn()
      .should("be.enabled")
      .should("not.be.checked")
      .check()
      .should("be.checked");

    submitBtn().should("be.enabled").click().should("be.disabled");

    userP().should("exist");
  });

  it("Check to see if the submit button is still disabled if a text box is left empty", () => {
    submitBtn().should("be.disabled");
    nameInput()
      .should("have.value", "")
      .type("Jesse")
      .should("have.value", "Jesse");
    submitBtn().should("be.disabled");

    emailInput().should("have.value", "");

    submitBtn().should("be.disabled");

    passwordInput()
      .should("have.value", "")
      .type("password")
      .should("have.value", "password");

    tosBtn()
      .should("be.enabled")
      .should("not.be.checked")
      .check()
      .should("be.checked");

    submitBtn().should("be.disabled");
  });

  //    it('playing around selecting elements from the dom', () => {
  //     textInput().should("exist");
  //     cy.get('input[name="foobar"]').should("not.exist");
  //     authorInput().should("exist");
  //     submitBtn().should("exist");
  //     cancelBtn().should("exist");
  //     cy.contains("Submit Quote");
  //     cy.contains(/submit quote/i);

  //    });

  //    it("can type in the inputs", () => {
  //        //grab the inputs
  //        //assert that they are empty
  //        //assert that the thing we typed is there
  //       textInput()
  //        .should("have.value","")
  //        .type("have fun learning React")
  //        .should("have.value", "have fun learning React");

  //        authorInput()
  //         .should("have.value", "")
  //         .type("Bailey Evanger")
  //         .should("have.value", "Bailey Evanger");
  //    });

  //    it('submit button is disabled until both inputs are filled out', () => {
  //         //1. Arrange: set up sanity checks (make sure initial state is the state we expect)
  //         //2. Act: (like typing or clicking -mimicking user input)
  //         //3. Assert: that the action has the effect we expect

  //         //button is disabled is true
  //         submitBtn().should("be.disabled")
  //         //type in the text field
  //         textInput().type("TEXT INPUT")
  //         //button is disabled is true
  //         submitBtn().should("be.disabled")
  //         //empty the text field
  //         textInput().clear()
  //         //type in the author field
  //         authorInput().type("AUTHOR INPUT")
  //         //button is disabled is true
  //         submitBtn().should("be.disabled")
  //         //type in the text field
  //         textInput().type("TEXT INPUT")
  //         //button is disabled is false
  //         submitBtn().should("not.be.disabled");

  //         //new syntax you will need for this test:
  //         //(a) "be.disabled"
  //         //(b) .clear()

  //     });

  //     it('can cancel a quote', () => {
  //       textInput().type('TEXT INPUT')
  //       authorInput().type('AUTHOR INPUT')
  //       cancelBtn().click()
  //       authorInput().should("have.value", "")
  //       textInput().should("have.value", "");
  //     });

  //     it('can submit a new quote', () => {
  //         //setup: have fun is not in the DOM
  //         //act: create quote "have fun (Rhiannon)"
  //         //assert: that the quote is now in the DOM

  //         cy.contains("have fun (Rhiannon)").should("not.exist")
  //         textInput().type("have fun")
  //         authorInput().type("Rhiannon")
  //         submitBtn().click();
  //     });
});
