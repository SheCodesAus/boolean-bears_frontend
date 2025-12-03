const STORAGE_KEY = "enrollments_v1";

function loadAll() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (_) {
        return {};
    }
}

function saveAll(state) {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {
        // ignore write failures
    }
}

export function getEnrollment(courseId) {
    const all = loadAll();
    const key = String(courseId ?? "");
    const record = all[key] || { users: [] };
    const users = Array.isArray(record.users) ? record.users : [];
    return { users, count: users.length };
}

export function isEnrolled(courseId, username) {
    if (!username) return false;
    const { users } = getEnrollment(courseId);
    return users.includes(username);
}

export function getCount(courseId) {
    return getEnrollment(courseId).count;
}

export function isFull(courseId, maxStudents) {
    const max = Number(maxStudents);
    if (!Number.isFinite(max) || max <= 0) return false; // treat as unlimited if invalid
    return getCount(courseId) >= max;
}

export function enroll(courseId, username, maxStudents) {
    const key = String(courseId ?? "");
    const all = loadAll();
    const record = all[key] || { users: [] };
    const users = Array.isArray(record.users) ? record.users : [];

    if (username && users.includes(username)) {
        return { ok: false, reason: "already", count: users.length };
    } 

    const max = Number(maxStudents);
    if (Number.isFinite(max) && max > 0 && users.length >= max) {
        return { ok: false, reason: "full", count: users.length };
    }

    const newUsers = username ? [...users, username] : users;
    all[key] = { users: newUsers };
    saveAll(all);
    return { ok: true, reason: null, count: newUsers.length };
    }

    export default {
    getEnrollment,
    isEnrolled,
    getCount,
    isFull,
    enroll,
    };
