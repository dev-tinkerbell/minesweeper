import { useContext, useState, useRef, useEffect } from 'react';
// import { useEffect, useState, memo, useMemo, useTransition, useCallback } from 'react';
import { TableContext, OPEN_CELL, CHANGE_FLAG } from './MineSweeper';

const Table = () => {
    const { tableData, dispatch, openedGlobalCellCount } = useContext(TableContext);
    const newTableData = [...tableData];
    const openedCellCount = useRef(openedGlobalCellCount);

    useEffect(() => {
        if (openedGlobalCellCount === 0) {
            openedCellCount.current = 0;
        }
    }, [openedGlobalCellCount]);

    const openCell = (rowIndex, cellIndex, previousCell) => {
        const cellItem = newTableData[rowIndex] && newTableData[rowIndex][cellIndex];

        // 현재 셀이 undefined라면 리턴
        if (cellItem === undefined) return;
        // 현재 셀이 open이라면 리턴
        if (cellItem.isOpened) return;
        // 현재 셀이 지뢰면 리턴
        if (cellItem.info === -1) return;
        // 이전 셀이 0보다 크다면 리턴
        if (previousCell.info > 0) return;

        cellItem.isOpened = true;
        cellItem.isFlag = false;
        openedCellCount.current += 1;

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

    const leftClickHandler = (rowIndex, cellIndex, cellItem) => {
        if (cellItem.isOpened || cellItem.isFlag) return;

        cellItem.isOpened = true;
        openedCellCount.current += 1;

        if (cellItem.info === -1) alert('실패 😂');
        if (cellItem.info === 0) checkAroundCell(rowIndex, cellIndex, cellItem);

        dispatch({ type: OPEN_CELL, newTableData, openedCellCount: openedCellCount.current });
    };

    const rightClickHandler = (e, cellItem) => {
        e.preventDefault();
        if (cellItem.isOpened) return;

        cellItem.isFlag = !cellItem.isFlag;
        dispatch({ type: CHANGE_FLAG, newTableData });
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
                                    className={cellItem.isOpened ? 'open' : ''}
                                    onClick={() => leftClickHandler(rowIndex, cellIndex, cellItem)}
                                    onContextMenu={(e) => rightClickHandler(e, cellItem)}
                                >
                                    {cellItem.isOpened && cellItem.info > 0 && cellItem.info}
                                    {cellItem.isOpened && cellItem.info === -1 && '💣'}
                                    {/* {cellItem.info === -1 && '💣'} */}
                                    {/* {cellItem.isOpened && cellItem.info !== 0 && cellItem.info} */}
                                    {cellItem.isFlag && '🚩'}
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
