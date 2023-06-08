import { useContext } from 'react';
import { TableContext } from './MineSweeper';

const Table = () => {
    const { tableData } = useContext(TableContext);

    return (
        <table>
            <tbody>
                {tableData.map((item, rowIndex) => {
                    return (
                        <tr key={rowIndex}>
                            {tableData[rowIndex].map((cellItem, cellIndex) => (
                                <td key={cellIndex} className={cellItem === -1 ? 'mine' : ''}>
                                    {cellItem > 0 && cellItem}
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
