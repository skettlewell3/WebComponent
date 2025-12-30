import { formatTime } from "../../utils/time"

export default function Display({
    elapsedTime,
    pausedTime,                
    workingTime,
    isRunning,               
    isPaused,
}) {

    let shrinkDisplayContent = null;
    let focusDisplayContent = null;

    if (!isRunning) {                                           //default state
        shrinkDisplayContent = '';                  
        focusDisplayContent = currentTime;  //systemClock
    } else if (isRunning && !isPaused) {                        //Timer initialised
        shrinkDisplayContent = '';
        focusDisplayContent= elapsedTime;
    } else if (isRunning && isPaused && pauseCount < 1) {
        shrinkDisplayContent = elapsedTime;
        focusDisplayContent= currentPausedTime;
    } else if (isRunning && !isPaused && pauseCount > 0) {
        shrinkDisplayContent = totalPausedTime + '(' + pauseCount + ')';
        focusDispalyContent = elapsedTime
    }
    return (
        <div className="display">
            {isPaused && (
                <div className="pausedTime">
                    {formatTime(pausedTime)}
                </div>
            )}

            <div className={`elapsedTime ${isPaused ? 'shrink' : 'focus'}`}>
                {formatTime(elapsedTime)}
            </div>

            {isPaused && (
                <div className="pauseCount">
                    Pauses: {pauseCount}
                </div>
            )}
        </div>
    )
}