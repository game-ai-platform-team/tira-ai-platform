import {
    Dispatch,
    Middleware,
    MiddlewareAPI,
    UnknownAction,
} from "@reduxjs/toolkit";
import { Position } from "kokopu";
import type { RootState } from "../store";

const boardMiddleware: Middleware =
    (store: MiddlewareAPI<Dispatch<UnknownAction>, RootState>) =>
    (next) =>
    (action) => {
        if (action.type == "board/newBoard") {
            const state = store.getState();
            const boards = state.boards;
            const game = state.game.config.game;

            switch (game) {
                case "chess": {
                    const oldPosition = boards[boards.length - 1];
                    const position = new Position(oldPosition);
                    const move: string = action.payload.move;

                    position.play(position.uci(move));

                    action.payload = position.fen();
                }
            }
        }

        return next(action);
    };

export default boardMiddleware;
