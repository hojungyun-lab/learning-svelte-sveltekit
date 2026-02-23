import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const posts = [
        { id: 1, title: 'Svelte 5와 Runes', summary: '새로운 반응성 시스템 소개', date: '2026-02-20' },
        { id: 2, title: 'SvelteKit 라우팅', summary: '파일 기반 라우팅 완전 정복', date: '2026-02-18' },
        { id: 3, title: 'Form Actions', summary: '서버 통신의 새로운 패턴', date: '2026-02-15' }
    ];
    return { posts };
};
