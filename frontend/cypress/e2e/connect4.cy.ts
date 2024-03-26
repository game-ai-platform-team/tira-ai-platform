describe("Connect 4 game", function () {
    const repositoryUrl =
        "https://github.com/game-ai-platform-team/stupid-connect-four-ai";

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

    it("plays a game when a repository is submitted", function () {
        cy.submitRepository(repositoryUrl);

        cy.get("#game-view", { timeout: 15000 }).should(
            "not.contain",
            "Current Turn: 0",
        );
    });

    it("pressing move opens move stats", function () {
        cy.submitRepository(repositoryUrl);

        cy.get(".move", { timeout: 15000 }).first().click();
        cy.get(".move-details").contains("Time:");
    });
});
