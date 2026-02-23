# 🏗️ 실전 프로젝트: Todo 앱

> 이 프로젝트는 지금까지 배운 모든 개념을 통합하여 **처음부터** 직접 빌드합니다.

## 구현 요구사항

### 기능
1. **CRUD**: Todo 생성, 읽기, 완료 토글, 삭제
2. **필터링**: 전체 / 미완료 / 완료
3. **완료 항목 일괄 삭제**
4. **유효성 검사**: 빈 문자열 방지

### 사용할 기술
- `+page.server.ts` → `load` + Form Actions (create, toggle, delete, clearDone)
- `use:enhance` → Progressive Enhancement
- `$state` + `$derived` → 필터 상태 관리
- `transition:` → 항목 추가/삭제 애니메이션
- `animate:flip` → 리스트 재정렬 애니메이션

## 시작하기

학습자가 직접 코드를 작성할 새로운 프로젝트를 프로젝트 루트 디렉토리에 생성합니다. (`examples/todo-app`은 완성된 참고 코드입니다.)

```bash
# 프로젝트 루트(learning-svelte-sveltekit)에서 실행
npx -y sv create my-todo-app --template minimal --types ts

# ❗️ 만약 "What would you like to add to your project?" 질문이 나오면,
# 아무것도 선택하지 말고 바로 Enter를 누르세요.

cd my-todo-app
npm install
npm run dev
```

## 힌트: 파일 구조

```
src/routes/
├── +page.server.ts    # load + actions (create, toggle, delete, clearDone)
└── +page.svelte       # Todo UI
```

### `+page.server.ts` 스켈레톤

```typescript
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

interface Todo { id: number; text: string; done: boolean; }

const todos: Todo[] = [];
let nextId = 1;

export const load: PageServerLoad = async () => {
  return { todos: [...todos] };
};

export const actions: Actions = {
  create: async ({ request }) => {
    // formData에서 text 가져오기
    // 유효성 검사 → fail(400, ...)
    // todos.push(...)
  },
  toggle: async ({ request }) => { /* ... */ },
  delete: async ({ request }) => { /* ... */ },
  clearDone: async () => { /* 완료 항목 모두 삭제 */ }
};
```

### `+page.svelte` 스켈레톤

```svelte
<script lang="ts">
  import { enhance } from '$app/forms';
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  let { data, form } = $props();
  let filter = $state<'all' | 'active' | 'done'>('all');

  let filteredTodos = $derived.by(() => {
    // filter에 따라 data.todos 필터링
  });
</script>

<!-- 
  1. 입력 폼 (action="?/create")
  2. 필터 버튼 (전체/미완료/완료)
  3. Todo 리스트 ({#each} + animate:flip)
  4. 완료 삭제 버튼 (action="?/clearDone")
-->
```

## 완성 후 확인

- [ ] Todo 추가/삭제/토글
- [ ] 필터 동작
- [ ] 빈 입력 시 에러 메시지
- [ ] 애니메이션 적용
- [ ] 페이지 새로고침 없이 동작

행운을 빕니다! 🍀
