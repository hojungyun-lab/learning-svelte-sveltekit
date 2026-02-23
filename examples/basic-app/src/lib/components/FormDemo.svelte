<script lang="ts">
    let name = $state("");
    let email = $state("");
    let agreed = $state(false);
    let submitted = $state(false);

    function handleSubmit() {
        if (name && email && agreed) {
            submitted = true;
        }
    }

    function reset() {
        name = "";
        email = "";
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
        <form
            onsubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <div class="field">
                <label>이름</label>
                <input bind:value={name} placeholder="이름 입력" />
            </div>
            <div class="field">
                <label>이메일</label>
                <input
                    bind:value={email}
                    type="email"
                    placeholder="email@example.com"
                />
            </div>
            <label class="check">
                <input type="checkbox" bind:checked={agreed} />
                <span>약관에 동의합니다</span>
            </label>
            <button type="submit" disabled={!name || !email || !agreed}
                >등록</button
            >
        </form>
        <p class="preview">
            미리보기: {name || "(이름)"} / {email || "(이메일)"}
        </p>
    {/if}
</div>

<style>
    .form-demo {
        padding: 2rem;
        border-radius: 16px;
        background: white;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    }
    h3 {
        margin: 0 0 1rem;
        color: #333;
    }
    .field {
        margin-bottom: 1rem;
    }
    label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.25rem;
    }
    input[type="text"],
    input[type="email"] {
        width: 100%;
        padding: 0.5rem;
        border: 2px solid #ddd;
        border-radius: 8px;
        box-sizing: border-box;
    }
    .check {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
        font-weight: normal;
    }
    button {
        padding: 0.75rem 1.5rem;
        background: #ff3e00;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }
    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    .preview {
        color: #888;
        font-size: 0.85rem;
        margin-top: 1rem;
    }
    .success {
        text-align: center;
    }
    .success button {
        background: #4caf50;
    }
</style>
