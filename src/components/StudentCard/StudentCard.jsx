import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const StudentCard = ({ name, id, openModal }) => {
  return (
    <Box
      sx={{
        width: "100%",
        background: "#f7efef",
        padding: 2,
        borderRadius: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        variant='h6'
        sx={{ fontSize: 16, fontWeight: "bold", color: "#0d1731" }}
      >
        {id} - {name}
      </Typography>
      <Button color='secondary' onClick={() => openModal(id)}>
        <AddCircleIcon />
      </Button>
    </Box>
  );
};

export default StudentCard;
