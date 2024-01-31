import {
  Edit, SimpleForm, TextInput, DateInput, PasswordInput, BooleanInput
} from 'react-admin';
import PreviewAvatarField from '../Field/PreviewAvatarField';
import { Box, Grid } from '@mui/material';

export const UserEdit = () => {

  return (
    <Edit>
      <SimpleForm>
        <div>
          <Grid container width={{ xs: '100%', xl: 800 }} spacing={2}>
            <Grid item xs={12} md={8}>

              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source="userName"
                    isRequired
                    fullWidth
                  />
                </Box>
              </Box>
              <TextInput
                type="email"
                source="email"
                isRequired
                fullWidth
              />
              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <DateInput
                    source="birthDate"
                    fullWidth
                    helperText={false}
                  />
                </Box>
                <Box flex={3} mr={{ xs: 0, sm: '0.5em' }} ml={{ xs: "10px" }}>
                  <TextInput
                    source="phone"
                    fullWidth
                    helperText={false}
                  />
                </Box>
                <Box flex={2} ml={{ xs: 0, sm: '0.5em' }} />
              </Box>

              <Box mt="1em" />
              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <PasswordInput
                    source="password"
                    fullWidth
                  />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                  <PasswordInput
                    source="confirmPassword"
                    fullWidth
                  />
                </Box>
              </Box>

              <Box>
                <BooleanInput label="Ban" source="isActive" />
                <BooleanInput label="Confirm Email" source="emailConfirm" />
                <PreviewAvatarField />
              </Box>
            </Grid>
          </Grid>
        </div>
      </SimpleForm>
    </Edit>
  );
}
