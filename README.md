## 실행방법

1. `npm install`
2. `npm start`

# 개발 기록 정리

## 상태관리 라이브러리 선택

상태로 관리할 데이터가 현재 시간 데이터 뿐이다. 무거운 상태 관리 라이브러리는 굳이 필요없다고 생각했다. 상대적으로 크기가 작은 `Zustand, Jotai, Recoil` 중에서 생각해보기로 했다. Context API의 경우 매번 provider로 감싸줘야 하는 점과 감싼 자식 컴포넌트들의 리렌더링 문제가 있기 때문에 제외했다.

**Zustand VS Jotai, Recoil**

일단 크게 store 방식이냐 atomic한 방식이냐에 따라 비교해보았다.

기능 상 변하는 값으로 판단되는 데이터는 "시간 - hour, minute, second"와 변하는 시간에 따라 바뀌는 "시계 침의 각도" 두 개 뿐이다.

여기서 각도는 시간에 따라 계산하여 산출만 해주면 되는 값이기 때문에 결과적으로 관리할 상태는 시간 데이터뿐이다. 상태 관리가 간단하므로 중앙 집중 스토어 방식보다 각각의 저장소를 가진 atomic한 방식인 Jotai, Recoil 중에서 비교해보기로 했다.

**jotai VS recoil**

결론부터 말하면 Jotai를 선택했고, Recoil보다 좋다고 판단된 이유를 정리해보았다.

- Recoil은 매우 느리게 commmit이 이루어지고 있으며 아직 정식버전도 아닌 experimental 0.7버전이다.
- Jotai의 atom은 Recoil과 다르게 key를 사용하지 않아도 된다. 보일러 플레이트 코드가 조금이라도 줄어들 수 있다.
- Jotai는 Recoil에 비해 `<Provider>`로 감싸지 않고도 사용이 가능하다.
- 빌드 크기: Jotai - 378kb, Recoil - 2.2mb
- Jotai는 TS로, Recoil은 JS로 작성되었기 때문에 Jotai가 더 안정적일 수 있다고 판단했다.

하지만 나는 Recoil을 사용해본 경험이 있다. 그래서 러닝커브를 위해 Recoil을 선택해보는 방안도 생각해보았지만 사용해보지 않은 Jotai에 도전해보고 싶은 마음도 들었다. 결국, Jotai의 장점이 더 크다고 판단되었고, 도전해볼 경험도 될 것 같기 때문에 Jotai를 사용하기로 결정했다.

## 렌더링 최적화

첫번째로, Hand 컴포넌트를 `memo`로 감싸주었다. 그 이유는 Dial 컴포넌트에 hour, minute, second 3개의 Hand 컴포넌트가 렌더링되는데, second 상태가 1초마다 변경되는데 리렌더링될 필요가 없는 hour, minute Hand 컴포넌트가 second Hand와 같이 계속 렌더링되고 있기 때문이다.

두번째로, Dial 컴포넌트를 `memo`로 감싸주었다. 그 이유는, 아날로그 시계에 마우스 Enter와 Leave 이벤트가 감지될 때마다 isMouseOver 상태가 true/false로 바뀌기 때문에 Dial 컴포넌트가 리렌더링이 된다. 그래서 Dial 내의 시침, 분침, 초침 각도가 다시 계산되고 렌더링되는 문제점이 있었다.

하지만 다이얼에 마우스 오버되었다고 해서 시침, 분침, 초침 각도가 다시 계산될 필요가 없다고 생각했다. 마우스가 오버되면 다이얼을 다시 렌더링하기 때문에 hour, minute, second atom 상태를 다시 가져오게 되고 시침, 분침, 초침의 각도도 다시 계산된다.

다음 GIF처럼 빠르게 마우스를 움직일 경우 렌더링에 영향을 주는 것을 볼 수 있다.

![렌더링 영향 gif](https://user-images.githubusercontent.com/63364990/221842749-cce924dd-0f6c-484b-9d62-37678faac668.gif)

그래서 위처럼 렌더링에 영향을 주는 것을 방지하기 위해 Dial 컴포넌트를 `memo`로 감싸 주었다. 또한, 부모 컴포넌트인 App에 정의된 이벤트 함수들을 `useCallback`으로 감싸주면서 메모이제이션을 통해 마우스를 빠르게 움직여도 이벤트 함수가 매번 생성되지 않도록 방지하였다.

### memoization 전

https://user-images.githubusercontent.com/63364990/221842743-14a25df0-f82b-4c8c-aea4-a9f3e17a728c.mov

Dial 컴포넌트가 이벤트 발생마다 렌더링됨을 볼 수 있다.

### memoization 후

https://user-images.githubusercontent.com/63364990/221842752-8bab6355-5b56-43c1-b5f4-3e670324ed7c.mov

Dial 컴포넌트가 이벤트와 상관없이 5초 동안 5번만 렌더링됨을 볼 수 있다.
