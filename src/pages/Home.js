import { Button, Container, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';




const columns = [
    {
        name: 'STT',
        selector: row => row.stt,
        sortable: true,
        reorder: true
    },
    {
        name: 'CIF',
        selector: row => row.cif,
        sortable: true,
        reorder: true
    },
    {
        name: 'Tên khách hàng',
        selector: row => row.tenkh,
        sortable: true,
        reorder: true
    },
    {
        name: 'Ngày sinh',
        selector: row => row.birthday,
        sortable: true,
        reorder: true
    },
    {
        name: 'Giới tính',
        selector: row => row.gender,
        sortable: true,
        reorder: true
    },
    {
        name: 'Số dư huy động BQ',
        selector: row => row.soduhd,
        sortable: true,
        reorder: true
    },
    {
        name: 'Số dư tiền vay BQ',
        selector: row => row.sodutv,
        sortable: true,
        reorder: true
    },
    {
        name: 'Danh sách thanh toán thẻ',
        selector: row => row.dstt,
        sortable: true,
        reorder: true
    },
    {
        name: 'Phí bảo hiểm nhân thọ/năm',
        selector: row => row.bhnt,
        sortable: true,
        reorder: true
    },
    {
        name: 'Điểm quy đổi',
        selector: row => row.diemquydoi,
        sortable: true,
        reorder: true
    },
    {
        name: 'Hạng',
        selector: row => row.hang,
        sortable: true,
        reorder: true
    },
];
const mockData = [
    {
        stt: 1,
        cif: "123456",
        tenkh: "NGUYEN VAN A",
        birthday: "1/1/70",
        gender: "NAM",
        soduhd: 650000,
        diemquydoi: "0",
        hang: "CLASSIC"
    },
    {
        stt: 2,
        cif: "123777",
        tenkh: "NGUYEN THI B",
        birthday: "15/01/1969",
        gender: "NU",
        soduhd: 1254346000,
        bhnt: 25000000,
        diemquydoi: 9,
        hang: "GOLD"
    },
    {
        stt: 3,
        cif: "123778",
        tenkh: "NGUYEN THI C",
        birthday: "13/02/1985",
        gender: "NU",
        soduhd: 1254,
        diemquydoi: 0,
        hang: "CLASSIC"
    },
    {
        stt: 4,
        cif: "444888",
        tenkh: "NGUYEN XUAN D",
        birthday: "12/12/03",
        gender: "NAM",
        soduhd: 300552333,
        sodutv: 500000000,
        diemquydoi: 3,
        hang: "CLASSIC"
    },
    {
        stt: 5,
        cif: "888999",
        tenkh: "HUYNH THI E",
        birthday: "2/3/69",
        gender: "NU",
        soduhd: 6000548999,
        dstt: 154555666,
        diemquydoi: 38,
        hang: "SIGNATURE"
    },
    {
        stt: 6,
        cif: "111444",
        tenkh: "LE VAN F",
        birthday: "20/10/1979",
        gender: "NAM",
        soduhd: 25444666,
        sodutv: 3050000000,
        diemquydoi: 10,
        hang: "GOLD"
    },
    {
        stt: 7,
        cif: "124885",
        tenkh: "TRAN VAN G",
        birthday: "26/11/1983",
        gender: "NAM",
        soduhd: 250003444,
        diemquydoi: 1,
        hang: "CLASSIC"
    },
    {
        stt: 8,
        cif: "666777",
        tenkh: "LE THI THANH H",
        birthday: "13/02/2000",
        gender: "NU",
        soduhd: 125000000,
        sodutv: 1050000000,
        bhnt: 20000000,
        diemquydoi: 6,
        hang: "SILVER"
    },
    {
        stt: 9,
        cif: "456789",
        tenkh: "HO THI I",
        birthday: "25/08/1954",
        gender: "NU",
        soduhd: 40123,
        bhnt: 30000000,
        diemquydoi: 3,
        hang: "CLASSIC"
    },
    {
        stt: 10,
        cif: "963852",
        tenkh: "TRAN XUAN K",
        birthday: "30/02/1984",
        gender: "NAM",
        soduhd: 35000444,
        bhnt: 80000000,
        diemquydoi: 8,
        hang: "GOLD"
    },
    {
        stt: 11,
        cif: "456321",
        tenkh: "LE THI THU M",
        birthday: "4/4/05",
        gender: "NU",
        soduhd: 5647777,
        dstt: 14222000,
        bhnt: 14000000,
        diemquydoi: 2,
        hang: "CLASSIC"
    },
    {
        stt: 12,
        cif: "789523",
        tenkh: "HUYNH THI XUAN N",
        birthday: "2/8/91",
        gender: "NU",
        soduhd: 1051234600,
        sodutv: 525000000,
        diemquydoi: 7,
        hang: "SILVER"
    },
    {
        stt: 13,
        cif: "852369",
        tenkh: "NGUYEN VAN P",
        birthday: "12/3/65",
        gender: "NAM",
        soduhd: 123456789,
        sodutv: 3000000000,
        dstt: 250000000,
        diemquydoi: 23,
        hang: "SIGNATURE"
    },
    {
        stt: 14,
        cif: "741258",
        tenkh: "LE HOAI G",
        birthday: "15/05/1997",
        gender: "NAM",
        soduhd: 254566776,
        dstt: 25123456,
        bhnt: 13000000,
        diemquydoi: 4,
        hang: "CLASSIC"
    },
    {
        stt: 15,
        cif: "963123",
        tenkh: "NGUYEN THI LE B",
        birthday: "10/5/01",
        gender: "NU",
        soduhd: 45001459,
        sodutv: 400000000,
        bhnt: 12000000,
        diemquydoi: 3,
        hang: "CLASSIC"
    },
    {
        stt: 16,
        cif: "789654",
        tenkh: "VAN THI MAI S",
        birthday: "13/02/1991",
        gender: "NU",
        soduhd: 34001459,
        sodutv: 2500000000,
        dstt: 75123456,
        diemquydoi: 12,
        hang: "PLATINUM"
    },
    {
        stt: 17,
        cif: "159753",
        tenkh: "HOANG VAN X",
        birthday: "20/01/1992",
        gender: "NAM",
        soduhd: 111111111,
        sodutv: 222222222,
        bhnt: 33333333,
        diemquydoi: 5,
        hang: "SILVER"
    },
    {
        stt: 18,
        cif: "852654",
        tenkh: "VO THI THANH V",
        birthday: "30/04/1976",
        gender: "NU",
        soduhd: 456789789,
        sodutv: 789456123,
        diemquydoi: 5,
        hang: "SILVER"
    },
    {
        stt: 19,
        cif: "778899",
        tenkh: "TRAN THI MY LINH",
        birthday: "10/2/94",
        gender: "NU",
        soduhd: 3000888999,
        sodutv: 0,
        dstt: 500478999,
        bhnt: 100000000,
        diemquydoi: 50,
        hang: "SIGNATURE"
    },
    {
        stt: 20,
        cif: "789789",
        tenkh: "HUYNH THI NHU HA",
        birthday: "12/12/91",
        gender: "NU",
        soduhd: 300777999,
        sodutv: 5622777888,
        dstt: 200777999,
        bhnt: 100000000,
        diemquydoi: 40,
        hang: "SIGNATURE"
    },
];
const data = [

    {
        stt: 1,
        cif: 'Beetlejuice',
        tenkh: '1988',
        birthday: '',
        gender: '',
        soduhd: '',
        sodutv: '',
        dstt: '',
        bhnt: '',
        diemquydoi: '',
        hang: ''
    },
    {
        stt: 2,
        cif: 'Ghostbusters',
        tenkh: '1984',
        birthday: '',
        gender: '',
        soduhd: '',
        sodutv: '',
        dstt: '',
        bhnt: '',
        diemquydoi: '',
        hang: ''
    },
]

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <TextField
            id="search"
            type="text"
            placeholder="Filter By Name"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
        <Button type="button" onClick={onClear}>
            X
        </Button>
    </>
);


// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
        let ctr = 0;
        keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];

            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
}


function Home() {
    const [currentRows, setCurrentRows] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = mockData.filter(
        item => item.tenkh && item.tenkh.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);


    const handleChange = ({ selectedRows }) => {
        console.log(selectedRows);
        setCurrentRows(selectedRows);
        console.log(currentRows);

    };
    useEffect(() => { // this hook will get called everytime when myArr has changed
        // perform some action which will get fired everytime when myArr gets updated
        console.log('Updated State', currentRows)
    }, [currentRows])


    // Toggle the state so React Data Table changes to clearSelectedRows are triggered
    const handleClearRows = () => {
        setToggleClearRows(!toggledClearRows);
    }


    const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export</Button>;
    const actionsMemo = (<><Export onExport={() => { console.log(currentRows); downloadCSV(currentRows) }} /> <Button onClick={handleClearRows}>
        Clear Selected Rows
    </Button> </>);


    return (
        <>
            <Container maxWidth="xl">
                <DataTable
                    title="Arnold Movies"
                    columns={columns}
                    data={filteredItems}
                    selectableRows
                    onSelectedRowsChange={handleChange}
                    clearSelectedRows={toggledClearRows}
                    onColumnOrderChange={cols => console.log(cols)}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    actions={actionsMemo}
                    noContextMenu={true}
                    pagination
                />
            </Container>
        </>
    );
};

export default Home;