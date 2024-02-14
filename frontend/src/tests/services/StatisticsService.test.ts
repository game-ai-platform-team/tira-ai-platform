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
    });
});
