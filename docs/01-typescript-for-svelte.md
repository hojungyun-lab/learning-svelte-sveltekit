# 📘 Step 01: 왕초보를 위한 핵심 JavaScript & TypeScript

> 💡 **자바스크립트(JavaScript)를 전혀 모르셔도 괜찮습니다!**
> 이 문서는 웹 개발의 뼈대 언어인 JavaScript(JS)의 아주 기초적인 개념과, 그 위에 타입(Type) 검사 기능을 얹어 실수를 막아주는 **TypeScript(TS)** 의 핵심만 5분 만에 빠르게 훑어보기 위해 작성되었습니다.

---

## TypeScript란 무엇인가요?
원래 웹 브라우저는 **JavaScript(자바스크립트)**라는 언어만 이해합니다. 하지만 자바스크립트는 너무 자유로워서, 숫자 10에 글자 "안녕"을 더하려고 해도 오류를 내지 않고 대충 `10안녕`이라고 만들어버립니다. 이런 자유로움은 큰 시스템을 만들 때 치명적인 버그(오류)를 만듭니다.

그래서 발명된 것이 **TypeScript(타입스크립트)**입니다. 자바스크립트에 **"이 변수는 무조건 숫자만 들어가야 해!"**라고 **타입(이름표)**을 붙여, 코드를 실행하기 전(코드 작성 중)에 미리 오류를 빨간 줄로 알려주는 도구입니다.

TypeScript를 도입하면 코드를 작성하는 단계에서 실수를 대부분 잡아낼 수 있으므로, 아주 약간의 기본 규칙만 알면 훨씬 안전하게 앱을 만들 수 있습니다.

---

## 1. 변수 (데이터를 담는 상자)

일반적인 상황에서는 데이터가 갱신될 때마다 화면도 바뀌어야 하므로 값이 변할 수 있는 `let` 키워드를 자주 사용합니다.

TypeScript는 변수명 뒤에 `: 타입이름`을 적어 이 상자에 무엇이 들어갈지 정해줍니다.

```typescript
// let [변수이름]: [타입] = [초기값];

let name: string = "Svelte"; // string: 글자(문자열)만 들어올 수 있는 상자
let count: number = 0;       // number: 숫자만 들어올 수 있는 상자
let isDone: boolean = false; // boolean: 참(true) 또는 거짓(false)만 들어오는 상자

// 여러 개의 데이터를 기차처럼 쭉 이어붙인 상자 (배열, Array)
let messages: string[] = ["안녕하세요", "반갑습니다"]; // 문자열 배열
let numbers: number[] = [1, 2, 3, 4, 5];              // 숫자 배열
```

*※ 만약 `count = "하나"`라고 잘못 적으면, TS가 즉각 "숫자 상자에 글자를 넣을 수 없다"고 빨간 줄로 알려줍니다.*

---

## 2. 객체 (사물의 특징을 모아둔 꾸러미)

현실 세계의 사물은 여러 특징을 한데 묶어서 설명해야 할 때가 많습니다. 예를 들어 '사용자'라면 고유 번호, 이름, 나이가 다 같이 붙어 다닙니다. 이것을 **객체(Object)**라고 부릅니다.

TypeScript에서는 이 객체가 "무조건 이런 모양을 가져야 한다"고 틀을 짜줄 수 있습니다. 이것কে **인터페이스(Interface) 또는 타입(Type)**이라고 합니다.

```typescript
// 1. 설계도(틀) 만들기 : 대문자로 시작합니다.
interface User {
  id: number;       // 아이디는 반드시 숫자
  name: string;     // 이름은 반드시 문자
  age?: number;     // ? 기호는 "이 항목은 없어도 괜찮다(선택적)"는 뜻입니다.
}

// 2. 실제 데이터 꾸러미 만들기
let myUser: User = { 
  id: 1, 
  name: "앨리스", 
  age: 25 
};

// ❌ 아래는 오류 발생! id(숫자)와 name(문자)이 필수인데 없기 때문입니다.
// let wrongUser: User = { age: 30 }; 
```
이런 틀을 잘 만들어두면, 나중에 데이터 객체를 넘겨 화면에 그릴 때 자동완성 기능이 켜져서 오타를 방지해 줍니다. (`myUser.`을 치면 `id`, `name`, `age`가 주르륵 뜹니다.)

