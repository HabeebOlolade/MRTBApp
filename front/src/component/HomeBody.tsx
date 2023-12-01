import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AwesomeSlider from "react-awesome-slider";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function HomeBody() {
  return (
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 8">
          <Item>Statotory function</Item>
        </Box>
        <Box gridColumn="span 4">
          <Item>Establish law</Item>
        </Box>
        <Box gridColumn="span 4">
          <Item>Report</Item>
        </Box>
        <Box gridColumn="span 8">
          <AwesomeSlider bullets={false} startup={true}>
            <div>
              <video
                style={{ objectFit: "fill", width: "100vw", height: "130vh" }}
                autoPlay
                loop
                muted
              >
                <source
                  src={require("../assets/pexels-cottonbro-studio-7969938-4096x2160-25fps.mp4")}
                  type="video/mp4"
                />
              </video>
            </div>
            <div>
              <video
                style={{ objectFit: "fill", width: "100vw", height: "130vh" }}
                autoPlay
                loop
                muted
              >
                <source
                  src={require("../assets/pexels-maksim-goncharenok-5642529-1920x1080-25fps.mp4")}
                  type="video/mp4"
                />
              </video>
            </div>
          </AwesomeSlider>
        </Box>
      </Box>
    </Box>
  );
}
