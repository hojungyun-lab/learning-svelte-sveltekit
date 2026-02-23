<script lang="ts">
    interface User {
        id: number;
        name: string;
        email: string;
        role: string;
    }

    let users = $state<User[]>([
        { id: 1, name: "홍길동", email: "hong@test.com", role: "관리자" },
        { id: 2, name: "김철수", email: "kim@test.com", role: "사용자" },
        { id: 3, name: "이영희", email: "lee@test.com", role: "편집자" },
        { id: 4, name: "박민수", email: "park@test.com", role: "사용자" },
    ]);

    let sortField = $state<keyof User>("id");
    let sortAsc = $state(true);

    let sorted = $derived.by(() => {
        return [...users].sort((a, b) => {
            const valA = String(a[sortField]);
            const valB = String(b[sortField]);
            return sortAsc
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
        });
    });

    function toggleSort(field: keyof User) {
        if (sortField === field) {
            sortAsc = !sortAsc;
        } else {
            sortField = field;
            sortAsc = true;
        }
    }

    function getSortIcon(field: keyof User): string {
        if (sortField !== field) return "↕";
        return sortAsc ? "↑" : "↓";
    }
</script>

{#snippet headerCell(field: keyof User, label: string)}
    <th onclick={() => toggleSort(field)} class="sortable">
        {label}
        {getSortIcon(field)}
    </th>
{/snippet}

<div class="table-wrapper">
    <table>
        <thead>
            <tr>
                {@render headerCell("id", "ID")}
                {@render headerCell("name", "이름")}
                {@render headerCell("email", "이메일")}
                {@render headerCell("role", "역할")}
            </tr>
        </thead>
        <tbody>
            {#each sorted as user (user.id)}
                <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><span class="badge">{user.role}</span></td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .table-wrapper {
        padding: 1rem;
        border-radius: 16px;
        background: white;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        overflow-x: auto;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th,
    td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid #eee;
    }
    th {
        background: #f5f5f5;
        font-weight: 600;
    }
    .sortable {
        cursor: pointer;
        user-select: none;
    }
    .sortable:hover {
        background: #e0e0e0;
    }
    .badge {
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        background: #e3f2fd;
        color: #1565c0;
        font-size: 0.8rem;
    }
</style>
