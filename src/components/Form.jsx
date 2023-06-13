import { useCallback, useContext, useState } from 'react';
import { TableContext, STATE_GAME } from './MineSweeper';

const Form = () => {
    const [row, setRow] = useState(5);
    const [cell, setCell] = useState(5);
    const [mine, setMine] = useState(3);
    const { dispatch } = useContext(TableContext);

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    }, []);
    const onChangeCell = useCallback((e) => {
        setCell(e.target.value);
    }, []);
    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    }, []);

    const onClickBtn = useCallback(() => {
        dispatch({ type: STATE_GAME, row, cell, mine });
    }, [row, cell, mine]);

    return (
        <div>
            <label htmlFor='row'>가로 </label>
            <input id='row' type='number' placeholder='세로' value={row} onChange={onChangeRow} />
            <label htmlFor='cell'>세로 </label>
            <input id='cell' type='number' placeholder='가로' value={cell} onChange={onChangeCell} />
            <label htmlFor='mine'>지뢰 </label>
            <input id='mine' type='number' placeholder='지뢰' value={mine} onChange={onChangeMine} />
            <button onClick={onClickBtn}>시작</button>
        </div>
    );
};

export default Form;
