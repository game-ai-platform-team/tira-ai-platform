import { IgrLinearGauge, IgrLinearGraphRange } from "igniteui-react-gauges";

function EvaluationBar() {
    return (
        <div>
            <IgrLinearGauge>
                <IgrLinearGraphRange key="range1" />
                <IgrLinearGraphRange key="range2" />
            </IgrLinearGauge>
        </div>
    );
}

export default EvaluationBar;
