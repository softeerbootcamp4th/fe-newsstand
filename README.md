# 소개

- React를 흉내낸 SPA 프레임워크

## 용어 소개

- `렌더러`: 렌더링 담당
    - 렌더 → 커밋은 알죠?
- `element`: Element
- `component`: Custom Component

# 예제

```tsx
export const App = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  return cc(Div, {
    children: [
      cc(H1, { children: [`Count: ${count}`] }),
      cc(Button, { onClick: increment, children: ["Increment"] }),
    ],
  });
};
```

- 간단한 카운터 예제

# 컴포넌트, 엘리먼트 생성

## 첫 시도 실패

```tsx
export const App = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  return Div({
    children: [
      H1({
        children: [`Count: ${count}`],
      }),
      Button({
        onClick: increment,
        children: ["Increment"],
      }),
    ],
  });
};
```

- 처음 코드와 동일한 카운터 예제입니다.
- 위 코드는 다음과 같은 잠재적인 문제점을 가지고 있습니다.
    - 렌더러의 동작 이전에 이미 모든 함수가 실행되어 렌더링이 완료됩니다.
    - 그렇기에 전체 컴포넌트 트리는 변하지 않으면서 한번이라도 실행된 `hook`은 항상 해당 순서에 실행될 것을 보장해야 했습니다.
    - 왜 그럴까요?
        
        흔히 `useState`의 구현을 위해서는 외부에 상태와 그 컴포넌트의 고유한 키를 기록해놓고 해당 키로 접근하는 방식으로 구현합니다. 그러나 여기서는 컴포넌트의 동작을 프록싱하거나 외부에서의 개입 없이 동작하기에(렌더러에서 렌더링하지 않음) 고유한 키 없이 단순 인덱스로 접근해야 합니다.
        
        해당 방식에 대해서는 https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Make-useSate-hook/ 에 잘 설명되어 있습니다.
        
- 이는 동적인 컴포넌트의 구현을 불가능하게 했습니다(조건부 렌더링, 데이터 길이에 따른 가변 렌더링 등)

## 리액트의 사례

```tsx
import React from 'react';

function App() {
  return <h1>Hello World</h1>;
}

import {jsx as _jsx} from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { children: 'Hello world' });
}
```

- 리액트는 jsx를 파싱해 아래와 같은 형태로 변경합니다.
- 이렇게하는 이유는 함수형 컴포넌트의 실행 타임(렌더링 타임)을 렌더러에서 조절하기 위해서 인 것으로 추측됩니다.
- 이렇게 한다면 함수형 컴포넌트의 실행을 렌더러에서 진행할 수 있고, 함수의 이름 혹은 주소로 고유한 키를 생성 가능하겠죠?

## 현재 사례

- 저는 jsx 분석을 위한 기능을 만들기가 어려웠으므로 애초에 파싱된 형태로 컴포넌트를 구축하자라는 생각을 가지고 있었습니다.

```tsx
function cc<T extends HTMLElement>(
  render: AppElement<T>,
  props: AppElementProps<T>,
): CreatedAppElement<T>;

function cc<P, R>(
  render: AppComponent<P, R>,
  props: P,
): CreatedAppComponent<P, R>;
// 사용
cc(Button, { onClick: increment, children: ["Increment"] })
```

- `cc` 함수는 다음과 같이 정의됩니다.
    - 제네릭 추론에 타입 선언을 의존하고 있기에 `<T>, <P>, <R>`과 같은 제네릭은 채워주지 않아도 됩니다.
- `cc` 함수의 첫번째 인자로는 `Element` 혹은 `Component`가 들어갑니다.
- `cc` 함수의 두번째 인자로는 첫번째 인자에 제공해 줄 `props`가 들어갑니다.

### cc 함수의 역할은?

```tsx
export interface CreatedAppComponent<P = object, R = object> {
  render: (
    props: P,
  ) =>
    | CreatedAppComponent<R>
    | CreatedAppElement
    | string
    | number
    | false
    | null;
  props: P;
  renderName: string;
}
export type CreatedAppElement<T extends HTMLElement = HTMLElement> = {
  element: T;
  eventListeners: Map<string, EventListener>;
  children?: AppChild[];
};
```

