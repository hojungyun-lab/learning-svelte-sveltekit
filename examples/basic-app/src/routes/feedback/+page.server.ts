import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

interface Feedback { id: number; name: string; message: string; rating: number; }

const feedbacks: Feedback[] = [
    { id: 1, name: '홍길동', message: 'Svelte 5 최고!', rating: 5 }
];
let nextId = 2;

export const load: PageServerLoad = async () => {
    return { feedbacks: [...feedbacks] };
};

export const actions: Actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const message = formData.get('message') as string;
        const rating = Number(formData.get('rating'));
        if (!name || name.length < 2) return fail(400, { name, message, rating, error: '이름은 2자 이상' });
        if (!message || message.length < 5) return fail(400, { name, message, rating, error: '메시지는 5자 이상' });
        feedbacks.push({ id: nextId++, name, message, rating });
        return { success: true };
    },
    delete: async ({ request }) => {
        const id = Number((await request.formData()).get('id'));
        const idx = feedbacks.findIndex(f => f.id === id);
        if (idx !== -1) feedbacks.splice(idx, 1);
        return { deleted: true };
    }
};
