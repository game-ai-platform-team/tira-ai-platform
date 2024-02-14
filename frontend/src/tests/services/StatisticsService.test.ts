import { describe, expect, test } from "vitest";
import statisticsService from "../../services/StatisticsService";

describe("StatisticsService", () => {
    describe("getStatistics", () => {
        test("returns null if no moves", () => {
            const statistics = statisticsService.getStatistics([]);
            expect(statistics).toBeNull();
        });

        test("returns null if only color 1 is null", () => {
            const statistics = statisticsService.getStatistics(
                [{ move: "aaa", time: 100, logs: "", evaluation: 0 }],
                1,
            );
            expect(statistics).toBeNull();
        });
    });
});