---

### 2-1. 객체 구조 분해 할당과 기본값 (Destructuring & Default Values)

객체 안에 들어 있는 값들을 사용하기 위해 매번 `myUser.name`, `myUser.age` 라고 쓰면 번거롭습니다. 이때 상자를 풀어서 내용물만 쏙쏙 빼내는 문법인 **구조 분해 할당(Destructuring)**을 사용합니다. 만약 값이 없을 때를 대비한 **기본값**도 동시에 설정할 수 있습니다.

```typescript
// myUser 객체에서 name과 age 변수만 쏙 빼냅니다.
// age에 값이 없다면 기본값으로 20을 넣으라고 지정했습니다.
// (참고: name은 필수로 지정된 값이지만, 만약 선택적 속성(name?)이었다면 name = "무명"과 같이 똑같이 기본값을 줄 수 있습니다. 아무 기본값도 안 주면 undefined(정의되지 않음)가 됩니다.)
let { name, age = 20 } = myUser;

console.log(name); // "앨리스"
console.log(age);  // myUser 객체에 age 속성이 있으므로 25가 출력됩니다.
```

이 문법은 Svelte에서 외부로부터 입력받는 속성(Props)을 다룰 때 아주 흔하게 사용됩니다.

---

## 3. 함수 (명령어 자판기) 와 이벤트

**함수(Function)**는 특정 작업을 수행하도록 만든 **자판기** 같은 것입니다. 동전을 넣으면 콜라가 나오듯, 입력을 주면 결과를 뱉어냅니다.

```typescript
// function 이름(입력값: 입력타입): 출력타입
function calculateTotal(price: number, quantity: number): number {
  return price * quantity; // 곱해서 돌려줌
}

let result = calculateTotal(1000, 3); // 3000
```

웹에서는 사용자가 버튼을 클릭하거나 글자를 **입력하는 사건(이벤트, Event)**이 아주 중요합니다. 브라우저가 제공하는 이벤트에도 이름표(타입)가 있습니다.

```typescript
// MouseEvent: 마우스 클릭 정보가 든 상자
function handleClick(event: MouseEvent) {
  console.log("좌표:", event.clientX, event.clientY);
}

// 사용자가 키보드로 타자를 칠 때의 이벤트
// 입력창(HTMLInputElement)에서 발생한 이벤트라고 명시해줍니다.
function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
  console.log("사용자가 친 글자:", event.currentTarget.value);
}
```

---

## 4. 화살표 함수 (Arrow Functions)

JavaScript의 최신 문법에서는 `function` 키워드보다 화살표(`=>`)를 더 많이 사용합니다. 이 방식은 코드를 아주 간결하게 만들어 줍니다.

```typescript
// 기존 방식
function add(a: number, b: number): number {
  return a + b;
}

// 화살표 함수 방식 (완전히 동일한 역할)
const addArrow = (a: number, b: number): number => {
  return a + b;
};

// 중괄호와 return 마저 생략한 초간단 방식 (한 줄일 때 가능)
const addShort = (a: number, b: number): number => a + b;
```

---

## 5. 배열을 다루는 마법 (map, filter)

배열 안에 있는 데이터들을 변형하거나 걸러낼 때, 반복문(for) 대신 **배열 내장 함수**를 씁니다. React나 Svelte 생태계에서 아마 가장 많이 보게 될 함수 두 가지입니다.

```typescript
let numbers: number[] = [1, 2, 3, 4, 5];

// 1. map: 배열 안의 모든 요소에 똑같은 규칙을 적용해 '새 배열'을 만듭니다.
let doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// 2. filter: 조건에 맞는(true를 반환하는) 요소만 걸러내어 '새 배열'을 만듭니다.
let evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]
```

---

## 6. 객체와 배열 펼치기 (전개 연산자: `...`)

