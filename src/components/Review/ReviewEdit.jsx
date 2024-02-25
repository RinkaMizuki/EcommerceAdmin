import * as React from 'react';
import {
  EditBase,
  useTranslate,
  TextInput,
  SimpleForm,
  DateField,
  Labeled,
  useRecordContext,
} from 'react-admin';
import { Box, Grid, Stack, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import ProductReferenceField from '../Product/ProductReferenceField';
import UserReferenceField from '../User/UserReferenceField';
import StarRatingField from './StarRatingField';
import ReviewEditToolbar from './ReviewEditToolbar';

const ReviewEdit = ({ id, onCancel }) => {

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
          toolbar={<ReviewEditToolbar />}
        >
          <Grid container rowSpacing={1} mb={1}>
            <Grid item xs={6}>
              <Labeled label="Customer">
                <UserReferenceField />
              </Labeled>
            </Grid>
            <Grid item xs={6}>
              <Labeled label="Product">
                <ProductReferenceField />
              </Labeled>
            </Grid>
            <Grid item xs={6}>
              <Labeled>
                <DateField source="createdAt" locales="fr-FR" />
              </Labeled>
            </Grid>
            <Grid item xs={6}>
              <Labeled label="Star">
                <StarRatingField />
              </Labeled>
            </Grid>
          </Grid>
          <ReviewContent />
        </SimpleForm>
      </Box>
    </EditBase>
  );
};

const ReviewContent = () => {

  const record = useRecordContext();

  return record?.status !== "pending" ? < TextInput
    source="content"
    maxRows={15}
    multiline
    fullWidth
  /> :
    < TextInput
      source="content"
      maxRows={15}
      multiline
      fullWidth
      disabled
    />
}

export default ReviewEdit;