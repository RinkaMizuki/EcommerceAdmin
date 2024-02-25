import {
  BooleanInput,
  Button,
  Labeled,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  TextInput,
  useRecordContext,
} from 'react-admin';
import { InputAdornment, Grid, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ColorPickerInput from "./ColorPickerInput";
import { useImperativeHandle, forwardRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const ProductEditDetail = forwardRef(({ onSaveable }, ref) => {
  const record = useRecordContext();
  const [colorPickers, setColorPickers] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledHotSale, setIsDisabledHotSale] = useState(false);
  const [isHot, setIsHot] = useState(record?.hot);
  const [isSale, setIsSale] = useState(record?.flashSale);

  useEffect(() => {
    setColorPickers(record?.productColors || [])
  }, [record?.productColors])

  const handleColorChange = (colorId, newColor) => {
    setColorPickers((prevColorPickers) =>
      prevColorPickers.map((picker) =>
        picker.colorId === colorId ? { ...picker, colorCode: newColor } : picker
      )
    );
    onSaveable(true);
  };
  const handleSaveColorChange = () => {
    localStorage.setItem('colors_save', JSON.stringify(colorPickers))
  };

  // Sử dụng useImperativeHandle để chỉ định các phương thức mà ref sẽ có thể gọi
  useImperativeHandle(ref, () => ({
    handleSaveColorChange: handleSaveColorChange
  }));

  const handleRemoveColorPicker = (colorId) => {
    setColorPickers((prevColorPickers) =>
      prevColorPickers.filter((picker) => picker.colorId !== colorId)
    );
    onSaveable(true);
  };

  const handleAddColorPicker = () => {
    const newColorPicker = { colorId: uuidv4(), colorCode: Math.floor(Math.random() * 16777215).toString(16) };
    setColorPickers((prevColorPickers) => [...prevColorPickers, newColorPicker]);
    onSaveable(true);
  };

  const handleChangeSale = (e) => {
    setIsSale(e.target.checked)

  }
  const handleChangeHot = (e) => {
    setIsHot(e.target.checked)
  }
  const handleChangeUp = (e) => {
    setIsDisabledHotSale(e.target.checked)
  }

  useEffect(() => {
    if (isHot || isSale) {
      setIsDisabled(true)
    }
    else {
      setIsDisabled(false)
    }
  }, [isHot, isSale])

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={12} sm={8}>
        <TextInput source="title" fullWidth validate={req} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ReferenceInput source="categoryId" reference="categories">
          <SelectInput
            validate={req}
            fullWidth
            optionText="title"
            optionValue="id"
            source="id"
            resettable
          />
        </ReferenceInput>
      </Grid>
      <Grid item xs={12} sm={4}>
        <NumberInput
          min={1}
          max={100}
          step={1}
          source="discount"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">%</InputAdornment>
            ),
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <NumberInput
          min={1}
          max={31}
          step={1}
          source="return"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">Day</InputAdornment>
            ),
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={0} sm={4}></Grid>
      <Grid item xs={12} sm={4}>
        <NumberInput
          min={1000}
          step={1000}
          source="price"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">VND</InputAdornment>
            ),
          }}
          validate={req}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <NumberInput source="quantity" validate={req} fullWidth />
      </Grid>
      <Grid item xs={0} sm={4}></Grid>
      <Grid item xs={12} sm={4} sx={{
        marginBottom: "15px",
        "& .css-8l66u2-MuiStack-root-RaLabeled-root": {
          marginRight: "10px"
        }
      }}>
        <>
          <Labeled label="Colors">
            <>
              {colorPickers?.map((picker) => (
                <ColorPickerInput
                  key={picker.colorId}
                  colorId={picker.colorId}
                  defaultColor={picker.colorCode}
                  onColorChange={handleColorChange}
                  onRemove={handleRemoveColorPicker}
                />
              ))}
            </>
          </Labeled>
          <Button
            label="Add color"
            onClick={handleAddColorPicker}
            startIcon={<AddCircleIcon />}
          />
        </>
      </Grid>

      <Grid item xs={0} sm={6}></Grid>
      <Labeled label="Status"
        sx={{ marginLeft: "19px" }}
      >
        <Box sx={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap"
        }}>
          <Grid item xs={12} sm={4}>
            <BooleanInput source="status" label="Visiable" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <BooleanInput source="hot" disabled={isDisabledHotSale} onChange={handleChangeHot} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <BooleanInput source="flashSale" disabled={isDisabledHotSale} onChange={handleChangeSale} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <BooleanInput source="upcoming" disabled={isDisabled} onChange={handleChangeUp} />
          </Grid>
        </Box>
      </Labeled>
    </Grid >
  )
});

const req = [required()];