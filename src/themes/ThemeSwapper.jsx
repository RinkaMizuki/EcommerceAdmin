import { useState } from 'react';
import { useStore, useTranslate, ToggleThemeButton } from 'react-admin';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import { themes } from './themes';

export const ThemeSwapper = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [themeName, setThemeName] = useStore('themeName', 'soft');

  const handleChange = (_, index) => {
    const newTheme = themes[index];
    setThemeName(newTheme.name);
    setAnchorEl(null);
  };
  const currentTheme = themes.find(theme => theme.name === themeName);

  const translate = useTranslate();
  const toggleThemeTitle = translate('Change theme', {
    _: 'Change Theme',
  });

  return (
    <>
      <Tooltip title={toggleThemeTitle} enterDelay={300}>
        <IconButton
          onClick={handleClick}
          color="inherit"
          aria-label={toggleThemeTitle}
        >
          <ColorLensIcon />
        </IconButton>
      </Tooltip>
      {currentTheme?.dark ? <ToggleThemeButton /> : null}
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        {themes.map((theme, index) => (
          <MenuItem
            onClick={event => handleChange(event, index)}
            value={theme.name}
            key={theme.name}
            selected={theme.name === themeName}
          >
            {ucFirst(theme.name)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const ucFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);
