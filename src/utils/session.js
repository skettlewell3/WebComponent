export function createSession() {
    return {
        id: crypto.randomUUID(),
        startedAt: new Date(),
        endedAt: null,
        pauses: []
    };
}

export function startPause(session) {
    return {
        ...session,
        pauses: [
            ...session.pauses,
            { startedAt: new Date(), endedAt: null }
        ]
    };
}

export function endPause(session) {
    if (!session.pauses.length) return session;
    const pauses = [...session.pauses];
    pauses[pauses.length - 1].endedAt = new Date();
    return { ...session, pauses };
}

export function endSession(session) {
    return { ...session, endedAt: new Date() };
}

