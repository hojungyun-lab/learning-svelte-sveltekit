<script lang="ts">
    import { enhance } from "$app/forms";
    let { data, form } = $props();
</script>

<h1>📝 피드백</h1>

<form method="POST" action="?/create" use:enhance class="form">
    <input name="name" value={form?.name ?? ""} placeholder="이름" />
    <textarea name="message" placeholder="피드백" rows="3"
        >{form?.message ?? ""}</textarea
    >
    <input
        name="rating"
        type="number"
        min="1"
        max="5"
        value={form?.rating ?? 5}
    />
    {#if form?.error}<p class="error">❌ {form.error}</p>{/if}
    {#if form?.success}<p class="success">✅ 등록 완료!</p>{/if}
    <button type="submit">등록</button>
</form>

<h2>피드백 목록 ({data.feedbacks.length}개)</h2>
{#each data.feedbacks as fb (fb.id)}
    <div class="card">
        <strong>{fb.name}</strong>
        {"⭐".repeat(fb.rating)}
        <p>{fb.message}</p>
        <form method="POST" action="?/delete" use:enhance>
            <input type="hidden" name="id" value={fb.id} />
            <button class="del">삭제</button>
        </form>
    </div>
{:else}
    <p>피드백이 없습니다.</p>
{/each}

<style>
    .form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }
    input,
    textarea {
        padding: 0.5rem;
        border: 2px solid #ddd;
        border-radius: 8px;
    }
    button {
        padding: 0.75rem;
        background: #ff3e00;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }
    .error {
        color: #f44336;
    }
    .success {
        color: #2e7d32;
    }
    .card {
        padding: 1rem;
        border: 1px solid #eee;
        border-radius: 8px;
        margin-bottom: 0.5rem;
    }
    .del {
        padding: 0.25rem 0.5rem;
        background: #f44336;
        font-size: 0.8rem;
    }
</style>
