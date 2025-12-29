import Display from "./Display";
import ButtonPad from "./ButtonPad";

export default function StopWatch({
        isRunning,
        isPaused,
        elapsedTime,
        pausedTime,
        workingTime,
        onStart,
        onPause,
        onResume,
        onStop
}) {
    return (
        <div className="stopWatch">
            <Display 
                elapsedTime={elapsedTime}
                pausedTime={pausedTime}
                workingTime={workingTime}
                isRunning={isRunning}
                isPaused={isPaused}
            />
            <ButtonPad 
                onStart={onStart}
                onPause={onPause}
                onResume={onResume}
                onStop={onStop}
                isRunning={isRunning}
                isPaused={isPaused}
            />
        </div>
    )
}