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
});
