import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { mockData } from "./mockdata";
import { useSelector, useDispatch } from "react-redux";
import { processSelected } from "../redux/selectedItemSlice";
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const options = ["Lịch sử nhận quà"];
const customStyles = {
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF",
    },
  },
  pagination: {
    style: {
      border: "none",
    },
  },
};
const ITEM_HEIGHT = 48;

const FilterComponent = ({
  onFilterMonth,
  onFilterClass,
  onFilterGender
}) => (
  <>
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Tháng sinh</InputLabel>
      <Select onChange={onFilterMonth} label="Tháng sinh">
        <MenuItem value="">Tất cả</MenuItem>
        <MenuItem value={"01"}>01</MenuItem>
        <MenuItem value={"02"}>02</MenuItem>
        <MenuItem value={"03"}>03</MenuItem>
        <MenuItem value={"04"}>04</MenuItem>
        <MenuItem value={"05"}>05</MenuItem>
        <MenuItem value={"06"}>06</MenuItem>
        <MenuItem value={"07"}>07</MenuItem>
        <MenuItem value={"08"}>08</MenuItem>
        <MenuItem value={"09"}>09</MenuItem>
        <MenuItem value={"10"}>10</MenuItem>
        <MenuItem value={"11"}>11</MenuItem>
        <MenuItem value={"12"}>12</MenuItem>
      </Select>
    </FormControl>
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Giới tính</InputLabel>
      <Select onChange={onFilterGender} label="Giới tính">
        <MenuItem value={""}>Tất cả</MenuItem>
        <MenuItem value={"NAM"}>Nam</MenuItem>
        <MenuItem value={"NU"}>Nữ</MenuItem>
      </Select>
    </FormControl>
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Hạng</InputLabel>
      <Select onChange={onFilterClass} label="Hạng">
        <MenuItem value={1}>CLASSIC</MenuItem>
        <MenuItem value={5}>SILVER</MenuItem>
        <MenuItem value={8}>GOLD</MenuItem>
        <MenuItem value={12}>PLATINUM</MenuItem>
        <MenuItem value={15}>SIGNATURE</MenuItem>
      </Select>
    </FormControl>
  </>
);

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(mockData[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
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
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

function Home() {
  const [currentRows, setCurrentRows] = React.useState(false);
  const [toggledClearRows, setToggleClearRows] = React.useState(false);
  const [filterText, setFilterText] = React.useState("");
  const [filterClass, setFilterClass] = React.useState(0);
  const [filterGender, setFilterGender] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [giftHistory, setGiftHistory] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenModal = ({ row }) => {
    console.log(row);
    setGiftHistory(row.lichsu);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  //init column action

  const CustomMaterialMenu = (row) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === "Pyxis"}
              onClick={() => {
                handleClose();
                handleOpenModal(row);
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  };

  //init column

  const columns = [
    {
      name: "STT",
      selector: (row) => row.stt,
      sortable: true,
      reorder: true,
      width: "60px",
    },
    {
      name: "CIF",
      selector: (row) => row.cif,
      sortable: true,
      reorder: true,
    },
    {
      name: "Tên khách hàng",
      selector: (row) => row.tenkh,
      sortable: true,
      reorder: true,
    },
    {
      name: "Ngày sinh",
      selector: (row) => row.birthday,
      sortable: true,
      reorder: true,
    },
    {
      name: "Giới tính",
      selector: (row) => row.gender,
      sortable: true,
      reorder: true,
      width: "100px",
    },
    {
      name: "Số dư huy động BQ",
      selector: (row) => row.soduhd,
      sortable: true,
      reorder: true,
    },
    {
      name: "Số dư tiền vay BQ",
      selector: (row) => row.sodutv,
      sortable: true,
      reorder: true,
    },
    {
      name: "Danh sách thanh toán thẻ",
      selector: (row) => row.dstt,
      sortable: true,
      reorder: true,
    },
    {
      name: "Phí bảo hiểm nhân thọ/năm",
      selector: (row) => row.bhnt,
      sortable: true,
      reorder: true,
    },
    {
      name: "Điểm quy đổi",
      selector: (row) => row.diemquydoi,
      sortable: true,
      reorder: true,
    },
    {
      name: "Hạng",
      selector: (row) => row.hang,
      sortable: true,
      reorder: true,
    }
  ];
  const modalColumns = [
    {
      name: "Sự kiện",
      selector: (row) => row.event,
      sortable: true,
      reorder: true,
    },
    {
      name: "Quà tặng",
      selector: (row) => row.qua,
      sortable: true,
      reorder: true,
    },
  ];

  //
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = mockData.filter((item) => {
    return (
      item.birthday &&
      item.birthday.split("/")[1].includes(filterText) &&
      item.diemquydoi &&
      parseInt(item.diemquydoi) >= parseInt(filterClass) &&
      item.gender &&
      item.gender.toLowerCase().includes(filterGender.toLowerCase())
    );
  });

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilterMonth={(e) => setFilterText(e.target.value)}
        onFilterClass={(e) => {
          setFilterClass(e.target.value);
        }}
        onFilterGender={(e) => {
          setFilterGender(e.target.value);
        }}
        onClear={handleClear}
        filterMonth={filterText}
        filterClass={filterClass}
      />
    );
  }, [filterText, filterClass, resetPaginationToggle]);

  const handleChange = ({ selectedRows }) => {
    console.log(selectedRows);
    setCurrentRows(selectedRows);
    console.log(currentRows);
    dispatch(processSelected(selectedRows));
  };
  useEffect(() => {
    // this hook will get called everytime when myArr has changed
    // perform some action which will get fired everytime when myArr gets updated
    console.log("Updated State", currentRows);
  }, [currentRows]);

  // Toggle the state so React Data Table changes to clearSelectedRows are triggered
  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };

  const Export = ({ onExport }) => (
    <Button
      variant="contained"
      color="success"
      onClick={(e) => onExport(e.target.value)}
    >
      Export
    </Button>
  );
  const actionsMemo = (
    <>
      <Export
        onExport={() => {
          console.log(currentRows);
          downloadCSV(currentRows);
        }}
      />{" "}
    </>
  );
  const onContinue = ()=>{
    if(currentRows.length > 0){
        navigate("/quatangvcb/xacnhan");
    }else{
        alert("Vui lòng chọn khách hàng được nhận quà");
    }
  }

  return (
    <>
      <Container maxWidth="xl">
        <DataTable
          title="Quà tặng khách hàng Vietcombank"
          columns={columns}
          data={filteredItems}
          selectableRows
          onSelectedRowsChange={handleChange}
          clearSelectedRows={toggledClearRows}
          onColumnOrderChange={(cols) => console.log(cols)}
          customStyles={customStyles}
          highlightOnHover
          pointerOnHover
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          actions={actionsMemo}
          noContextMenu={true}
          pagination
        />

        <Button variant="contained" onClick={onContinue}>
            Tiếp tục
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <Box sx={modalStyle}>
              <DataTable
                title="Lịch sử nhận quà"
                columns={modalColumns}
                data={giftHistory}
                onColumnOrderChange={(cols) => console.log(cols)}
                customStyles={customStyles}
                highlightOnHover
                pointerOnHover
                noDataComponent="Chưa nhận được quà tặng nào"
                noContextMenu={true}
              />
            </Box>
          </Fade>
        </Modal>
      </Container>
    </>
  );
}

export default Home;
