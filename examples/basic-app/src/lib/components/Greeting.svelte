<script lang="ts">
  let { name } = $props();
</script>

<div class="greeting">
  <h2>안녕하세요, {name}님! 👋</h2>
  <p>Svelte 5의 세계에 오신 것을 환영합니다.</p>
</div>

<style>
  .greeting {
    padding: 1rem;
    background-color: #f0f4f8;
    border-radius: 8px;
    border-left: 4px solid #ff3e00;
  }
  h2 { margin: 0 0 0.5rem; }
  p { margin: 0; opacity: 0.9; }
</style>
