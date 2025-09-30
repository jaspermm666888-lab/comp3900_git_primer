import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 600,
          background:
            "linear-gradient(90deg, hsla(140, 49%, 63%, 1.00) 0%, hsla(238, 74%, 61%, 1) 100%)",
          backgroundClip: "text",
          color: "transparent",
        }}
        variant='h2'
      >
        Welcome to COMP[39]900
      </Typography>
      <Typography sx={{ fontSize: 20 }} variant='p'>
        This is the Python Primer. Please click the <b>"Groups"</b> button below
        to continue.
      </Typography>
    </Box>
  );
};

export default Home;
