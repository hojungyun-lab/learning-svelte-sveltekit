<script lang="ts">
    const posts = [
        { slug: "svelte-5-intro", title: "Svelte 5 소개", date: "2026-02-20" },
        { slug: "runes-guide", title: "Runes 완전 가이드", date: "2026-02-18" },
        {
            slug: "sveltekit-routing",
            title: "SvelteKit 라우팅 마스터",
            date: "2026-02-15",
        },
    ];
</script>

<h1>📝 블로그</h1>
<div class="posts">
    {#each posts as post}
        <a href="/blog/{post.slug}" class="post-card">
            <h3>{post.title}</h3>
            <p>{post.date}</p>
        </a>
    {/each}
</div>

<style>
    .posts {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    .post-card {
        padding: 1rem 1.5rem;
        border-radius: 8px;
        background: white;
        border: 1px solid #eee;
        text-decoration: none;
        color: inherit;
    }
    .post-card:hover {
        border-color: #ff3e00;
    }
    .post-card h3 {
        margin: 0 0 0.25rem;
    }
    .post-card p {
        margin: 0;
        color: #888;
        font-size: 0.85rem;
    }
</style>
