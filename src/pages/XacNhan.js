import { useSelector, useDispatch } from "react-redux";
import { Button, Container, FormControl, InputLabel, Select } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { processSelected } from "../redux/selectedItemSlice";

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

export function XacNhan() {
  const ITEM_HEIGHT = 48;
  const options = ["Lịch sử nhận quà"];
  const [openModal, setOpenModal] = React.useState(false);
  const [giftHistory, setGiftHistory] = React.useState(false);
  const navigate = useNavigate();
  const clientsList = useSelector(
    (state) => state.selectedItem.selectedClients
  );

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

  const CustomSelect = ({ row, selected }) => {
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-standard-label">
          Quà tặng
        </InputLabel>
        <Select onChange={selected} value={row.newGift} label="Giới tính">
          <MenuItem value={1}>Bộ ly rượu</MenuItem>
          <MenuItem value={2}>Giỏ quà</MenuItem>
          <MenuItem value={3}>Rượu vang</MenuItem>
        </Select>
      </FormControl>
    );
  };
  const updateGift = (row, gift) =>{
    let newClientList = clientsList.map(val => {
        let newVal = {...val};
        if(newVal.cif == row.cif){
            newVal.newGift = gift;
            switch (gift) {
                case 1:
                    newVal.valGift = 800000;
                    newVal.nameGift = "Bộ ly rượu";
                    break;
                case 2:
                    newVal.valGift = 2000000;
                    newVal.nameGift = "Giỏ quà";
                    break;
                default:
                    newVal.valGift = 500000;
                    newVal.nameGift = "Rượu vang";
                    break;
            }
        }
        return newVal;
    })
    console.log(newClientList);
    dispatch(processSelected(newClientList));
  }
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
    },
    {
      name: "Quà tặng",
      cell: (row) => <CustomSelect row={row} selected={(e)=>updateGift(row, e.target.value)} />,
    },
    {
      cell: (row) => <CustomMaterialMenu size="small" row={row} />,
      button: true,
      width: "60px",
    },
  ];
  console.log(clientsList);
  const dispatch = useDispatch();
  const goBack = () => {
    navigate("/quatangvcb");
  };
  const onContinue = () => {
    navigate("/quatangvcb/chapthuan");
  };
  return (
    <>
      <Container maxWidth="xl">
        <DataTable
          title="Khách hàng được nhận quà"
          columns={columns}
          data={clientsList}
          onColumnOrderChange={(cols) => console.log(cols)}
          customStyles={customStyles}
          noContextMenu={true}
          pagination
        />

        <Button variant="contained" onClick={goBack}>
          Quay lại
        </Button>
        <Button variant="contained" onClick={onContinue}>Tiếp tục</Button>
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

export default XacNhan;
