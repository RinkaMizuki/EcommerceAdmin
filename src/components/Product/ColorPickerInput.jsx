// ColorPicker.js
import { useState } from 'react';
import { ColorPicker } from 'primereact/colorpicker';
import { Box } from '@mui/material';
import { Button } from 'react-admin';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';

const ColorPickerInput = ({ colorId, defaultColor, onColorChange, onRemove }) => {
  const [currentColor, setCurrentColor] = useState(defaultColor);

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setCurrentColor(newColor);
    onColorChange(colorId, newColor);
  };

  const handleRemove = () => {
    onRemove(colorId);
  };

  return (
    <Box sx={{
      display: "flex", gap: "20px", marginBottom: "15px",
      "& .css-a8j9v5-MuiButtonBase-root-MuiButton-root-RaButton-root": {
        minWidth: "unset",
      },
      "& .css-y6rp3m-MuiButton-startIcon": {
        marginRight: "0px",
        marginLeft: "0px"
      }
    }}>
      <ColorPicker
        format='hex'
        value={currentColor}
        onChange={handleColorChange}
      />
      <Button
        onClick={handleRemove}
        startIcon={<DoDisturbOnIcon />}
      />
    </Box >
  );
};

export default ColorPickerInput;
