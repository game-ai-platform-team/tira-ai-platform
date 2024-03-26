declare namespace Cypress {
    interface Chainable {
        submitRepository(url: string): Chainable;
    }
}
