<script lang="ts">
    let { data } = $props();
</script>

<h1>📊 대시보드</h1>
<p>환영합니다, <strong>{data.user.name}</strong>님!</p>
<p>이메일: {data.user.email}</p>
