import { useContext } from 'react';
import { TableContext, OPEN_CELL } from './MineSweeper';

const Table = () => {
    const { tableData } = useContext(TableContext);
    const { dispatch } = useContext(TableContext);

    const newTableData = [...tableData];

    const openCell = (rowIndex, cellIndex, previousCell) => {
        const cellItem = newTableData[rowIndex] && newTableData[rowIndex][cellIndex];

        // 현재 셀이 undefined라면 리턴
        if (cellItem === undefined) return;
        // 현재 셀이 open이라면 리턴
        if (cellItem.isOpen) return;
        // 현재 셀이 지뢰면 리턴
        if (cellItem.info === -1) return;
        // 이전 셀이 0보다 크다면 리턴
        if (previousCell.info > 0) return;

        cellItem.isOpen = true;
        checkAroundCell(rowIndex, cellIndex, cellItem);
    };

    const checkAroundCell = (rowIndex, cellIndex, cellItem) => {
        // 좌 상
        openCell(rowIndex - 1, cellIndex - 1, cellItem);
        // 상
        openCell(rowIndex - 1, cellIndex, cellItem);
        // 우 상
        openCell(rowIndex - 1, cellIndex + 1, cellItem);
        // 좌
        openCell(rowIndex, cellIndex + 1, cellItem);
        // 우
        openCell(rowIndex, cellIndex - 1, cellItem);
        // 좌 하
        openCell(rowIndex + 1, cellIndex - 1, cellItem);
        // 하
        openCell(rowIndex + 1, cellIndex, cellItem);
        // 우 하
        openCell(rowIndex + 1, cellIndex + 1, cellItem);
    };

    const cellClickHandler = (rowIndex, cellIndex, cellItem) => {
        if (cellItem.isOpen) return;

        cellItem.isOpen = true;

        if (cellItem.info === -1) alert('펑');
        if (cellItem.info === 0) checkAroundCell(rowIndex, cellIndex, cellItem);

        dispatch({ type: OPEN_CELL, newTableData });
    };

    return (
        <table>
            <tbody>
                {tableData.map((item, rowIndex) => {
                    return (
                        <tr key={rowIndex}>
                            {tableData[rowIndex].map((cellItem, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className={cellItem.isOpen ? 'open' : ''}
                                    onClick={() => cellClickHandler(rowIndex, cellIndex, cellItem)}
                                >
                                    {/* {cellItem.info > 0 && cellItem.info} */}
                                    {cellItem.info === -1 && '💣'}
                                    {cellItem.isOpen && cellItem.info !== 0 && cellItem.info}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;
