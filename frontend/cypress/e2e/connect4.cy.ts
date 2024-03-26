describe("Connect 4 game", function () {
    beforeEach(() => {
        cy.visit("/");
        cy.selectGame("Connect 4");
    });

    it("stays like it is without repository being submitted", function () {
        cy.get("#cfour-board").as("previousBoard", { type: "static" });

        cy.get("@previousBoard").then(function (prev) {
            cy.get("#cfour-board").then(function (current) {
                expect(prev.html).to.equal(current.html);
            });
        });
    });
});
