import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import BASE_URL from "../constants/constant";
import StudentCard from "./StudentCard/StudentCard";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [data, setData] = useState({ studentId: "", groupId: "" });
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (studentId) => {
    let newData = { ...data, studentId: studentId };
    console.log(newData);
    setData(newData);
    setModalOpen(true);
  };

  // BEAU's incomplete function
  // Todo: Implement this on the backend (no function stubs provided)
  const joinGroup = () => {
    fetch(`${BASE_URL}/api/groups/${data["groupId"]}/add`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId: data["studentId"] }),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error creating group:", error));
  };

  useEffect(() => {
    fetch(`${BASE_URL}/api/students`)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching groups:", error));

    fetch(`${BASE_URL}/api/groups`)
      .then((response) => response.json())
      .then((data) => setGroups(data))
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    display: "flex",
    flexDirection: "column",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Typography variant='h4' gutterBottom>
        Students
      </Typography>
      <Box
        sx={{
          padding: 2,
          background: "#FFFFFF",
          borderRadius: 2,
          height: 600,
          width: 500,
          display: "flex",
          gap: 2,
          flexDirection: "column",
          overflowY: "scroll",
        }}
      >
        {students.map(({ id, name }, idx) => (
          <StudentCard key={idx} id={id} name={name} openModal={openModal} />
        ))}
      </Box>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ marginBottom: 2 }}
          >
            Add {data["student"]} to a group
          </Typography>
          <FormControl fullWidth>
            <InputLabel id='select-group-label'>Group</InputLabel>
            <Select
              labelId='select-group-label'
              id='select-group'
              value={data["groupId"]}
              label='Group'
              onChange={(e) => setData({ ...data, groupId: e.target.value })}
            >
              {groups.map(({ groupName, id }, idx) => {
                return (
                  <MenuItem key={idx} value={id}>
                    {groupName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            disabled={data["groupId"] === ""}
            onClick={() => {
              joinGroup();
              setModalOpen(false);
              setData({ studentId: "", groupId: "" });
            }}
            variant='contained'
            sx={{ mt: 2, mr: 1 }}
          >
            Add to group
          </Button>
          <Button
            onClick={() => {
              setModalOpen(false);
              setData({ studentId: "", groupId: "" });
            }}
            variant='outlined'
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Students;
