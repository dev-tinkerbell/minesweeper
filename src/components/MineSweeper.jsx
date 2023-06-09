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
};

export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
});

const initialState = {
    tableData: [],
};

// 지뢰 심기
const plantMine = (row, cell, mine) => {
    // 2차원 배열로 table에 data 생성
    const data = [];

    for (let i = 0; i < row; i++) {
        const cells = [];
        for (let j = 0; j < cell; j++) {
            cells.push({ info: 0, isOpened: false });
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
const checkNotMineCell = (row, cell) => {};

// action create
export const STATE_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';

const reducer = (state, action) => {
    switch (action.type) {
        case STATE_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
            };
        case OPEN_CELL:
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

    const value = useMemo(() => ({ tableData: state.tableData, dispatch }), [state.tableData]);

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
