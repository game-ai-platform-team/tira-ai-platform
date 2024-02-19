import type {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { TooltipProps } from "recharts";
import { useAppSelector } from "../hook";

export const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
    const moves = useAppSelector((state) => state.moves);
    if (active && payload && payload.length) {
        const emoji = label === 0 ? "🔴" : label % 2 === 0 ? "⚫" : "⚪";
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${moves && moves[Math.max(label - 1, 0)].move} ${emoji} : ${payload[0].value}`}</p>
            </div>
        );
    }
};
