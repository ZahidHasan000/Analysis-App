import React from 'react';
import { Box, Button, BottomNavigation, BottomNavigationAction, useTheme } from "@mui/material";
import { Link } from 'react-router-dom';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { PeopleAlt, Psychology, PropaneTank, RateReview, Queue } from '@mui/icons-material';
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { customerTableColumns } from "../../utilities/CommonUtility";
import { useGetAdminsQuery } from '../../state/api';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';


const Admin = () => {
  const { data, isLoading } = useGetAdminsQuery();
  const theme = useTheme();
  const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
  const [value, setValue] = React.useState(pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subTitle="Managing admin and list of admins." />

      <Button variant="outlined"
        sx={{
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.background.alt,
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        startIcon={<PersonAdd />}>
        Create User Profile
      </Button>
      <BottomNavigation
        sx={{
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.background.alt,
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        value={value} onChange={handleChange} showLabels={true} >
        <BottomNavigationAction label="createuser" value="/createuser" icon={<PersonAdd />} component={Link} to='/createuser' />
      </BottomNavigation>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={customerTableColumns}
          components={{ Toolbar: DataGridCustomToolbar }}
        />
      </Box>
    </Box>
  )
}

export default Admin