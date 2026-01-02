import { formatTime } from "../../utils/time"

export default function Display({
    elapsedTime,
    pausedTime,                
    currentInterval,
    isRunning,               
    isPaused,
    pauseCount,
    systemTime
}) {

    let focusContent = null;
    let shrinkTop = null;
    let shrinkBottom = null;

    //Focus Display
    if (!isRunning && elapsedTime === 0) {
        focusContent = systemTime;
    } else if (!isRunning) {
        focusContent = formatTime(elapsedTime);
    } else {
        focusContent = formatTime(currentInterval || 0);
    }

    if (pauseCount > 0) {
        shrinkBottom = (
            <>
            <div>❚❚({pauseCount})</div>
            <div>{formatTime(pausedTime)}</div>
            </>
        );
        shrinkTop = formatTime(elapsedTime);
    }

    return (
        <div className="display">
            <div className="shrink top">
                {shrinkTop}
            </div>
            <div className={`focus ${isPaused ? 'paused' : 'running'}`}>
                {focusContent}
            </div>
            <div className="shrink bottom">
                {shrinkBottom}
            </div>
        </div>
    );
}