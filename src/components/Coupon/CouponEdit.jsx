import {
  Edit, SimpleForm, TextInput, BooleanInput, NumberInput, ArrayInput, SimpleFormIterator, useRecordContext
} from 'react-admin';
import { Box, Grid, InputAdornment } from '@mui/material';

export const CouponEdit = () => {

  return (
    <Edit title={<CouponTitle />}>
      <SimpleForm>
        <div>
          <Grid container width={{ xs: '100%', xl: 800 }} spacing={2}>
            <Grid item xs={12} md={8}>

              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source="couponCode"
                    isRequired
                    fullWidth
                  />
                </Box>
                <Box flex={2} ml={{ xs: 0, sm: '0.5em' }} />
              </Box>

              <Box
                display={{ xs: 'block', sm: 'flex' }}
                sx={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <NumberInput
                    source="discountPercent"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">%</InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }} />
                <BooleanInput
                  source="isActive"
                  label="Active"
                />
              </Box>
              <Box flex={3} mr={{ xs: 0, sm: '0.5em' }} ml={{ xs: "10px" }}>
                <ArrayInput source="couponConditions">
                  <SimpleFormIterator inline>
                    <TextInput source="condition.attribute" helperText={false} />
                    <TextInput source="condition.operator" helperText={false} />
                    <NumberInput source="value" helperText={false} />
                  </SimpleFormIterator>
                </ArrayInput>
              </Box>
            </Grid>
          </Grid>
        </div>
      </SimpleForm>
    </Edit>
  );
}

const CouponTitle = () => {
  const record = useRecordContext();

  return (
    <span>Coupon "{record?.couponCode || null}"</span>
  )
}