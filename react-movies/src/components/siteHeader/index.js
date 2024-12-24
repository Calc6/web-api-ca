import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

const SiteHeader = ({ history }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [genreAnchorEl, setGenreAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const genreOpen = Boolean(genreAnchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Watchlist", path: "/watchlist"},
    { label: "Trending", path: "/movies/trending" },
    { label: "Upcoming", path: "/movies/upcoming" },
  ];

  const genreOptions = [
    { label: "Action", path: "/movies/genre/28" }, // Example genre ID for Action
    { label: "Comedy", path: "/movies/genre/35" }, // Example genre ID for Comedy
    { label: "Drama", path: "/movies/genre/18" }, // Example genre ID for Drama
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleGenreMenu = (event) => {
    setGenreAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setGenreAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            ScreenScape
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Your GateWay to Movies
          </Typography>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  {menuOptions.map((option) => (
                    <MenuItem key={option.label} onClick={() => handleMenuSelect(option.path)}>
                      {option.label}
                    </MenuItem>
                  ))}
                  <MenuItem
                    aria-controls="genre-menu"
                    aria-haspopup="true"
                    onClick={handleGenreMenu}
                  >
                    Genre
                  </MenuItem>
                  <Menu
                    id="genre-menu"
                    anchorEl={genreAnchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={genreOpen}
                    onClose={handleClose}
                  >
                    {genreOptions.map((option) => (
                      <MenuItem key={option.label} onClick={() => handleMenuSelect(option.path)}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </Menu>
              </>
            ) : (
              <>
                {menuOptions.map((option) => (
                  <Typography
                    key={option.label}
                    variant="h6"
                    onClick={() => handleMenuSelect(option.path)}
                    sx={{ cursor: 'pointer', marginLeft: 2 }}
                  >
                    {option.label}
                  </Typography>
                ))}
                <Button
                  aria-controls="genre-menu"
                  aria-haspopup="true"
                  onClick={handleGenreMenu}
                  color="inherit"
                >
                  Genre
                </Button>
                <Menu
                  id="genre-menu"
                  anchorEl={genreAnchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={genreOpen}
                  onClose={handleClose}
                >
                  {genreOptions.map((option) => (
                    <MenuItem key={option.label} onClick={() => handleMenuSelect(option.path)}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SiteHeader;