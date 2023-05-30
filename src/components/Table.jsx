const Table = () => {
    const row = [0, 1, 2, 3, 4];
    const cell = [0, 1, 2, 3, 4];
    const mineNumber = 10;
    const tableData = [];
    const mineData = [];

    // 0 - 근처 지뢰 없음
    // 1 - 8 - 근처 지뢰가 있는 셀
    // 9 - 지뢰

    // 테이블 초기 세팅
    for (let i = 0; i < row.length; i++) {
        tableData.push(0);
    }

    // 지뢰 심기
    // let mineCount = mineNumber;

    // for (let i = 0; i < tableData.length; i++) {
    //     if (mineCount === 0) break;
    //     // 0 - 9
    //     let randomMineNumber = Math.floor(Math.random() * (row.length * cell.length));

    //     if (tableData[randomMineNumber] === 9) continue;

    //     tableData[randomMineNumber] = 9;
    //     mineCount--;
    // }

    // console.log(tableData);

    return (
        <table>
            <tbody>
                {row.map((item, rowIndex) => {
                    return (
                        <tr>
                            {cell.map((cellItem, cellIndex) => (
                                <td>
                                    {(tableData.length % row.length) + cellIndex}
                                    <br />[{rowIndex}, {cellIndex}]
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
