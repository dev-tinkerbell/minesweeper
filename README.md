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

1. table 세팅
    1. row \* cell 에서 mine 개수만큼 n 번째 array 추출
    2. 2차원 배열로 table에 data 생성<br/>
       cell 마다 랜덤조건을 줘서 지뢰 여부를 확인하려 했지만 그렇게 되면 초반 index에 지뢰가 몰렸다.
    3. n번째에 지뢰는 -1로 심기
2. context API 활용하여 화면구성
    1. tr, td UI 그리기
    2. table에 CODE text 노출
    3. code에 따라 style 설정
3. 지뢰 주위에 숫자 개수 표시
    1. 상단
        1. 상단 좌, 상단, 상단 우
    2. 하단
        1. 하단 좌, 하단, 하단 우
    3. 좌
    4. 우
4. 클릭했을 때 셀변경
    1. open_cell action 생성
    2. 클릭하면 dispatch로 현재 클릭한 셀 OPEDED로 변경 또는 아무변경 없이
    3. 클릭했을 때 현재 cell data 가져오기
    4. 클릭된 cell data에 따라 event 실행

## 참고 코드

https://github.com/jch1223/react_zero/tree/master/8.%EC%A7%80%EB%A2%B0%EC%B0%BE%EA%B8%B0
