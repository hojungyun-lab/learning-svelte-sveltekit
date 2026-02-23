import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { createSession } from '../../hooks.server';

const USERS = [
    { id: '1', name: '홍길동', email: 'hong@test.com', password: 'password123' }
];

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) redirect(302, '/dashboard');
    return {};
};

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const user = USERS.find(u => u.email === email && u.password === password);
        if (!user) return fail(401, { email, error: '인증 실패' });
        const token = createSession({ id: user.id, name: user.name, email: user.email });
        cookies.set('session', token, { path: '/', httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24 });
        redirect(302, '/dashboard');
    }
};
