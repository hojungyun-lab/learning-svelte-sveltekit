<script lang="ts">
    interface Todo {
        id: number;
        text: string;
        done: boolean;
    }

    let todos = $state<Todo[]>([
        { id: 1, text: "Svelte 5 기초 학습", done: true },
        { id: 2, text: "Runes 이해하기", done: true },
        { id: 3, text: "이벤트 핸들링 실습", done: false },
        { id: 4, text: "컴포넌트 만들기", done: false },
    ]);

    let newTodo = $state("");
    let nextId = $state(5);
    let filter = $state<"all" | "active" | "done">("all");

    let filteredTodos = $derived.by(() => {
        switch (filter) {
            case "active":
                return todos.filter((t) => !t.done);
            case "done":
                return todos.filter((t) => t.done);
            default:
                return todos;
        }
    });

    let remaining = $derived(todos.filter((t) => !t.done).length);

    function addTodo() {
        if (newTodo.trim()) {
            todos.push({ id: nextId++, text: newTodo.trim(), done: false });
            newTodo = "";
        }
    }

    function removeTodo(id: number) {
        todos = todos.filter((t) => t.id !== id);
    }
</script>

<div class="todo-app">
    <div class="input-group">
        <input
            bind:value={newTodo}
            onkeydown={(e) => e.key === "Enter" && addTodo()}
            placeholder="새 할 일 추가..."
        />
        <button onclick={addTodo}>추가</button>
    </div>

    <div class="filters">
        <button class:active={filter === "all"} onclick={() => (filter = "all")}
            >전체</button
        >
        <button
            class:active={filter === "active"}
            onclick={() => (filter = "active")}>미완료</button
        >
        <button
            class:active={filter === "done"}
            onclick={() => (filter = "done")}>완료</button
        >
    </div>

    {#each filteredTodos as todo (todo.id)}
        <div class="todo-item" class:done={todo.done}>
            <input type="checkbox" bind:checked={todo.done} />
            <span>{todo.text}</span>
            <button class="delete" onclick={() => removeTodo(todo.id)}>✕</button
            >
        </div>
    {:else}
        <p class="empty">항목이 없습니다 🎉</p>
    {/each}

    {#if todos.length > 0}
        <p class="status">{remaining}개 남음 / 총 {todos.length}개</p>
    {/if}
</div>

<style>
    .todo-app {
        padding: 2rem;
        border-radius: 16px;
        background: white;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    }
    .input-group {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    .input-group input {
        flex: 1;
        padding: 0.75rem;
        border: 2px solid #ddd;
        border-radius: 8px;
    }
    .input-group button {
        padding: 0.75rem 1.5rem;
        background: #ff3e00;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }
    .filters {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    .filters button {
        padding: 0.5rem 1rem;
        border: 2px solid #ddd;
        background: white;
        border-radius: 20px;
        cursor: pointer;
    }
    .filters button.active {
        border-color: #ff3e00;
        color: #ff3e00;
        font-weight: bold;
    }
    .todo-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        border-radius: 8px;
        margin-bottom: 0.5rem;
        background: #f9f9f9;
    }
    .todo-item.done span {
        text-decoration: line-through;
        opacity: 0.5;
    }
    .todo-item span {
        flex: 1;
    }
    .delete {
        background: none;
        border: none;
        color: #f44336;
        cursor: pointer;
        font-size: 1rem;
    }
    .empty {
        text-align: center;
        color: #888;
        padding: 2rem;
    }
    .status {
        text-align: center;
        color: #888;
        font-size: 0.85rem;
        margin-top: 1rem;
    }
</style>
