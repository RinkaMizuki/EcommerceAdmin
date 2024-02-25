import {
  SimpleForm, TextInput, BooleanInput, NumberInput, ArrayInput, SimpleFormIterator, Create, required, SelectInput
} from 'react-admin';
import { Box, Grid, InputAdornment } from '@mui/material';
import CouponInput from './CouponInput';

export const CouponCreate = () => {

  return (
    <Create title="Coupons" redirect="list">
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
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <NumberInput
                    min={1}
                    max={100}
                    step={1}
                    source="discountPercent"
                    validate={required()}
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
                <CouponInput />
              </Box>
            </Grid>
          </Grid>
        </div>
      </SimpleForm>
    </Create>
  );
}
