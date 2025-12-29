export function calculateElapsedTime(session, now) {
    const end = session.endedAt ?? now;
    return end - session.startedAt;
}

export function calculatePausedTime(session) {
    return session.pauses.reduce((totalPaused, p) => {
        if (!p.endedAt) return totalPaused;
        return totalPaused + (p.endedAt - p.startedAt);
    }, 0);
}