- 이 2가지 중 하나를 리턴하게 됩니다.
- `Element`의 경우 이벤트 리스너 및 children을 제외한 나머지 props를 적용시켜 element를 만들고 리턴합니다.
- `Component`의 경우 `render` 함수와 `props` 그리고 함수의 이름(키 생성 용)을 기록합니다.
    - 추후 렌더러는 이 `render` 함수에 `props`를 집어넣어 컴포넌트를 렌더링합니다.

### 컴포넌트-엘리먼트 트리 구축 및 diffingCommit

- 렌더러에서 루트 컴포넌트부터 실행해 엘리먼트 트리를 구축합니다.
- 완성된 엘리먼트 트리를 실제 DOM과 비교해 변경된 부분만 반영합니다.

# 컴포넌트 별로 고유한 키 생성 예제

- 현재 저의 코드에는 적용되지 않았지만(현재는 함수 이름으로 생성) 이상적인 방법이라고 생각해 소개합니다.

## WeakMap

```tsx
const weakMap = new WeakMap();

const a = () => {
  console.log("a");
};

const b = (func: () => void) => {
  return {
    c: func,
  };
};

const c = b(a);

weakMap.set(a, "a");
weakMap.set(c.c, "c");
console.log(weakMap); // 항목 1개 -> "c"
```

- JS에서는 `WeakMap` 자료 구조를 통해 간접적으로 메모리 주소에 접근이 가능합니다.
- 컴포넌트는 한번 생성되면 주소가 변하지 않으므로 이 `WeakMap`을 통해 고유한 키 값을 기록합니다.

## Using WeakMap

```tsx
const weakMap = new WeakMap();
const usedKeys = new Set();
function randomKey() {
  let key = Math.random().toString(36).slice(2);
  while (usedKeys.has(key)) {
    key = Math.random().toString(36).slice(2);
  }
  return key;
}

export function genKey(app: AppComponent) {
  const key = randomKey();
  usedKeys.add(key);
  weakMap.set(app, key);
  return key;
}
```

- 이렇게 `WeakMap`을 사용해 각 컴포넌트 별로 고유한 키를 생성 가능합니다.
- 그러나 이런 방식에는 한계가 있습니다. 하나의 컴포넌트가 여러번 사용될 경우 키가 중복될 수 있습니다.

## With ParentKey

```tsx
export const CurrentNews = () => {
  return cc(Div, {
    className: styles.container,
    children: [
      cc(RollingNews, {
        delayed: false,
      }),
      cc(RollingNews, {
        delayed: true,
      }),
    ],
  });
};

// CurrentNews가 루트 컴포넌트라면
// CurrentNews의 key는 'CurrentNews의 키'
// 첫번째 RollingNews의 key는 'CurrentNews의 키'-'RollingNews의 키'[0]
// 두번째 RollingNews의 key는 'CurrentNews의 키'-'RollingNews의 키'[1]
```

- 이때 부모의 키와 자식의 상대적인 인덱스를 기록해 중복이 불가능하게 합니다.
- 이러한 방식을 사용하면 컴포넌트 트리 내부에서 중복되지 않는 고유한 키를 각 컴포넌트마다 가질 수 있습니다.

### Element Key는?

- 이를 조금 더 응용해서 각 컴포넌트 내부의 엘리먼트의 상대적인 위치를 비슷하게 계산함으로써 각 엘리먼트를 위한 키도 생성이 가능합니다.

```tsx
export const AppHeader = () => {
  return cc(Div, {
    className: styles.container,
    children: [
      cc(Span, {
        className: styles["sub-container"],
        children: [
          Raw(NewspaperIcon),
          cc(H1, {
            className: typoStyles["display-bold24"],
            children: ["뉴스스탠드"],
          }),
        ],
      }),
      cc(Span, {
        className: `${styles.date} ${typoStyles["display-medium16"]}`,
        children: [formatHeaderDate(new Date())],
      }),
    ],
  });
};
// AppHeader가 루트 컴포넌트라면
// Div의 키는 `AppHeader의 키`_`Div`[0]
// Span의 키는 `AppHeader의 키`_Div[0]_Span[0]
// H1의 키는 `AppHeader의 키`_Div[0]_Span[0]_H1[1]
```

- 이 키는 이벤트 리스너 등록에 유용하게 사용합니다.

## 사용하기

