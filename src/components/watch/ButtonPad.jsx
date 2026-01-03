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
   
    if (!isRunning) {
        firstButtonLabel = '►';
        firstButtonHandler = onStart;
    } else if (isRunning && !isPaused) {
        firstButtonLabel = '❚❚';
        firstButtonHandler = onPause;
    } else if (isRunning && isPaused) {
        firstButtonLabel = '►';
        firstButtonHandler = onResume;
    }

    const secondButtonLabel = isStopped ? '↺' : '■';
    const secondButtonHandler = isStopped ? onClear : onStop;
    const secondButtonDisabled = !isRunning && !isStopped;


    return (
        <div className="buttonPad">
            <Button 
                onClick={firstButtonHandler}
                label={firstButtonLabel}
            />
            <Button 
                onClick={secondButtonHandler}
                label={secondButtonLabel}
                disabled={secondButtonDisabled}
            />
        </div>
    )
}