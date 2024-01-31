import {
  BooleanInput,
  Button,
  Labeled,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  TextInput,
} from 'react-admin';
import { InputAdornment, Grid } from '@mui/material';
import { useState } from 'react';
import { ColorInput } from 'react-admin-color-picker';
import AddCircleIcon from '@mui/icons-material/AddCircle';


export const ProductEditDetail = () => {

  const [colorPickerCount, setColorPickerCount] = useState(1);

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
      <Grid item xs={12} sm={4} sx={{ marginBottom: "15px" }}>
        {Array(colorPickerCount)
          .fill(true)
          .map((_, i) => (
            <ColorInput
              label="Product color"
              key={i}
              variant="filled"
              source={`colorCode${i}`}
              picker="Sketch"
              options={{
                disableAlpha: true,
              }}
            />
          ))
        }
        <Labeled label="Add color">
          <Button
            sx={{
              '& .MuiButton-startIcon': {
                marginRight: "0"
              }
            }}
            color='secondary'
            size='medium'
            children={<AddCircleIcon />}
            alignIcon='left'
            onClick={() => setColorPickerCount(colorPickerCount + 1)}
          >
          </Button>
        </Labeled>
      </Grid>

      <Grid item xs={0} sm={6}></Grid>
      <Grid item xs={12} sm={4}>
        <BooleanInput source="status" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <BooleanInput source="hot" />
      </Grid>
      <Grid item xs={0} sm={4}></Grid>
      <Grid item xs={12} sm={4}>
        <BooleanInput source="flashSale" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <BooleanInput source="upComing" />
      </Grid>
    </Grid >
  )
};

const req = [required()];