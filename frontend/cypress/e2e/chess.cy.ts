describe("Chess game", function () {
    it("front page can be opened", function () {
        cy.visit("/");
    });

    it("stays like it is without file being submitted", function () {
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

    it("plays a game when a file is submitted", function () {
        cy.visit("/");
        cy.wait(100);
        cy.get(".kokopu-chessboard").as("previousBoard", { type: "static" });

        cy.get("#file-input").selectFile("./../samples/chess/stupid_ai.py", {
            force: true,
        });
        cy.get("#submit-button").click();

        cy.wait(5000);
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

        cy.get("#file-input").selectFile("./../samples/chess/stupid_ai.py", {
            force: true,
        });
        cy.get("#submit-button").click();

        cy.wait(5000);
        cy.get(".move").first().click();
        cy.get(".move-details").contains("Time:");
    });

    it("downloading csv works", function () {
        cy.visit("/");
        cy.wait(100);
        cy.get(".kokopu-chessboard").as("previousBoard", { type: "static" });

        cy.get("#file-input").selectFile("./../samples/chess/stupid_ai.py", {
            force: true,
        });
        cy.get("#submit-button").click();

        cy.wait(5000);
        cy.get("#download-csv").click();
        cy.readFile("cypress/downloads/statistics.csv");
    });
});
