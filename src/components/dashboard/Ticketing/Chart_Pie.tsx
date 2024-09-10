import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function createData(
  Name: string,
  Applied: number,
  Violated: number,
  Aciheved: number
) {
  return { Name, Applied, Violated, Aciheved };
}

const rows = [createData("Bulk Order", 8, 2, 6)];
const rows1 = [createData("Bulk Order", 2, 6, 8)];

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Chart_Pie() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="w-full flex pt-5 gap-5">
      <div className="w-1/2 p-5 bg-white rounded-lg">
        <Typography className="pb-3">
          <b>Adherence vs Violated Tickets</b>
        </Typography>
        <hr className="pb-3" />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1, md: 3 }}
        >
          <Gauge
            width={300}
            height={300}
            value={75}
            text={({ value }) => `Violated ${value} %`}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 30,
                transform: "translate(0px, 0px)",
              },
            }}
            valueMin={0}
            valueMax={100}
          />
        </Stack>
      </div>
      <div className="w-1/2 p-5 bg-white rounded-lg">
        <Typography className="pb-3">
          <b>Violations</b>
        </Typography>
        <hr className="pb-3" />
        <div className="flex ">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="SLA" {...a11yProps(0)} />
                <Tab label="Agents" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Applied</TableCell>
                      <TableCell>Violated</TableCell>
                      <TableCell>Achieved</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.Name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.Name}
                        </TableCell>
                        <TableCell align="center">{row.Applied}</TableCell>
                        <TableCell align="center">{row.Violated}</TableCell>
                        <TableCell align="center">{row.Aciheved}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Applied</TableCell>
                      <TableCell>Violated</TableCell>
                      <TableCell>Achieved</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows1.map((row) => (
                      <TableRow
                        key={row.Name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.Name}
                        </TableCell>
                        <TableCell align="center">{row.Applied}</TableCell>
                        <TableCell align="center">{row.Violated}</TableCell>
                        <TableCell align="center">{row.Aciheved}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Chart_Pie;
