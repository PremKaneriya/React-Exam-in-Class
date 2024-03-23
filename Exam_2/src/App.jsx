/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { object, string, number, date } from "yup";
import { useFormik } from "formik";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const employeeSchema = object({
  name: string().required(),
  date: date().required(),
  salary: number().required(),
});

function App() {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [update, setUpdate] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      salary: "",
    },
    validationSchema: employeeSchema,
    onSubmit: (values) => {
      if (update) {
        handleEditData({ ...values, id: update.id });
      } else {
        handleAddData(values);
      }
      formik.resetForm();
      handleClose();
    },
  });

  const handleEditData = (empData) => {
    let localData = JSON.parse(localStorage.getItem("data"));
    let index = localData.findIndex((data) => data.id === update.id);
    localData[index] = empData;
    localStorage.setItem("data", JSON.stringify(localData));
    getData();
  };

  const handleAddData = (values) => {
    let localData = JSON.parse(localStorage.getItem("data"));
    let rNo = Math.floor(Math.random() * 1000);
    localData.push({ ...values, id: rNo });
    localStorage.setItem("data", JSON.stringify(localData));
    getData();
  };

  const getData = () => {
    let localData = JSON.parse(localStorage.getItem("data"));
    setRowData(localData);
  };

  useEffect(() => {
    getData();
  }, []);

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    formik;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setUpdate(null);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "salary", headerName: "Salary", width: 130 },
    {
      field: "remove",
      headerName: "Remove",
      width: 130,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleRemoveEMPData(params.row.id)}
        >
          Remove
          <DeleteIcon />
        </Button>
      ),
    },

    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => handleEdit(params.row)}
        >
          Edit
          <BorderColorIcon />
        </Button>
      ),
    },
  ];

  const handleEdit = (data) => {
    formik.setValues(data);
    setOpen(true);
    setUpdate(data);
  };

  const handleRemoveEMPData = (id) => {
    let updatedData = rowData.filter((data) => data.id !== id);
    localStorage.setItem("data", JSON.stringify(updatedData));
    setRowData(updatedData);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Enter Employee Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              helperText={touched.name && errors.name ? errors.name : " "}
              error={touched.name && errors.name ? true : false}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              required
              margin="dense"
              id="date"
              name="date"
              type="date"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
              helperText={touched.date && errors.date ? errors.date : " "}
              error={touched.date && errors.date ? true : false}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              required
              margin="dense"
              id="salary"
              name="salary"
              label="Enter Salary"
              type="number"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.salary}
              helperText={touched.salary && errors.salary ? errors.salary : " "}
              error={touched.salary && errors.salary ? true : false}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{update ? "Update" : "Submit"}</Button>
          </DialogActions>
        </form>
      </Dialog>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rowData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
}

export default App;