- 그렇다면 이를 사용해서 어떻게 `useState`를 개선하는지 알아보자.

```tsx
import {
  currentKey,
  render,
} from "../core";
import { useCallback } from "./useCallback";

export const statesMap = new Map<string, Array<unknown>>();
export const stateIdxMap = new Map<string, number>();
type Updater<T> = ((prev: T) => T) | T;
export const useState = <T>(initialState: T) => {
	// currentKey = 현재 렌더링 중인 함수의 키.
  if (!stateIdxMap.has(currentKey)) {
    stateIdxMap.set(currentKey, 0);
  }
  if (!statesMap.has(currentKey)) {
    statesMap.set(currentKey, []);
  }
  const stateIdx = stateIdxMap.get(currentKey)!;
  const states = statesMap.get(currentKey)!;
	// 해당 훅의 위치에 상태가 없다면 초기 상태 추가
  if (stateIdx >= states.length) {
    states.push(initialState);
  }
  // 함수형 혹은 갱신된 값으로 state를 업데이트 한다.
  const setState = useCallback((updater: Updater<T>) => {
    const newState =
      typeof updater === "function"
        ? (updater as (prev: T) => T)(states[stateIdx] as T)
        : updater;
    states[stateIdx] = newState;
    // 상태 갱신 이후 렌더링 트리거
    render();
  }, []);
  stateIdxMap.set(currentKey, stateIdx + 1);
  return [states[stateIdx], setState] as [T, (updater: Updater<T>) => void];
};
```

- 렌더러는 컴포넌트의 렌더링 전, 해당 컴포넌트의 고유한 `key`를 전역 변수 `currentKey`에 넣는다.
- 해당 컴포넌트는 실행된다(렌더링 된다.)
    - 컴포넌트 내부에서 훅의 순서는 항상 동일하다(위에서부터 아래로 실행, 훅은 조건부 실행 허용 X)
- 그러므로 해당 훅의 순서를 통해 훅의 고유한 상태(혹은 콜백 등)을 얻을 수 있다.
- 나머지 `callback`이나 `effect` 역시 해당 방식을 잘 응용하면 됩니다.

# 이벤트 리스너

- 이벤트 리스너는 `루트 엘리먼트(#app)`에서 모든 이벤트를 관리하는 방식으로 이용합니다.

## 전역 이벤트 리스너

```tsx
export const eventMap = new Map<string, Map<string, EventListener>>();

class AppEvent extends Event {
  isPropagationStopped = false;
  constructor(type: string, e: EventInit, target: HTMLElement | null) {
    super(type, e);

    Object.defineProperty(this, "target", {
      value: target,
      writable: true,
    });
    Object.defineProperty(this, "target", {
      writable: true,
    });
  }

  stopPropagation() {
    super.stopPropagation();
    this.isPropagationStopped = true;
  }
}

const rootEventHandler = (e: Event | AppEvent) => {
  const target = e.target as HTMLElement;
  const handler = eventMap.get(target.getAttribute("key") ?? "")?.get(e.type);

  if (handler == null) {
    if (
      (e as AppEvent).isPropagationStopped === true ||
      target.parentElement == document.body
    ) {
      return;
    }
    rootElement?.dispatchEvent(new AppEvent(e.type, e, target.parentElement));
    return;
  }
  handler(e);
};
export const addRootEvent = (element: HTMLElement) => {
  EventNameMaps.forEach((value) => {
    element.addEventListener(value, rootEventHandler);
  });
};

```

- 우선 루트 컴포넌트에서는 모든 이벤트에 대해 리스너를 등록한다.
- 이후 이벤트가 발생하면 `target`을 부모로 옮겨가며 최상단까지 다시 이벤트를 발생시킨다(버블링)
- 모든 이벤트 리스너는 엘리먼트의 고유한 `key`로 맵에 기록되어 있으므로 `key`를 통해 target에 등록된 이벤트 리스너가 존재할 경우 실행시킨다.

## 이벤트 리스너 해제

- 특정 엘리먼트가 커밋 과정에서 사라질 경우, 해당 엘리먼트의 이벤트 리스너를 맵에서 제거해주면 됩니다.

## 이벤트 리스너 갱신

- 렌더링 과정에서 이벤트 리스너를 덮어 씌우면 됩니다.