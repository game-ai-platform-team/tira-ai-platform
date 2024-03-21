describe("Connect 4 game", function () {
    beforeEach(() => {
        cy.visit("/");

        cy.get('[aria-label="Select game"]').click();
        cy.get('[aria-label="Available games"]').contains("Connect 4").click();
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
