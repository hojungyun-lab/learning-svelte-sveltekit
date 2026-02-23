<script lang="ts">
	import type { Snippet } from "svelte";
	import { page } from "$app/stores";

	let { children }: { children: Snippet } = $props();
</script>

<div class="app">
	<nav>
		<div class="logo">📚 SvelteKit 학습</div>
		<div class="links">
			<a href="/" class:active={$page.url.pathname === "/"}>홈</a>
			<a href="/about" class:active={$page.url.pathname === "/about"}
				>소개</a
			>
			<a
				href="/blog"
				class:active={$page.url.pathname.startsWith("/blog")}>블로그</a
			>
			<a href="/posts" class:active={$page.url.pathname === "/posts"}
				>글 목록</a
			>
		</div>
	</nav>
	<main>{@render children()}</main>
	<footer>현재 경로: <code>{$page.url.pathname}</code></footer>
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		font-family: "Inter", system-ui, sans-serif;
	}
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background: linear-gradient(135deg, #1a1a2e, #16213e);
		color: white;
	}
	.logo {
		font-weight: bold;
		font-size: 1.2rem;
	}
	.links {
		display: flex;
		gap: 1.5rem;
	}
	.links a {
		color: rgba(255, 255, 255, 0.7);
		text-decoration: none;
	}
	.links a:hover,
	.links a.active {
		color: white;
	}
	main {
		flex: 1;
		padding: 2rem;
		max-width: 800px;
		margin: 0 auto;
		width: 100%;
	}
	footer {
		padding: 1rem 2rem;
		background: #f5f5f5;
		text-align: center;
		font-size: 0.85rem;
		color: #888;
	}
	code {
		background: #e0e0e0;
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
	}
</style>
