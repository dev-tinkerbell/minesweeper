# 지뢰찾기

## 규칙

지뢰: 💣
플래그: 🚩

```js
CODE = {
    MINE: -7, // 지뢰
    NORMAL: -1, // 일반
    QUESTION: -2, // 물음표
    FLAG: -3, // 깃발
    QUESTION_MINE: -4, // 물음표지만 안에 지뢰일 경우
    FLAG_MINE: -5, // 깃발이지만 안에 지뢰일 경우
    CLICKED_MINE: -6, // 클릭했는데 지뢰일 경우
    OPENED: 0, // 열림
};
```

-   게임의 목표는 보드에 있는 모든 지뢰를 찾는 것입니다.
-   딩신이 셀을 클릭하여 지뢰를 찾는다면 게임에서 실패합니다.
-   지뢰가 없는 세포를 클릭하면 세포 주변의 지뢰 수가 표시됩니다.
-   셀을 마우스 오른쪽 버튼으로 클릭하여 플래그를 지정할 수 있습니다.
-   지뢰가 아닌 모든 세포를 오픈하거나 지뢰인 모든 세포에 플래그 표시를 하면 게임에서 승리합니다.

## logic

1.  table 세팅
    1. row \* cell 에서 mine 개수만큼 n 번째 array 추출
    2. 2차원 배열로 table에 data 생성<br/>
       cell 마다 랜덤조건을 줘서 지뢰 여부를 확인하려 했지만 그렇게 되면 초반 index에 지뢰가 몰렸다.
    3. n번째에 지뢰는 -1로 심기
2.  context API 활용하여 화면구성
    1. tr, td UI 그리기
    2. table에 CODE text 노출
    3. code에 따라 style 설정
3.  지뢰 주위에 숫자 개수 표시

    1. 상단 좌, 상단, 상단 우
    2. 하단 좌, 하단, 하단 우
    3. 좌
    4. 우

4.  클릭했을 때 셀 변경

    1. open_cell action 생성
    2. 클릭하면 현재 클릭한 셀 정보 dispatch해서 isOpen: true로 변경 또는 아무변경 없이
    3. 변경된 table 세팅
    4. 0을 클릭했을 때, 주변이 cell 모두 오픈<br/>
       조건 <br/>

        - 현재 셀이 undefined 아니어야함
        - 현재 셀이 isOpen이 아니어야함
        - 현재 셀이 지뢰가 아니어야함
        - 이전 셀이 0보다 크면 안됨

        1. 0을 클릭했을 때, checkAroundCell 함수를 호출하여 좌상, 상, 우상, 좌, 우, 좌하, 하, 우하를 탐색(openCell호출)한다.
        2. openCell 함수를 통해 cell open 여부를 따진다.
            1. 조건에 일치한다면 checkAroundCell 호출한다.

5.  우클릭 시

    조건

    -   opened면 우클릭 X

    1.  클릭한 cell flag true 변환 후 newTable dispatch
    2.  flag 표시
    3.  좌클릭 X
    4.  우클릭 두번한다면 원래 상태로 돌아오기

6.  지뢰가 아닌 cell 을 모두 오픈하면 게임 승리

    조건

    -   오픈하지 않은 cell 개수 === mine 개수
    -   오픈하지 않은 cell 개수 + 플래그 개수 === mine개수

    openedCellCount 전역과 지역변수가 필요

    -   전역이 필요한 이유 - 게임이 리셋됐을 때 필요
    -   지역이 필요한 이유 - 테이블 컴포넌트에서 클릭된 셀 확인 할때 필요

[TODO]

-   [ ] 지뢰찾기 개수 제한
-   [ ] 게임 완료 후 클릭 X

## 참고 코드

https://github.com/jch1223/react_zero/tree/master/8.%EC%A7%80%EB%A2%B0%EC%B0%BE%EA%B8%B0
