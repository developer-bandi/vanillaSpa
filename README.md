# vanilla Spa

vanilla javascript 와 webpack, babel 을 이용하여 react 와 유사한 spa 어플리케이션을 구현하였습니다. 만들어진 코드의 기능을 대부분 사용하는 간단한 todolist 어플리케이션을 구동해볼수 있습니다.

## 1. 실행 방법

- npm i 를 입력하여 패키지 파일을 설치합니다
- npm start 를 입력하면 webpack dev server가 실행되면서 브라우저로 자동으로 이동합니다
- 홈 화면의 일정관리로 이동하기를 누르면 todolist로 이동할수 있습니다
- 일정관리 화면에서는 텍스트를 입력하여 추가, 삭제 를 할수 있고 상단의 홈으로 이동하기로 페이지가 이동되더라도 정보가 유지됩니다

## 2. 라이브러리별 소개

### react

react는 함수형 컴포넌트를 기반으로 구현하였습니다. 따라서 useState와 render 함수가 핵심입니다.

useState의 경우 react 와 유사하게 상태값과 상태값 변경함수를 반환하며, 상태값 변경함수로 변경해야만 리렌더링이 되어 데이터가 변경됩니다. 이때 값이 같으면 렌더링하지 않습니다. 또한 리액트에서 처럼 16ms내에 변경된 사항은 일괄적으로 렌더링 됩니다.

render 함수는 객체로 표현된 dom을 실제 dom에 적용해 주는 함수입니다. 이때 이전 dom이 없는경우 새로운 돔을 생성하여 연결해 주지만, 이전 dom 이 있는 경우 재귀적으로 자식노드를 비교하여 변경된 노드만 변경합니다.

### redux

redux의 경우 옵저버 패턴과 flux 패턴을 결합하여 만들어 졌습니다. 하지만, 제가 만든 코드는 리렌더링시 해당하는 컴포넌트와 그 하위 자식만 비교하는것이 아니라, 루트 컴포넌트부터 전부 비교하기 때문에 옵저버 패턴을 적용하지는 않았고, flux 패턴만 지키려고 노력하였습니다.

뷰에서 직접 스토어에 저장된 데이터를 변경할수 없고, 반드시 dispatch로 해당 액션을 보내주면, 이에 맞는 리듀서가 실행되어서 스토어의 데이터를 변경하게 됩니다. 변경되면 리덕스의경우 변경사실을 구독중인 컴포넌트에 통지하지만, 그러지 않고, 전체 컴포넌트를 렌더링함으로써 변화를 반영합니다. 뷰에서 데이터를 가져오는 useSelect함수는 스토어의 데이터를 단순히 가져오는 역할을 하게 됩니다.

### router

react-router-dom과 유사하게 만들었습니다. 핵심은 a태그의 이벤트를 막고 새로운 컴포넌트를 렌더링 하는것과, history객체를 이용해 이동한 주소를 스택에 쌓아서 뒤로가기시에도 원활하게 작동하도록 하는것입니다.

바벨을 이용하여 jsx를 변환하여 사용하고 있기에, 함수를 컴포넌트에 적용하였습니다. Routes 함수는 라우터를 세팅하고, 현재 렌더링해야할 컴포넌트를 반환하는 함수이고, Route함수는 경로와 컴포넌트를 router 객체에 저장해 두는 함수입니다.

Link 함수는 컴포넌트 형태로 사용하면 a태그이지만, data-link라는 속성을 가지게 되어서, 이벤트 발생시 기존의 a태그 이벤트를 막고 주소만 변환하면서 해당 경로에 맞는 컴포넌트를 렌더링 하는 이벤트를 발생시킵니다. 이때, navigateTo라는 함수가 실행되는데, 해당함수가 렌더링과 history객체를 이용하여 주소를 스택에 넣거나 혹은 대체하는 방식입니다.

## 참고자료

- https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/
- https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Store/#_1-중앙-집중식-상태관리
- https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Virtual-DOM/
- https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Make-useSate-hook/
- https://ko.reactjs.org/docs/reconciliation.html
