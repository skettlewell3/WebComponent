import Button from '../watch/Button'

export default function ButtonPad({ 
    isRunning, 
    isPaused, 
    onStart,
    onStop, 
    onPause,
    onResume
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

    return (
        <div className="buttonPad">
            <Button 
                onClick={firstButtonHandler}
                label={firstButtonLabel}
            />
            <Button 
                onClick={onStop}
                label='■'
                disabled={!isRunning}
            />
        </div>
    )
}