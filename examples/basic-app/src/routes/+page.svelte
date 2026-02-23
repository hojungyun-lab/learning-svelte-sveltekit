<script lang="ts">
    import Greeting from "$lib/components/Greeting.svelte";
    import ProfileCard from "$lib/components/ProfileCard.svelte";
    import Counter from "$lib/components/Counter.svelte";
    import Calculator from "$lib/components/Calculator.svelte";
    import FormDemo from "$lib/components/FormDemo.svelte";
    import TodoList from "$lib/components/TodoList.svelte";
    import DataTable from "$lib/components/DataTable.svelte";

    const skills = ["Svelte", "TypeScript", "CSS", "Node.js"];
</script>

<main>
    <h1>Svelte 5 학습</h1>

    <section>
        <h2>Step 01: 기초</h2>
        <Greeting name="학습자" />
        <ProfileCard name="홍길동" title="Developer" {skills} />
    </section>

    <section>
        <h2>Step 02: Runes</h2>
        <Counter />
        <Calculator />
    </section>

    <section>
        <h2>Step 03: 이벤트 & 바인딩</h2>
        <FormDemo />
    </section>

    <section>
        <h2>Step 04: 조건부 렌더링 & 반복</h2>
        <TodoList />
    </section>

    <section>
        <h2>Step 05: 컴포넌트 심화 (Snippets)</h2>
        <DataTable />
    </section>
</main>

<style>
    main {
        max-width: 700px;
        margin: 0 auto;
        padding: 2rem;
        font-family: "Inter", system-ui, sans-serif;
    }
    h1 {
        color: #ff3e00;
        text-align: center;
    }
    section {
        margin: 2rem 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    h2 {
        color: #333;
        border-bottom: 2px solid #eee;
        padding-bottom: 0.5rem;
    }
</style>
