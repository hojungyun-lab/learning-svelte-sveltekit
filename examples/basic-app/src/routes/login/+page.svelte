<script lang="ts">
    import { enhance } from "$app/forms";
    let { form } = $props();
</script>

<h1>🔑 로그인</h1>
<form method="POST" use:enhance class="form">
    <input
        name="email"
        type="email"
        value={form?.email ?? ""}
        placeholder="hong@test.com"
    />
    <input name="password" type="password" placeholder="password123" />
    {#if form?.error}<p class="error">❌ {form.error}</p>{/if}
    <button type="submit">로그인</button>
    <p class="hint">테스트: hong@test.com / password123</p>
</form>

<style>
    .form {
        max-width: 400px;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 2rem;
        background: white;
        border-radius: 16px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    }
    input {
        padding: 0.75rem;
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
    .hint {
        color: #999;
        font-size: 0.8rem;
        text-align: center;
    }
</style>
