import * as React from 'react';
import Buttons from './Buttons';
import CustomizedMenus from './DropDown';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Search = styled('div')(() => ({
  position: 'relative',
  borderRadius: 8,
  backgroundColor: '#F4F4F5',
  marginLeft: 0,
  width: '100%',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(() => ({
  padding: '0 8px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: "#52525B"
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: 'black',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '8px 8px 8px 30px',
  },
}));

export default function Nav() {
  return (
    <Box className="Nav" sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar position="fixed" elevation={0} sx={{ width: '100%', bgcolor: 'white', color: 'black' }}>
        <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
          <Link to={'/'} style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h6" noWrap component="div">
              <b style={{ fontWeight: '500', color:"black" }}>Company</b>
            </Typography>
          </Link>
          <div style={{display:"flex"}}>
          <Buttons/>
          <CustomizedMenus/>
          </div>
          {/* <Box sx={{ flex: 1, maxWidth: "300px" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box> */}

        </Toolbar>
      </AppBar>
    </Box>
  );
}