상자 안의 내용물을 와르르 쏟아붓고 싶을 때 점 3개(`...`)를 씁니다. 이를 **전개 연산자(Spread Syntax)**라고 부릅니다. 보통 원본을 건드리지 않고 *데이터를 복사하거나 확장*할 때 필수적으로 씁니다.

```typescript
// 배열 합치기
let arr1 = [1, 2];
let arr2 = [3, 4];
let combinedArr = [...arr1, ...arr2]; // [1, 2, 3, 4]

// 객체 복사하면서 새로운 속성 추가/덮어쓰기
let user = { name: "앨리스", age: 20 };
let updatedUser = { 
  ...user,      // user 객체 내용물(name, age) 쏟아붓기
  age: 21,      // 덮어쓰기
  city: "Seoul" // 새로 추가 
};
// updatedUser: { name: "앨리스", age: 21, city: "Seoul" }
```

---

## 7. 기다려주기 (비동기: async / await)

웹 개발에서는 서버에서 데이터를 가져올 때 시간이 걸립니다. 코드가 무턱대고 바로 다음 줄을 실행하지 않고 **데이터가 다 올 때까지 잠시 기다리게** 만드는 주문이 바로 `async`와 `await`입니다.

```typescript
// 함수 앞에 async를 붙이면 내부에서 await 주문을 쓸 수 있습니다.
async function fetchUser() {
  console.log("데이터 요청 중...");
  
  // 서버에 요청하고 응답이 올 때까지 여기서 멈추고 기다립니다.
  let response = await fetch('https://api.example.com/user');
  let userData = await response.json(); // 응답을 변환할 때도 기다림
  
  console.log("완료:", userData);
}
```

---

## 8. 제네릭 (Generic: `< >`)

초기값이 빈 배열(`[]`)이거나 아직 정해지지 않은 값(`null`)이라면 들어올 타입을 완벽히 파싱하지 못하고 TypeScript가 혼란스러워합니다.

이때 꺾쇠 `< >`를 이용해 **제네릭(Generic)**이라는 힌트를 던져줍니다. "당장 비어있지만 나중에 이거 들어갈 거야!" 라는 뜻입니다.

```typescript
interface Todo { 
  id: number; 
  text: string; 
}

// 빈 배열이지만 앞으로 Todo 객체들이 줄줄이 들어올 거다!
let todos: Array<Todo> = [];

// 문자열이거나 아예 데이터가 없을 수도(null) 있을 때 둘 모두 허용
let filterWord: string | null = null;
```

---

## 9. 타입 추론 (Type Inference)

우리가 모든 변수에 일일이 `: string`, `: number` 같은 타입 힌트를 적어주지 않아도, 초깃값이 존재한다면 TypeScript가 똑똑하게 타입을 스스로 유추(Inference)합니다.

```typescript
let title = "웹 개발 기초"; // 초깃값이 문자열이므로 title은 자동 string 처리
// title = 100;         // <- 여기서 에러 발생! 숫자 넣으면 안 됨 
```

단, "이 변수가 미래에 `null`이 될 수도 있다"는 것은 TypeScript가 초깃값만 보고는 완벽히 알 수 없습니다.
만약 처음에 문자열을 넣었지만 나중에 `null`로 비워둘 수도 있는 변수라면, 우리가 직접 **유니언 타입(Union Type: A 또는 B)**으로 명시해주어야 합니다.

```typescript
let titleOrNull: string | null = "웹 개발 기초";
titleOrNull = null; // 이제는 에러가 나지 않습니다.
```

프레임워크나 외부 라이브러리에서 가져온 데이터를 다룰 때도 이 추론 덕분에, 우리가 만든 코드가 아니라 외부 코드더라도 데이터 형태가 미리 정의되어 있으면 TypeScript가 유기적으로 오류를 검증해줍니다.

---

## 🎯 다음 단계

축하합니다! 이제 "타입, 변수, 객체, 함수"가 무엇인지 감을 잡으셨습니다. 완벽히 이해하지 못해도 걱정하지 마세요. 코드를 치다 보면 자연스럽게 익숙해집니다.

이제 이 튼튼한 토대(TypeScript) 위에서 본격적으로 UI 프레임워크를 배워봅시다!

[02-svelte-basics.md](./02-svelte-basics.md) →
