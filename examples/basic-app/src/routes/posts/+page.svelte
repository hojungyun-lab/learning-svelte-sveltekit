<script lang="ts">
    let { data } = $props();
</script>

<h1>📡 서버 데이터 로딩</h1>
<p>
    이 데이터는 <code>+page.server.ts</code>의 <code>load</code> 함수에서 가져왔습니다.
</p>

<div class="posts">
    {#each data.posts as post}
        <article>
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
            <time>{post.date}</time>
        </article>
    {/each}
</div>

<style>
    .posts {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }
    article {
        padding: 1.5rem;
        border-radius: 12px;
        background: white;
        border: 1px solid #eee;
    }
    article h2 {
        margin: 0 0 0.5rem;
        color: #333;
    }
    article p {
        color: #666;
        margin: 0 0 0.5rem;
    }
    time {
        color: #999;
        font-size: 0.85rem;
    }
</style>
