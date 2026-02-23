import type { Handle } from '@sveltejs/kit';

const sessions = new Map<string, { id: string; name: string; email: string }>();

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('session');
    event.locals.user = token && sessions.has(token) ? sessions.get(token)! : null;

    if (event.url.pathname.startsWith('/dashboard') && !event.locals.user) {
        return new Response(null, { status: 302, headers: { Location: '/login' } });
    }

    return await resolve(event);
};

export function createSession(user: { id: string; name: string; email: string }): string {
    const token = crypto.randomUUID();
    sessions.set(token, user);
    return token;
}

export function deleteSession(token: string): void {
    sessions.delete(token);
}
