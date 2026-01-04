import Button from '../watch/Button'

export default function ButtonPad({ 
    isRunning, 
    isPaused, 
    isStopped,
    onStart,
    onStop, 
    onPause,
    onResume,
    onClear
}) {

    //label and handler logic for first button
    let firstButtonLabel;
    let firstButtonHandler;
    let firstButtonClass;
   
    if (!isRunning) {
        firstButtonLabel = '►';
        firstButtonHandler = onStart;
        firstButtonClass = 'play';
    } else if (isRunning && !isPaused) {
        firstButtonLabel = '❚❚';
        firstButtonHandler = onPause;
        firstButtonClass = 'pause';
    } else if (isRunning && isPaused) {
        firstButtonLabel = '►';
        firstButtonHandler = onResume;
        firstButtonClass = 'play';
    }

    const firstButtonDisabled = isStopped;

    const secondButtonLabel = isStopped ? '↺' : '■';
    const secondButtonHandler = isStopped ? onClear : onStop;
    const secondButtonDisabled = !isRunning && !isStopped;


    return (
        <div className="buttonPad">
            <Button className={`button ${firstButtonClass}`}
                onClick={firstButtonHandler}
                label={firstButtonLabel}
                disabled={firstButtonDisabled}
            />
            <Button className={`button ${isStopped ? 'reset' : 'stop'}`}
                onClick={secondButtonHandler}
                label={secondButtonLabel}
                disabled={secondButtonDisabled}
            />
        </div>
    )
}