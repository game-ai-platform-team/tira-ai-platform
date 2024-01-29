import { IgrLinearGauge, IgrLinearGraphRange } from "igniteui-react-gauges";

function LinearGauge() {
    return (
        <div>
            <IgrLinearGauge
                height="80px"
                width="400px"
                minimumValue={0}
                maximumValue={100}
                labelInterval={10}
                labelExtent={0.025}
                labelsPreTerminal={0}
                labelsPostInitial={0}
                fontBrush="Black"
                font="11px Verdana"
                interval={10}
                tickBrush="Black"
                ticksPreTerminal={0}
                ticksPostInitial={0}
                tickStrokeThickness={2}
                tickStartExtent={0.25}
                tickEndExtent={0.05}
                minorTickCount={4}
                minorTickBrush="Black"
                minorTickEndExtent={0.05}
                minorTickStartExtent={0.15}
                minorTickStrokeThickness={1}
                value={50}
                isNeedleDraggingEnabled={true}
                needleShape="Custom"
                needleBrush="Black"
                needleOutline="Black"
                needleStrokeThickness={1}
                needleBreadth={15}
                needleInnerExtent={0.35}
                needleOuterExtent={0.65}
                needleOuterPointExtent={0.8}
                needleInnerPointExtent={0.325}
                needleInnerPointWidth={0}
                needleOuterPointWidth={0.3}
                needleInnerBaseWidth={0}
                needleOuterBaseWidth={0.07}
                isScaleInverted={false}
                scaleBrush="Gray"
                scaleOutline="Gray"
                scaleStrokeThickness={1}
                scaleInnerExtent={0.05}
                scaleOuterExtent={0.65}
                scaleStartExtent={0.05}
                scaleEndExtent={0.95}
                backingBrush="#cecece"
                backingOutline="#cecece"
                backingStrokeThickness={4}
                backingInnerExtent={0}
                backingOuterExtent={1}
                rangeBrushes="#C62828, #F96232, #FF9800"
                rangeOutlines="#C62828, #F96232, #FF9800"
            >
                <IgrLinearGraphRange
                    key="range1"
                    startValue={0}
                    endValue={50}
                    innerStartExtent={0.075}
                    innerEndExtent={0.075}
                    outerStartExtent={0.25}
                    outerEndExtent={0.4}
                />
                <IgrLinearGraphRange
                    key="range2"
                    startValue={50}
                    endValue={100}
                    innerStartExtent={0.075}
                    innerEndExtent={0.075}
                    outerStartExtent={0.4}
                    outerEndExtent={0.55}
                />
            </IgrLinearGauge>
        </div>
    );
}

export default LinearGauge;
