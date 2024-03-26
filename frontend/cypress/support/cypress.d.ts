declare namespace Cypress {
    interface Chainable {
        submitRepository(url: string): Chainable;
        selectGame(game: string): Chainable;
    }
}
