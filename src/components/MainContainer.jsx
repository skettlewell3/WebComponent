import { useState, useEffect } from 'react';
import StopWatch from './watch/StopWatch';
import RecordTable from './recordTable/RecordTable';
import { createSession, startPause, endPause, endSession } from '../utils/session';
import { calculateElapsedTime, calculatePausedTime, formatSystemTime } from '../utils/time';

export default function MainContainer() {

    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [currentSession, setCurrentSession] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [lastTransitionAt, setLastTransitionAt] = useState(null)

    const [now, setNow] = useState(() => Date.now());
    const [systemNow, setSystemNow] = useState(() => Date.now());

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
        if (!isRunning) return

        const interval = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => clearInterval(interval)
    }, [isRunning, isPaused]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSystemNow(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    //Handlers 

    function start() {
        const session = createSession();
        setCurrentSession(session);
        setIsRunning(true);
        setIsPaused(false);
        setLastTransitionAt(session.startedAt.getTime());
    }

    function pause() {
        setIsPaused(true);
        setCurrentSession(prev => startPause(prev));
        setLastTransitionAt(Date.now());
    }

    function resume() {
        setIsPaused(false);
        setCurrentSession(prev => endPause(prev));
        setLastTransitionAt(Date.now());
    }

    function stop() {
        if (!currentSession) return;
        setSessions(prev => [...prev, endSession(currentSession)]);
        setCurrentSession(null);
        setIsRunning(false);
        setIsPaused(false);
        setLastTransitionAt(null)
    }

    // Referenced/Computed Values
    const elapsedTime = currentSession ? calculateElapsedTime(currentSession, now) : 0;
    const pausedTime = currentSession ? calculatePausedTime(currentSession) : 0;
    const workingTime = elapsedTime - pausedTime;
    const currentInterval = lastTransitionAt ? Math.max(0, now - lastTransitionAt) : 0;
    const pauseCount = currentSession ? currentSession.pauses.length : 0;
    const systemTime = formatSystemTime(new Date(systemNow));

    return (
        <div className="mainContainer">
            
            <StopWatch 
                isRunning={isRunning}
                isPaused={isPaused}
                elapsedTime={elapsedTime}
                pausedTime={pausedTime}
                workingTime={workingTime}
                currentInterval={currentInterval}
                pauseCount={pauseCount}
                systemTime={systemTime}
                onStart={start}
                onPause={pause}
                onResume={resume}
                onStop={stop}
            />
            
            <div className="tableContainer">
                <RecordTable  
                    sessions={sessions} 
                    elapsedTime={elapsedTime}
                    pausedTime={pausedTime}
                    workingTime={workingTime}
                />
            </div>
        </div>
    )
}
