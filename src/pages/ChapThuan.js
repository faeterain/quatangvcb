import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
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

function ChapThuan() {
  const clientsList = useSelector(
    (state) => state.selectedItem.selectedClients
  );

  const navigate = useNavigate();
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
      selector: (row) => row.nameGift,
      sortable: true,
      reorder: true,
    },
    {
      name: "Giá",
      selector: (row) => row.valGift,
      sortable: true,
      reorder: true,
    },
  ];

  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(clientsList[0]);

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
  const goBack = () => {
    alert("Yêu cầu đã bị từ chối");
    navigate("/quatangvcb");
  };
  const onContinue = () => {
    alert("Yêu cầu đã được chấp thuận");
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
          downloadCSV(clientsList);
        }}
      />{" "}
      <Button variant="contained"
       onClick={()=> {window.print();}}>
        Print
      </Button>
    </>
  );
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
          actions={actionsMemo}
          pagination
        />
        <div style={{marginTop:20}}></div>
        Tổng: {clientsList.reduce((a, b) => a + b.valGift, 0)}<br />
        <div style={{marginTop:50}}></div>
        <div style={{marginBottom:200}}>
            <span style={{marginRight: 500}} >Người lập báo cáo</span>
            <span>Người phê duyệt</span>
            
        </div>
        <Button style={{marginRight: 100}} variant="contained" color="error" onClick={goBack}>
          Từ chối
        </Button>
        <Button variant="contained" onClick={onContinue}>
          Chấp nhận
        </Button>
      </Container>
    </>
  );
}
export default ChapThuan;
