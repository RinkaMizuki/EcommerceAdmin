import * as React from 'react';
import Button from '@mui/material/Button';
import ThumbDown from '@mui/icons-material/ThumbDown';
import {
  useTranslate,
  useUpdate,
  useNotify,
  useRedirect,
  useRecordContext,
} from 'react-admin';

/**
 * This custom button demonstrate using a custom action to update data
 */
const RejectButton = () => {
  const translate = useTranslate();
  const notify = useNotify();
  const redirectTo = useRedirect();
  const record = useRecordContext();

  const [reject, { isLoading }] = useUpdate(
    'rates',
    {
      id: record.id,
      data: {
        status: 'rejected',
        content: record.content,
        star: record.star,
      },
      previousData: record
    },
    {
      mutationMode: 'undoable',
      onSuccess: () => {
        notify('Rejected success', {
          type: 'info',
          undoable: true,
        });
        redirectTo('/rates');
      },
      onError: () => {
        notify('Rejected error', {
          type: 'error',
        });
      },
    }
  );

  return record && record.status === 'pending' ? (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      onClick={() => reject()}
      sx={{ borderColor: theme => theme.palette.error.main }}
      startIcon={
        <ThumbDown sx={{ color: theme => theme.palette.error.main }} />
      }
      disabled={isLoading}
    >
      {translate('reject')}
    </Button>
  ) : (
    <span />
  );
};

export default RejectButton;