const STORAGE_KEY = "completions_v1";

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

function normalizeUser(username) {
    return String(username || "").trim().toLowerCase();
}

export function getCompletedForUser(username) {
    const user = normalizeUser(username);
    const all = loadAll();
    const list = Array.isArray(all[user]) ? all[user] : [];
    return list.map((id) => String(id));
}

export function isCompleted(username, courseId) {
    const user = normalizeUser(username);
    if (!user) return false;
    const list = getCompletedForUser(user);
    const cid = String(courseId);
    return list.includes(cid);
}

export function toggleCompleted(username, courseId) {
    const user = normalizeUser(username);
    if (!user) return { ok: false, reason: "no-user" };
    const cid = String(courseId);
    const all = loadAll();
    const list = Array.isArray(all[user]) ? all[user] : [];
    const set = new Set(list.map(String));
    if (set.has(cid)) {
        set.delete(cid);
    } else {
        set.add(cid);
    }
    all[user] = Array.from(set);
    saveAll(all);
    return { ok: true, completed: Array.from(set) };
}

export function getCompletedCount(username) {
    return getCompletedForUser(username).length;
}

export default {
    getCompletedForUser,
    isCompleted,
    toggleCompleted,
    getCompletedCount,
};
