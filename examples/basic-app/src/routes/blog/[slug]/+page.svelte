<script lang="ts">
    import { page } from "$app/stores";
</script>

<a href="/blog">← 블로그 목록</a>
<h1>블로그 글: {$page.params.slug}</h1>
<p>동적 라우트 <code>/blog/[slug]</code>를 통해 렌더링되었습니다.</p>
<p>URL 파라미터 <code>slug</code> = <strong>{$page.params.slug}</strong></p>
