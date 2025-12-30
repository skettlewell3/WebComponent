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
    let shrinkLeft = null;
    let shrinkRight = null;

    //Focus Display
    if (!isRunning && elapsedTime === 0) {
        focusContent = systemTime;
    } else if (!isRunning) {
        focusContent = formatTime(elapsedTime);
    } else {
        focusContent = formatTime(currentInterval || 0);
    }

    if (pauseCount > 0) {
        shrinkLeft = `❚❚(${pauseCount}) ${formatTime(pausedTime)}`;
        shrinkRight = formatTime(elapsedTime);
    }

    return (
        <div className="display">
            <div className="shrink">
                <span className="shrinkLeft">{shrinkLeft}</span>
                <span className="shrinkRight">{shrinkRight}</span>
            </div>
            <div className={`focus ${isPaused ? 'paused' : 'running'}`}>
                {focusContent}
            </div>
        </div>
    );
}