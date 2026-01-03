import Display from "./Display";
import ButtonPad from "./ButtonPad";

export default function StopWatch({
        isRunning,
        isPaused,
        isStopped,
        elapsedTime,
        pausedTime,
        workingTime,
        currentInterval,
        pauseCount,
        systemTime,
        onStart,
        onPause,
        onResume,
        onStop,
        onClear
}) {
    return (
        <div className="stopWatch">
            <Display 
                elapsedTime={elapsedTime}
                pausedTime={pausedTime}
                workingTime={workingTime}
                isRunning={isRunning}
                isPaused={isPaused}
                isStopped={isStopped}
                currentInterval={currentInterval}
                pauseCount={pauseCount}
                systemTime={systemTime}
            />
            <ButtonPad 
                onStart={onStart}
                onPause={onPause}
                onResume={onResume}
                onStop={onStop}
                onClear={onClear}
                isRunning={isRunning}
                isPaused={isPaused}
                isStopped={isStopped}
            />
        </div>
    )
}