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

export function formatTime(ms) {
    if (!ms || ms < 0) ms = 0;
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const hh = hours.toString().padStart(2, '0');
    const mm = minutes.toString().padStart(2, '0');
    const ss = seconds.toString().padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
}

export function formatSystemTime(date = new Date()) {
    const hh = date.getHours().toString().padStart(2, '0');
    const mm = date.getMinutes().toString().padStart(2, '0');
    const ss = date.getSeconds().toString().padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
}