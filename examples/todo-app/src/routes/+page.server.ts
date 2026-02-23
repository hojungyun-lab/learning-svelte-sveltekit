import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

interface Todo {
    id: number;
    text: string;
    done: boolean;
}

const todos: Todo[] = [
    { id: 1, text: 'Svelte 5 학습 완료', done: true },
    { id: 2, text: 'SvelteKit 라우팅 이해하기', done: true },
    { id: 3, text: 'Form Actions 연습', done: false },
    { id: 4, text: 'Todo 앱 완성하기', done: false }
];
let nextId = 5;

export const load: PageServerLoad = async () => {
    return { todos: [...todos] };
};

export const actions: Actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const text = (data.get('text') as string)?.trim();
        if (!text || text.length < 2) {
            return fail(400, { text, error: '할 일은 2자 이상 입력하세요' });
        }
        todos.push({ id: nextId++, text, done: false });
        return { success: true };
    },
    toggle: async ({ request }) => {
        const data = await request.formData();
        const id = Number(data.get('id'));
        const todo = todos.find(t => t.id === id);
        if (todo) todo.done = !todo.done;
        return { toggled: true };
    },
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = Number(data.get('id'));
        const idx = todos.findIndex(t => t.id === id);
        if (idx !== -1) todos.splice(idx, 1);
        return { deleted: true };
    },
    clearDone: async () => {
        const doneIds = todos.filter(t => t.done).map(t => t.id);
        doneIds.forEach(id => {
            const idx = todos.findIndex(t => t.id === id);
            if (idx !== -1) todos.splice(idx, 1);
        });
        return { cleared: true };
    }
};
