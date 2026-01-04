import { formatTime } from "../../utils/time"

export default function Display({
    elapsedTime,
    pausedTime,                
    currentInterval,
    isRunning,               
    isPaused,
    isStopped,
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
        shrinkTop = formatTime(elapsedTime);
        focusContent = formatTime(currentInterval || 0);
    }

    if (pauseCount > 0 || pauseCount === 0 && isPaused) {
        shrinkBottom = (
            <>
            <div>❚❚ ({pauseCount})</div>
            <div>{formatTime(isPaused ? pausedTime + currentInterval : pausedTime)}</div>
            </>
        );
    }

    return (
        <div className={`display ${isPaused ? 'paused' : 'running'}`}>
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