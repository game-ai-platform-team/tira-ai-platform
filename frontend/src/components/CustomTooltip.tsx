import type {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { TooltipProps } from "recharts";

export const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        const emoji = label === 0 ? "🔴" : label % 2 === 0 ? "⚫" : "⚪";
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} ${emoji} : ${payload[0].value}`}</p>
            </div>
        );
    }
};
