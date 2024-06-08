import * as React from 'react';
import {
  EditBase,
  useTranslate,
  TextInput,
  SimpleForm,
  DateField,
  Labeled,
  TextField,
} from 'react-admin';
import { Box, Grid, Stack, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import ContactEditToolbar from './ContactEditToolbar';

const ContactEdit = ({ id, onCancel }) => {

  const translate = useTranslate();

  return (
    <EditBase id={id}>
      <Box pt={5} width={{ xs: '100vW', sm: 400 }} mt={{ xs: 2, sm: 1 }}>
        <Stack direction="row" p={2}>
          <Typography variant="h6" flex="1">
            {translate('Review detail')}
          </Typography>
          <IconButton onClick={onCancel} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
        <SimpleForm
          sx={{ pt: 0, pb: 0 }}
          toolbar={<ContactEditToolbar />}
        >
          <Grid container rowSpacing={1} mb={1}>
            <Grid item xs={6}>
              <Labeled label="Customer">
                <TextField source="name" />
              </Labeled>
            </Grid>
            <Grid item xs={6}>
              <Labeled>
                <DateField source="sentDate" locales="fr-FR" showTime />
              </Labeled>
            </Grid>
            <Grid item xs={6}>
              <Labeled label="Email">
                <TextField source="email" />
              </Labeled>
            </Grid>
            <Grid item xs={6}>
              <Labeled label="Phone">
                <TextField source="phone" />
              </Labeled>
            </Grid>
          </Grid>
          <ContactContent />
        </SimpleForm>
      </Box>
    </EditBase>
  );
};

const ContactContent = () => {
  return (< TextInput
    source="content"
    maxRows={15}
    multiline
    fullWidth
    disabled
  />)

}

export default ContactEdit;