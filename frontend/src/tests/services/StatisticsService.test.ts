import { describe, expect, test } from "vitest";
import statisticsService from "../../services/StatisticsService";
import MoveStatistics from "../../interfaces/MoveStatistics.ts";

describe("StatisticsService", () => {
    describe("getStatistics", () => {
        test("returns null if no moves", () => {
            const statistics = statisticsService.getStatistics([]);
            expect(statistics).toBeNull();
        });

        test("returns null if only moves of color 1 is null", () => {
            const statistics = statisticsService.getStatistics(
                [{ move: "aaa", time: 100, logs: "", evaluation: 0 }],
                1,
            );
            expect(statistics).toBeNull();
        });

        test("does not return null if moves of color 0 is not empty", () => {
            const statistics = statisticsService.getStatistics(
                [
                    {
                        move: "aaa",
                        time: 100,
                        logs: "",
                        evaluation: 0,
                    },
                ],
                0,
            );

            expect(statistics).not.toBeNull();
        });

        test("does not return null if moves of color 1 is not empty", () => {
            const statistics = statisticsService.getStatistics(
                [
                    {
                        move: "aaa",
                        time: 100,
                        logs: "",
                        evaluation: 0,
                    },
                    {
                        move: "bbb",
                        time: 10,
                        logs: "logs of something",
                        evaluation: 1,
                    },
                ],
                1,
            );

            expect(statistics).not.toBeNull();
        });

        describe("longest move is correct", () => {
            test("if only one move", () => {
                const moves = [
                    {
                        move: "d2d4",
                        time: 40,
                        logs: "",
                        evaluation: 0,
                    },
                ];
                const statistics = statisticsService.getStatistics(moves);
                expect(statistics?.longest.time).toBe(40);
            });
            test("if only one longest", () => {
                const longest = [
                    {
                        move: "d2f7",
                        time: 500,
                        logs: "sssss",
                        evaluation: 0,
                    },
                ];

                const moves = longest.concat([
                    {
                        move: "d2f7",
                        time: 10,
                        logs: "asdas",
                        evaluation: 0,
                    },
                    {
                        move: "e2f1",
                        time: 100,
                        logs: "bbbbb",
                        evaluation: 0,
                    },
                ]);

                expect(longest).toContainEqual(
                    statisticsService.getStatistics(moves)?.longest,
                );
            });
            test("if multiple longest", () => {
                const longest = [
                    {
                        move: "e2f1",
                        time: 15,
                        logs: "bbbbb",
                        evaluation: 0,
                    },
                    {
                        move: "d2f7",
                        time: 15,
                        logs: "sssss",
                        evaluation: 0,
                    },
                ];

                const moves = longest.concat([
                    {
                        move: "d2f7",
                        time: 10,
                        logs: "asdas",
                        evaluation: 0,
                    },
                ]);

                expect(longest).toContainEqual(
                    statisticsService.getStatistics(moves)?.longest,
                );
            });
        });

        describe("shortest move is correct", () => {
            test("if only one move", () => {
                const moves = [
                    {
                        move: "e2f1",
                        time: 1,
                        logs: "",
                        evaluation: 0,
                    },
                ];

                expect(
                    statisticsService.getStatistics(moves)?.shortest.time,
                ).toBe(1);
            });
            test("if only one shortest", () => {
                const shortest = [
                    {
                        move: "d2f7",
                        time: 5,
                        logs: "sssss",
                        evaluation: 0,
                    },
                ];

                const moves = shortest.concat([
                    {
                        move: "d2f7",
                        time: 10,
                        logs: "asdas",
                        evaluation: 0,
                    },
                    {
                        move: "e2f1",
                        time: 100,
                        logs: "bbbbb",
                        evaluation: 0,
                    },
                ]);

                expect(shortest).toContainEqual(
                    statisticsService.getStatistics(moves)?.shortest,
                );
            });
            test("if multiple shortest", () => {
                const shortest = [
                    {
                        move: "e2f1",
                        time: 5,
                        logs: "bbbbb",
                        evaluation: -1,
                    },
                    {
                        move: "d2f7",
                        time: 5,
                        logs: "sssss",
                        evaluation: 0.8,
                    },
                ];

                const moves = shortest.concat([
                    {
                        move: "d2f7",
                        time: 10,
                        logs: "asdas",
                        evaluation: 1,
                    },
                    {
                        move: "d2f7",
                        time: 190,
                        logs: "aaaaa",
                        evaluation: 0.6,
                    },
                ]);

                expect(shortest).toContainEqual(
                    statisticsService.getStatistics(moves)?.shortest,
                );
            });
        });

        describe("average time", () => {
            test("is correct if only one move", () => {
                const moves = [
                    {
                        move: "d2f7",
                        time: 190,
                        logs: "aaaaa",
                        evaluation: 0.6,
                    },
                ];

                expect(statisticsService.getStatistics(moves)?.average).toBe(
                    190,
                );
            });

            test("is correct if multiple moves with same time", () => {
                const moves = [
                    {
                        move: "d2f7",
                        time: 190,
                        logs: "aaaaa",
                        evaluation: 0.6,
                    },
                    {
                        move: "aaa",
                        time: 190,
                        logs: "aaaaa",
                        evaluation: -0.6,
                    },
                    {
                        move: "c2c7",
                        time: 190,
                        logs: "bbbb",
                        evaluation: 0.5,
                    },
                ];
                expect(
                    statisticsService.getStatistics(moves)?.average,
                ).toBeCloseTo(190, 2);
            });

            test("is correct if multiple moves with different times", () => {
                const moves = [
                    {
                        move: "d2f7",
                        time: 1,
                        logs: "aaaaa",
                        evaluation: 0.62,
                    },
                    {
                        move: "aaa",
                        time: 99,
                        logs: "aaaaa",
                        evaluation: -0.6,
                    },
                    {
                        move: "c2c7",
                        time: 200,
                        logs: "bbbb",
                        evaluation: 0.34,
                    },
                    {
                        move: "d8e8",
                        time: 10,
                        logs: "bbbb",
                        evaluation: -0.5,
                    },
                ];
                expect(
                    statisticsService.getStatistics(moves)?.average,
                ).toBeCloseTo(77.5, 2);
            });

            test("is correct if average is not accurate as float", () => {
                const moves = [
                    {
                        move: "d2f7",
                        time: 4,
                        logs: "aaaaa",
                        evaluation: 0.62,
                    },
                    {
                        move: "aaa",
                        time: 3,
                        logs: "aaaaa",
                        evaluation: -0.6,
                    },
                    {
                        move: "c2c7",
                        time: 3,
                        logs: "bbbb",
                        evaluation: 0.34,
                    },
                ];
                expect(
                    statisticsService.getStatistics(moves)?.average,
                ).toBeCloseTo(3.33, 2);
            });
        });

        describe("times", () => {
            test("is correct if only one move", () => {
                const moves = [
                    {
                        move: "d2f7",
                        time: 4,
                        logs: "aaaaa",
                        evaluation: 0.62,
                    },
                ];
                expect(statisticsService.getStatistics(moves)?.times).toEqual([
                    4,
                ]);
            });

            test("is in provided order", () => {
                const moves = [
                    {
                        move: "d2f7",
                        time: 4,
                        logs: "aaaaa",
                        evaluation: 0.62,
                    },
                    {
                        move: "aaa",
                        time: 100,
                        logs: "aaaaa",
                        evaluation: -0.6,
                    },
                    {
                        move: "c2c7",
                        time: 200,
                        logs: "bbbb",
                        evaluation: 0.34,
                    },
                    {
                        move: "c2c7",
                        time: 99,
                        logs: "bbbb",
                        evaluation: 0.34,
                    },
                ];
                expect(statisticsService.getStatistics(moves)?.times).toEqual([
                    4, 100, 200, 99,
                ]);
            });
        });
    });
    describe("uciToPGN", () => {
        const moves = [
            { move: "a2a4", time: 200, logs: "", evaluation: 1 },
            { move: "a7a5", time: 100, logs: "", evaluation: 1 },
            { move: "g1f3", time: 300, logs: "", evaluation: 0.6 },
        ];

        describe("without optional parameters", () => {
            test("white name is ?", () => {
                expect(statisticsService.uciToPGN(moves)).toContain(
                    '[White "?"]',
                );
            });

            test("black name is ?", () => {
                expect(statisticsService.uciToPGN(moves)).toContain(
                    '[Black "?"]',
                );
            });

            test("white elo is empty", () => {
                expect(statisticsService.uciToPGN(moves)).not.toContain(
                    "WhiteElo",
                );
            });

            test("black elo is empty", () => {
                expect(statisticsService.uciToPGN(moves)).not.toContain(
                    "BlackElo",
                );
            });
        });

        describe("with optional parameters", () => {
            test("white name is correct", () => {
                expect(
                    statisticsService.uciToPGN(moves, "NameOfWhite"),
                ).toContain('[White "NameOfWhite"]');
            });

            test("black name is ?", () => {
                expect(
                    statisticsService.uciToPGN(moves, undefined, "NameOfBlack"),
                ).toContain('[Black "NameOfBlack"]');
            });

            test("white elo is not empty", () => {
                expect(
                    statisticsService.uciToPGN(
                        moves,
                        undefined,
                        undefined,
                        1500,
                    ),
                ).toContain('[WhiteElo "1500"]');
            });

            test("black elo is not empty", () => {
                expect(
                    statisticsService.uciToPGN(
                        moves,
                        undefined,
                        undefined,
                        undefined,
                        1300,
                    ),
                ).toContain('[BlackElo "1300"]');
            });
            test("pgn list has a correct move listed", () => {
                expect(statisticsService.uciToPGN(moves)).toContain("1. a4");
            });
            test("pgn list has correct moves listed", () => {
                expect(statisticsService.uciToPGN(moves)).toContain(
                    "1. a4 a5 2. Nf3",
                );
            });
        });
    });
    describe("getEvaluations", () => {
        test("advantages is correct if multiple moves", () => {
            const moves = [
                { move: "a2a4", time: 200, logs: "", evaluation: 1 },
                { move: "a7a5", time: 100, logs: "", evaluation: 1 },
                { move: "g1f3", time: 300, logs: "", evaluation: 0.6 },
            ];

            const evaluations = statisticsService.getEvaluations(moves, true);
            expect(evaluations.advantages).toEqual([0.066, 1, 1, 0.6]);
        });

        test("advantages is correct no moves", () => {
            const moves: MoveStatistics[] = [];

            const evaluations = statisticsService.getEvaluations(moves, true);
            expect(evaluations.advantages).toEqual([0.066]);
        });
        test("move classes is correct if multiple moves", () => {
            const moves = [
                { move: "a2a4", time: 200, logs: "", evaluation: 1 },
                { move: "a7a5", time: 100, logs: "", evaluation: 1 },
                { move: "g1f3", time: 300, logs: "", evaluation: 0.6 },
            ];

            const evaluations = statisticsService.getEvaluations(moves, true);
            for (const moveClass of evaluations.moveClasses) {
                expect(moveClass).oneOf([
                    "GREAT",
                    "BEST",
                    "EXCELLENT",
                    "GOOD",
                    "INACCURACY",
                    "MISTAKE",
                    "BLUNDER",
                ]);
            }
        });

        test("move classes is correct no moves", () => {
            const moves: MoveStatistics[] = [];

            const evaluations = statisticsService.getEvaluations(moves, true);
            expect(evaluations.moveClasses).length(0);
        });

        test("Move class is calculated properly", () => {
            const moves = [
                { move: "a7a5", time: 100, logs: "", evaluation: 0.06 }, //Excellent
                { move: "a7a5", time: 100, logs: "", evaluation: 0 }, //Great
                { move: "g1f3", time: 300, logs: "", evaluation: 0 }, //Best
                { move: "a2a4", time: 200, logs: "", evaluation: 0.1 }, //Good
                { move: "a2a4", time: 200, logs: "", evaluation: -0.06 }, //Inaccuracy
                { move: "a7a5", time: 100, logs: "", evaluation: 0 }, //Good
                { move: "g1f3", time: 300, logs: "", evaluation: -0.3 }, //Mistake
                { move: "g1f3", time: 300, logs: "", evaluation: 0.5 }, //Blunder
            ];

            const evaluations = statisticsService.getEvaluations(moves, true);
            expect(evaluations.moveClasses).toEqual([
                "EXCELLENT",
                "GREAT",
                "BEST",
                "GOOD",
                "INACCURACY",
                "GOOD",
                "MISTAKE",
                "BLUNDER",
            ]);
        });

        test("Filtering by color works", () => {
            const moves = [
                { move: "a7a5", time: 100, logs: "", evaluation: 0.06 },
                { move: "a7a5", time: 100, logs: "", evaluation: 0 },
                { move: "g1f3", time: 300, logs: "", evaluation: 0 },
                { move: "a2a4", time: 200, logs: "", evaluation: 0.025 },
                { move: "a2a4", time: 200, logs: "", evaluation: 0.025 },
            ];

            const whiteEvaluations = statisticsService.getEvaluations(
                moves,
                false,
                0,
            );
            const blackEvaluations = statisticsService.getEvaluations(
                moves,
                false,
                1,
            );
            expect(whiteEvaluations.moveClasses.length).toEqual(3);
            expect(blackEvaluations.moveClasses.length).toEqual(2);
        });

        test("Accuracy when white wins is high for white and low for black", () => {
            const moves = [
                { move: "", time: 1, logs: "", evaluation: 0 },
                { move: "", time: 1, logs: "", evaluation: 0.5 },
                { move: "", time: 1, logs: "", evaluation: 0.5 },
                { move: "", time: 1, logs: "", evaluation: 0.999 },
                { move: "", time: 1, logs: "", evaluation: 1 },
            ];

            const evals = statisticsService.getEvaluations(moves, false);

            expect(evals.accuracyWhite).toBeGreaterThanOrEqual(90);
            expect(evals.accuracyBlack).toBeLessThanOrEqual(40);
        });

        test("Accuracy when black wins is high for black and low for white", () => {
            const moves = [
                { move: "", time: 1, logs: "", evaluation: -0.5 },
                { move: "", time: 1, logs: "", evaluation: -0.5 },
                { move: "", time: 1, logs: "", evaluation: -0.999 },
                { move: "", time: 1, logs: "", evaluation: -1 },
            ];

            const evals = statisticsService.getEvaluations(moves, false);

            expect(evals.accuracyBlack).toBeGreaterThanOrEqual(90);
            expect(evals.accuracyWhite).toBeLessThanOrEqual(40);
        });

        test("Greatest accuracy is 100", () => {
            const moves = [
                { move: "", time: 1, logs: "", evaluation: 99 },
                { move: "", time: 1, logs: "", evaluation: 99 },
                { move: "", time: 1, logs: "", evaluation: 99 },
                { move: "", time: 1, logs: "", evaluation: 99 },
            ];

            const evals = statisticsService.getEvaluations(moves, false);

            expect(evals.accuracyBlack).toBeLessThanOrEqual(100);
            expect(evals.accuracyWhite).toBeLessThanOrEqual(100);
        });

        test("Lowest accuracy is 0", () => {
            const moves = [
                { move: "", time: 1, logs: "", evaluation: -99 },
                { move: "", time: 1, logs: "", evaluation: -99 },
                { move: "", time: 1, logs: "", evaluation: -99 },
                { move: "", time: 1, logs: "", evaluation: -99 },
            ];

            const evals = statisticsService.getEvaluations(moves, false);

            expect(evals.accuracyBlack).toBeGreaterThanOrEqual(0);
            expect(evals.accuracyWhite).toBeGreaterThanOrEqual(0);
        });
    });
});
