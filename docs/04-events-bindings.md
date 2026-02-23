# 🎯 Step 03: 이벤트 & 바인딩

## 학습 목표
- Svelte 5 이벤트 처리 (`onclick`, `oninput`)
- `bind:` 디렉티브로 양방향 바인딩
- 폼 입력 처리 패턴

---

## 개념 설명

### 이벤트 핸들링 (Svelte 5)

```svelte
<!-- Svelte 5: 소문자 on 접두사 + DOM 이벤트명 -->
<button onclick={handleClick}>클릭</button>
<button onclick={() => count++}>인라인</button>
<input oninput={(e) => text = e.currentTarget.value} />
```

> **🔄 React 비교**: React에서는 `onClick`, `onInput`처럼 **카멜 케이스**로 쓰지만, Svelte 5에서는 `onclick`, `oninput`처럼 **소문자** 그대로 사용합니다.

### `bind:` — 양방향 바인딩

```svelte
<input bind:value={name} />           <!-- 텍스트 -->
<input type="checkbox" bind:checked={agreed} />  <!-- 체크박스 -->
<select bind:value={selected}>...</select>        <!-- 셀렉트 -->
```

> **🔄 React 비교**: React에서는 입력값을 관리하기 위해 `value={name}`과 `onChange={e => setName(e.target.value)}`를 항상 함께 쓰는 **Controlled Component** 패턴이 필요합니다. Svelte의 `bind:value={name}`은 이 두 줄을 **한 줄**로 해결합니다.

---

## 실습: 파일 생성

### 1. `src/lib/components/FormDemo.svelte` 생성

```svelte
<script lang="ts">
  let name = $state('');
  let email = $state('');
  let agreed = $state(false);
  let submitted = $state(false);

  function handleSubmit() {
    if (name && email && agreed) {
      submitted = true;
    }
  }

  function reset() {
    name = '';
    email = '';
    agreed = false;
    submitted = false;
  }
</script>

<div class="form-demo">
  <h3>회원가입 폼</h3>

  {#if submitted}
    <div class="success">
      <p>✅ 등록 완료!</p>
      <p>이름: {name}, 이메일: {email}</p>
      <button onclick={reset}>다시 작성</button>
    </div>
  {:else}
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div class="field">
        <label>이름</label>
        <input bind:value={name} placeholder="이름 입력" />
      </div>
      <div class="field">
        <label>이메일</label>
        <input bind:value={email} type="email" placeholder="email@example.com" />
      </div>
      <label class="check">
        <input type="checkbox" bind:checked={agreed} />
        <span>약관에 동의합니다</span>
      </label>
      <button type="submit" disabled={!name || !email || !agreed}>등록</button>
    </form>
    <p class="preview">미리보기: {name || '(이름)'} / {email || '(이메일)'}</p>
  {/if}
</div>

<style>
  .form-demo { padding: 2rem; border-radius: 16px; background: white; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
  h3 { margin: 0 0 1rem; color: #333; }
  .field { margin-bottom: 1rem; }
  label { display: block; font-weight: 600; margin-bottom: 0.25rem; }
  input[type="text"], input[type="email"] { width: 100%; padding: 0.5rem; border: 2px solid #ddd; border-radius: 8px; box-sizing: border-box; }
  .check { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; font-weight: normal; }
  button { padding: 0.75rem 1.5rem; background: #ff3e00; color: white; border: none; border-radius: 8px; cursor: pointer; }
  button:disabled { opacity: 0.5; cursor: not-allowed; }
  .preview { color: #888; font-size: 0.85rem; margin-top: 1rem; }
  .success { text-align: center; }
  .success button { background: #4caf50; }
</style>
```

### 2. `src/routes/+page.svelte` 수정

 `<script>` 에 추가:
```svelte
import FormDemo from '$lib/components/FormDemo.svelte';
```

마크업에 Step 03 섹션 추가:
```svelte
<section>
  <h2>Step 03: 이벤트 & 바인딩</h2>
  <FormDemo />
</section>
```

---

## 확인

브라우저에서 `http://localhost:5174` 접속 후 다음 화면이 나오는지 확인합니다:

<div align="center">
  <img src="../images/events-bindings-demo.png" alt="Events & Bindings Demo - FormDemo" width="500" style="border-radius:12px; border:1px solid #ddd; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
  <p><em>(회원가입 폼 실습 화면)</em></p>
</div>

- 이름/이메일 입력 시 미리보기가 실시간 업데이트되는지 확인
- 체크박스 해제 시 등록 버튼이 비활성화되는지 확인
- 등록 후 성공 메시지 표시 및 "다시 작성" 기능 확인

---

## 🎯 다음 단계

[05-control-flow.md](./05-control-flow.md) →
