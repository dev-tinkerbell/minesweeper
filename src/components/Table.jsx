import { useContext } from 'react';
import { TableContext, OPEN_CELL } from './MineSweeper';

const Table = () => {
    const { tableData } = useContext(TableContext);
    const { dispatch } = useContext(TableContext);

    const cellClickHandler = (cellItem, rowIndex, cellIndex) => {
        if (cellItem.isOpen) return;

        const newTableData = [...tableData];

        switch (cellItem.info) {
            case -1:
                alert('펑');
            default:
                newTableData[rowIndex][cellIndex].isOpen = true;
                dispatch({ type: OPEN_CELL, newTableData });
        }
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
                                    onClick={() => cellClickHandler(cellItem, rowIndex, cellIndex)}
                                >
                                    {cellItem.info !== 0 && cellItem.info}
                                    {/* {cellItem.isOpen && cellItem.info !== 0 && cellItem.info} */}
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
