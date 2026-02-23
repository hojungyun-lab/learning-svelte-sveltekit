<script lang="ts">
    let {
        name,
        title,
        skills = [],
    }: {
        name: string;
        title: string;
        skills?: string[];
    } = $props();
</script>

<div class="card">
    <h3>{name}</h3>
    <p class="title">{title}</p>
    {#if skills.length > 0}
        <p class="skills">총 {skills.length}개 기술 보유</p>
        <div class="tags">
            {#each skills as skill}
                <span class="tag">{skill}</span>
            {/each}
        </div>
    {/if}
</div>

<style>
    .card {
        padding: 2rem;
        border-radius: 16px;
        background: white;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    h3 {
        margin: 0 0 0.25rem;
        color: #333;
        font-size: 1.4rem;
    }
    .title {
        color: #888;
        margin: 0 0 1rem;
    }
    .tags {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    .tag {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        background: #ff3e00;
        color: white;
        font-size: 0.85rem;
        font-weight: bold;
    }
    .skills {
        font-size: 0.85rem;
        color: #666;
        margin-bottom: 0.5rem;
    }
</style>
