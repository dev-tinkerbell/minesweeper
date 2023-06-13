import { createContext, useMemo, useReducer } from 'react';
import Table from './Table';
import Form from './Form';

// code state
// export const CODE = {
//     MINE: -7, // 지뢰
//     NORMAL: -1, // 일반
//     QUESTION: -2, // 물음표
//     FLAG: -3, // 깃발
//     QUESTION_MINE: -4, // 물음표지만 안에 지뢰일 경우
//     FLAG_MINE: -5, // 깃발이지만 안에 지뢰일 경우
//     CLICKED_MINE: -6, // 클릭했는데 지뢰일 경우
//     OPENED: 0, // 열림
// };

export const CODE = {
    MINE: -1, // 지뢰
    NORMAL: 0, // 일반
    FLAG: -2, // 깃발
};

export const TableContext = createContext({
    isStart: false,
    tableData: [],
    notMineCell: 0,
    openedOriginCellCount: 0,
    dispatch: () => {},
});

const initialState = {
    isStart: false,
    tableData: [],
    notMineCell: 0,
    openedOriginCellCount: 0,
};

// 지뢰 심기
const plantMine = (row, cell, mine) => {
    // 2차원 배열로 table에 data 생성
    const data = [];

    for (let i = 0; i < row; i++) {
        const cells = [];
        for (let j = 0; j < cell; j++) {
            cells.push({ info: 0, isOpened: false, isFlag: false });
        }
        data.push(cells);
    }

    // row * cell 에서 mine 개수만큼 n 번째 array 추출
    const array = new Array(row * cell).fill().map((_, i) => i);
    const shuffle = [...array].sort(() => Math.random() - 0.5);
    const minePosition = shuffle.splice(0, mine);

    // n번째에 지뢰는 -1로 심기
    minePosition.forEach((ver) => {
        const rowIndex = Math.floor(ver / cell);
        const cellIndex = ver % cell;
        data[rowIndex][cellIndex].info = -1;

        if (data[rowIndex - 1] !== undefined) {
            // 좌 상
            if (data[rowIndex - 1][cellIndex - 1] !== undefined && data[rowIndex - 1][cellIndex - 1].info !== -1) {
                data[rowIndex - 1][cellIndex - 1].info += 1;
            }
            // 상
            if (data[rowIndex - 1][cellIndex].info !== -1) {
                data[rowIndex - 1][cellIndex].info += 1;
            }
            //  우 상
            if (data[rowIndex - 1][cellIndex + 1] !== undefined && data[rowIndex - 1][cellIndex + 1].info !== -1) {
                data[rowIndex - 1][cellIndex + 1].info += 1;
            }
        }

        if (data[rowIndex + 1] !== undefined) {
            // 좌 하
            if (data[rowIndex + 1][cellIndex - 1] !== undefined && data[rowIndex + 1][cellIndex - 1].info !== -1) {
                data[rowIndex + 1][cellIndex - 1].info += 1;
            }
            // 하
            if (data[rowIndex + 1][cellIndex].info !== -1) {
                data[rowIndex + 1][cellIndex].info += 1;
            }
            //  우 하
            if (data[rowIndex + 1][cellIndex + 1] !== undefined && data[rowIndex + 1][cellIndex + 1].info !== -1) {
                data[rowIndex + 1][cellIndex + 1].info += 1;
            }
        }

        // 좌
        if (data[rowIndex][cellIndex - 1] !== undefined && data[rowIndex][cellIndex - 1].info !== -1) {
            data[rowIndex][cellIndex - 1].info += 1;
        }

        // 우
        if (data[rowIndex][cellIndex + 1] !== undefined && data[rowIndex][cellIndex + 1].info !== -1) {
            data[rowIndex][cellIndex + 1].info += 1;
        }
    });

    return data;
};

// 지뢰가 아닌 cell 개수 체크
const checkOpenedCellCount = (notMineCell, openedCellCount) => {
    // console.log(notMineCell, openedCellCount);
    if (notMineCell !== openedCellCount) return true;

    alert('승리 🎉');
    return false;
};

// action create
export const STATE_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CHANGE_FLAG = 'CHANGE_FLAG';

const reducer = (state, action) => {
    switch (action.type) {
        case STATE_GAME:
            return {
                ...state,
                isStart: true,
                tableData: plantMine(action.row, action.cell, action.mine),
                notMineCell: action.row * action.cell - action.mine,
                openedOriginCellCount: 0,
            };
        case OPEN_CELL:
            return {
                ...state,
                isStart: checkOpenedCellCount(state.notMineCell, action.openedCellCount),
                openedOriginCellCount: action.openedCellCount,
                tableData: action.newTableData,
            };
        case CHANGE_FLAG:
            return {
                ...state,
                tableData: action.newTableData,
            };
        default:
            return state;
    }
};

const MineSweeper = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(
        () => ({
            isStart: state.isStart,
            tableData: state.tableData,
            notMineCell: state.notMineCell,
            openedOriginCellCount: state.openedOriginCellCount,
            dispatch,
        }),
        [state.tableData]
    );

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    );
};

export default MineSweeper;
