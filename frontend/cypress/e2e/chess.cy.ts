describe("Chess game", function () {
    it("front page can be opened", function () {
        cy.visit("/");
    });

    it("stays like it is without repository being submitted", function () {
        cy.visit("/");
        cy.wait(100);
        cy.get(".kokopu-chessboard").as("previousBoard", { type: "static" });

        cy.wait(1000);
        cy.get("@previousBoard").then(function (prev) {
            cy.get(".kokopu-chessboard").then(function (current) {
                expect(prev.html()).to.equal(current.html());
            });
        });
    });

    it("plays a game when a repository is submitted", function () {
        cy.visit("/");
        cy.wait(100);
        cy.get(".kokopu-chessboard").as("previousBoard", { type: "static" });

        cy.get("#url-field").type(
            "https://github.com/game-ai-platform-team/stupid-chess-ai.git",
        );
        cy.get("#submit-button").click();

        cy.wait(10000);
        cy.get("@previousBoard").then(function (prev) {
            cy.get(".kokopu-chessboard").then(function (current) {
                expect(prev.html()).to.not.equal(current.html());
            });
        });
    });

    it("pressing move opens move stats", function () {
        cy.visit("/");
        cy.wait(100);
        cy.get(".kokopu-chessboard").as("previousBoard", { type: "static" });

        cy.get("#url-field").type(
            "https://github.com/game-ai-platform-team/stupid-chess-ai.git",
        );

        cy.get("#submit-button").click();

        cy.wait(10000);
        cy.get(".move").first().click();
        cy.get(".move-details").contains("Time:");
    });

    it("downloading csv works", function () {
        cy.visit("/");
        cy.wait(100);
        cy.get(".kokopu-chessboard").as("previousBoard", { type: "static" });

        cy.get("#url-field").type(
            "https://github.com/game-ai-platform-team/stupid-chess-ai.git",
        );

        cy.get("#submit-button").click();

        cy.wait(10000);
        cy.get("#download-csv").click();
        cy.readFile("cypress/downloads/statistics.csv");
    });
});
