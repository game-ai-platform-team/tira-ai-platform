describe("Chess game", function () {
    it("stays like it is without repository being submitted", function () {
        cy.visit("/");
        cy.get(".kokopu-chessboard").as("previousBoard", { type: "static" });

        cy.get("@previousBoard").then(function (prev) {
            cy.get(".kokopu-chessboard").then(function (current) {
                expect(prev.html()).to.equal(current.html());
            });
        });
    });

    it("plays a game when a repository is submitted", function () {
        cy.visit("/");

        cy.get("#url-field").type(
            "https://github.com/game-ai-platform-team/stupid-chess-ai.git",
        );
        cy.get("#submit-button").click();

        cy.get("#game-view", { timeout: 15000 }).should(
            "not.contain",
            "Current Turn: 0",
        );
    });

    it("pressing move opens move stats", function () {
        cy.visit("/");

        cy.get("#url-field").type(
            "https://github.com/game-ai-platform-team/stupid-chess-ai.git",
        );

        cy.get("#submit-button").click();

        cy.get(".move", { timeout: 15000 }).first().click();
        cy.get(".move-details").contains("Time:");
    });

    it("downloading csv works", function () {
        cy.visit("/");

        cy.get("#url-field").type(
            "https://github.com/game-ai-platform-team/stupid-chess-ai.git",
        );

        cy.get("#submit-button").click();

        cy.get("#download-csv", { timeout: 10000 }).click();
        cy.readFile("cypress/downloads/statistics.csv");
    });
});
