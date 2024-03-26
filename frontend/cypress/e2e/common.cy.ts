it("front page can be opened", function () {
    cy.visit("/");
});

describe("Navigation bar", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("games can be selected", () => {
        cy.selectGame("Connect 4");
        cy.selectGame("Chess");
    });
});
