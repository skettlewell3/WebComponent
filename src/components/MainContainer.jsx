import { useState, useEffect } from 'react';
import StopWatch from './watch/StopWatch';
import RecordTable from './recordTable/RecordTable';
import { createSession, startPause, endPause, endSession } from '../utils/session';
import { calculateElapsedTime, calculatePausedTime } from '../utils/time';

export default function MainContainer() {

    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [currentSession, setCurrentSession] = useState(null);
    const [sessions, setSessions] = useState([]);

    const [now, setNow] = useState(() => Date.now());

    // Data Model
    //
    // session = {
    //     id: string,
    //     startedAt: Date,
    //     endedAt: Date / null;
    //     pauses: pause[]
    // }
    // 
    // pause = {
    //     startedAt: Date,
    //     endedAt: Date
    // }

    // Timer Mechanism
    useEffect(() => {
        if (!isRunning || isPaused) return

        const interval = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => clearInterval(interval)
    }, [isRunning, isPaused]);

    //Handlers 

    function start() {
        setCurrentSession(createSession());
        setIsRunning(true);
        setIsPaused(false);
    }

    function pause() {
        setIsPaused(true);
        setCurrentSession(prev => startPause(prev));
    }

    function resume() {
        setIsPaused(false);
        setCurrentSession(prev => endPause(prev));
    }

    function stop() {
        if (!currentSession) return;
        setSessions(prev => [...prev, endSession(currentSession)]);
        setCurrentSession(null);
        setIsRunning(false);
        setIsPaused(false);
    }

    // Computed Values
    const elapsedTime = currentSession ? calculateElapsedTime(currentSession, now) : 0;
    const pausedTime = currentSession ? calculatePausedTime(currentSession) : 0;
    const workingTime = elapsedTime - pausedTime;

    return (
        <div className="mainContainer">
            <div className="watchContainer">
                <StopWatch 
                    isRunning={isRunning}
                    isPaused={isPaused}
                    elapsedTime={elapsedTime}
                    pausedTime={pausedTime}
                    workingTime={workingTime}
                    onStart={start}
                    onPause={pause}
                    onResume={resume}
                    onStop={stop}
                />
            </div>
            <div className="tableContainer">
                <RecordTable  sessions={sessions} />
            </div>
        </div>
    )
}
