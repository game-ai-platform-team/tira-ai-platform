/**
 * Type declaration file for Vite environment.
 *
 * This file provides type declarations for the Vite environment,
 * allowing for TypeScript code to interact with Vite-specific features.
 * It also includes a reference to the Vite client types for usage in the browser.
 */

/// <reference types="vite/client" />

/**
 * Ready event listener for document.
 *
 * This event listener is triggered when the document is fully loaded and ready to be manipulated.
 * It establishes a WebSocket connection to the server and handles incoming messages.
 */
$(document).ready(function () {
    const socket = io.connect(
        `http://${document.domain}:${location.port}/test`,
    );
    socket.on("my response", function (msg) {
        $("#log").append(`<p>Received: ${msg.data}</p>`);
    });
    $("form#emit").submit(function () {
        socket.emit("my event", { data: $("#emit_data").val() });
        return false;
    });
});

declare module "*.md";
