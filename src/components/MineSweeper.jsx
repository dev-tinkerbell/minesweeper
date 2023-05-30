import { createContext, useMemo, useReducer } from 'react';
import Table from './Table';
import Form from './Form';

// code state
export const CODE = {
    MINE: -7, // 지뢰
    NORMAL: -1, // 일반
    QUESTION: -2, // 물음표
    FLAG: -3, // 깃발
    QUESTION_MINE: -4, // 물음표지만 안에 지뢰일 경우
    FLAG_MINE: -5, // 깃발이지만 안에 지뢰일 경우
    CLICKED_MINE: -6, // 클릭했는데 지뢰일 경우
    OPENED: 0, // 열림
};

const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
});

const initialState = {
    tableData: [],
};

// 지뢰 심기
const plantMine = (row, cell, mine) => {
    const candidate = Array(row * cell)
        .fill()
        .map((arr, i) => i);
    const shuffle = [];

    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    // 테이블 기본 세팅
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);

        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    // 테이블에 지뢰 심기
    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
};

plantMine(5, 5, 9);

// action create
export const STATE_GAME = 'START_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case STATE_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
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
