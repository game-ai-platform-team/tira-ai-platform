import { describe, expect, test } from "vitest";
import statisticsService from "../../services/StatisticsService";

describe("StatisticsService", () => {
    describe("getStatistics", () => {
        test("returns null if no moves", () => {
            const statistics = statisticsService.getStatistics([]);
            expect(statistics).toBeNull();
        });
    });
});
