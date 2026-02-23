<script lang="ts">
    import { enhance } from "$app/forms";
    import { scale } from "svelte/transition";
    import { flip } from "svelte/animate";

    let { data, form } = $props();

    let filter = $state<"all" | "active" | "done">("all");

    let filteredTodos = $derived.by(() => {
        switch (filter) {
            case "active":
                return data.todos.filter((t: any) => !t.done);
            case "done":
                return data.todos.filter((t: any) => t.done);
            default:
                return data.todos;
        }
    });

    let remaining = $derived(data.todos.filter((t: any) => !t.done).length);
    let doneCount = $derived(data.todos.filter((t: any) => t.done).length);
</script>

<div class="container">
    <header>
        <h1>✅ Todo 앱</h1>
        <p class="subtitle">Svelte 5 + SvelteKit 실전 프로젝트</p>
    </header>

    <form method="POST" action="?/create" use:enhance class="input-form">
        <input
            name="text"
            value={form?.text ?? ""}
            placeholder="새 할 일을 입력하세요..."
            autocomplete="off"
        />
        <button type="submit">추가</button>
    </form>
    {#if form?.error}
        <p class="error" transition:scale>❌ {form.error}</p>
    {/if}
    {#if form?.success}
        <p class="success" transition:scale>✅ 추가 완료!</p>
    {/if}

    <div class="filters">
        <button
            class:active={filter === "all"}
            onclick={() => (filter = "all")}
        >
            전체 ({data.todos.length})
        </button>
        <button
            class:active={filter === "active"}
            onclick={() => (filter = "active")}
        >
            미완료 ({remaining})
        </button>
        <button
            class:active={filter === "done"}
            onclick={() => (filter = "done")}
        >
            완료 ({doneCount})
        </button>
    </div>

    <ul class="todo-list">
        {#each filteredTodos as todo (todo.id)}
            <li
                class="todo-item"
                class:done={todo.done}
                transition:scale={{ duration: 200, start: 0.95 }}
                animate:flip={{ duration: 250 }}
            >
                <form
                    method="POST"
                    action="?/toggle"
                    use:enhance
                    class="toggle-form"
                >
                    <input type="hidden" name="id" value={todo.id} />
                    <button
                        type="submit"
                        class="checkbox"
                        class:checked={todo.done}
                    >
                        {todo.done ? "✓" : ""}
                    </button>
                </form>
                <span class="text">{todo.text}</span>
                <form method="POST" action="?/delete" use:enhance>
                    <input type="hidden" name="id" value={todo.id} />
                    <button type="submit" class="delete-btn">✕</button>
                </form>
            </li>
        {:else}
            <li class="empty">
                {#if filter === "done"}
                    완료된 항목이 없습니다
                {:else if filter === "active"}
                    모든 할 일을 완료했습니다! 🎉
                {:else}
                    할 일을 추가해보세요
                {/if}
            </li>
        {/each}
    </ul>

    {#if doneCount > 0}
        <form method="POST" action="?/clearDone" use:enhance class="clear-form">
            <button type="submit">🗑️ 완료 항목 모두 삭제 ({doneCount}개)</button
            >
        </form>
    {/if}

    <footer>
        <span>{remaining}개 남음</span>
        <span>총 {data.todos.length}개</span>
    </footer>
</div>

<style>
    :global(body) {
        margin: 0;
        font-family:
            "Inter",
            system-ui,
            -apple-system,
            sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        justify-content: center;
        padding: 2rem;
    }

    .container {
        width: 100%;
        max-width: 560px;
        margin: 0 auto;
    }

    header {
        text-align: center;
        margin-bottom: 2rem;
    }
    h1 {
        color: white;
        font-size: 2.5rem;
        margin: 0;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    .subtitle {
        color: rgba(255, 255, 255, 0.8);
        margin: 0.5rem 0 0;
        font-size: 1rem;
    }

    .input-form {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .input-form input {
        flex: 1;
        padding: 1rem 1.25rem;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        outline: none;
    }
    .input-form input:focus {
        box-shadow:
            0 4px 20px rgba(0, 0, 0, 0.15),
            0 0 0 3px rgba(255, 255, 255, 0.4);
    }
    .input-form button {
        padding: 1rem 1.5rem;
        background: #ff3e00;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(255, 62, 0, 0.3);
        transition:
            transform 0.15s,
            box-shadow 0.15s;
    }
    .input-form button:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(255, 62, 0, 0.4);
    }

    .error {
        color: #ffcdd2;
        font-size: 0.9rem;
        margin: 0.25rem 0 0.5rem;
    }
    .success {
        color: #c8e6c9;
        font-size: 0.9rem;
        margin: 0.25rem 0 0.5rem;
    }

    .filters {
        display: flex;
        gap: 0.5rem;
        margin: 1rem 0;
    }
    .filters button {
        flex: 1;
        padding: 0.6rem;
        border: 2px solid rgba(255, 255, 255, 0.3);
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.7);
        border-radius: 10px;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s;
    }
    .filters button.active {
        background: rgba(255, 255, 255, 0.95);
        color: #333;
        border-color: transparent;
        font-weight: 600;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    }

    .todo-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .todo-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 1.25rem;
        margin-bottom: 0.5rem;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        transition: transform 0.15s;
    }
    .todo-item:hover {
        transform: translateX(4px);
    }
    .todo-item.done {
        opacity: 0.7;
    }
    .todo-item.done .text {
        text-decoration: line-through;
        color: #999;
    }

    .toggle-form {
        display: flex;
    }
    .checkbox {
        width: 28px;
        height: 28px;
        border: 2px solid #ccc;
        border-radius: 50%;
        background: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        color: white;
        transition: all 0.2s;
        padding: 0;
    }
    .checkbox.checked {
        background: #4caf50;
        border-color: #4caf50;
    }

    .text {
        flex: 1;
        font-size: 1rem;
        color: #333;
    }

    .delete-btn {
        border: none;
        background: none;
        color: #ccc;
        font-size: 1.1rem;
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        border-radius: 6px;
        transition: all 0.2s;
    }
    .delete-btn:hover {
        color: #f44336;
        background: #ffebee;
    }

    .empty {
        text-align: center;
        padding: 2rem;
        color: rgba(255, 255, 255, 0.6);
        font-size: 1rem;
        list-style: none;
    }

    .clear-form {
        margin-top: 0.5rem;
    }
    .clear-form button {
        width: 100%;
        padding: 0.75rem;
        background: rgba(244, 67, 54, 0.15);
        color: #ffcdd2;
        border: 2px solid rgba(244, 67, 54, 0.3);
        border-radius: 10px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.2s;
    }
    .clear-form button:hover {
        background: rgba(244, 67, 54, 0.3);
        border-color: rgba(244, 67, 54, 0.5);
    }

    footer {
        display: flex;
        justify-content: space-between;
        padding: 1rem 0.5rem;
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.85rem;
    }
</style>
