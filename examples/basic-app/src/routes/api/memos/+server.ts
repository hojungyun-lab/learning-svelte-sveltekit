import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface Memo { id: number; text: string; createdAt: string; }

const memos: Memo[] = [
    { id: 1, text: 'Svelte 5 학습하기', createdAt: '2026-02-20T10:00:00Z' },
    { id: 2, text: 'API 라우트 이해하기', createdAt: '2026-02-20T11:00:00Z' }
];
let nextId = 3;

export const GET: RequestHandler = async ({ url }) => {
    const q = url.searchParams.get('q');
    const results = q ? memos.filter(m => m.text.includes(q)) : memos;
    return json({ memos: results, total: results.length });
};

export const POST: RequestHandler = async ({ request }) => {
    const { text } = await request.json();
    if (!text || text.trim().length < 2) {
        return json({ error: '메모는 2자 이상' }, { status: 400 });
    }
    const memo: Memo = { id: nextId++, text: text.trim(), createdAt: new Date().toISOString() };
    memos.push(memo);
    return json({ memo }, { status: 201 });
};
