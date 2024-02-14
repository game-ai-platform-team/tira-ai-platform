import { describe, expect, test } from "vitest";
import statisticsService from "../../services/StatisticsService";

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
    });
});
