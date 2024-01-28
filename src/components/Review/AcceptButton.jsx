import * as React from 'react';
import Button from '@mui/material/Button';
import ThumbUp from '@mui/icons-material/ThumbUp';
import {
  useTranslate,
  useUpdate,
  useNotify,
  useRedirect,
  useRecordContext,
} from 'react-admin';

/**
 * This custom button demonstrate using useUpdate to update data
 */
const AcceptButton = () => {
  const translate = useTranslate();
  const notify = useNotify();
  const redirectTo = useRedirect();
  const record = useRecordContext();

  const [approve, { isLoading }] = useUpdate(
    'rates',
    {
      id: record.id,
      data: {
        status: 'accepted',
        content: record.content,
        star: record.star,
      },
      previousData: record
    },
    {
      mutationMode: 'undoable',
      onSuccess: () => {
        notify('Approved success', {
          type: 'info',
          undoable: true,
        });
        redirectTo('/rates');
      },
      onError: () => {
        notify('Approved error', {
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
      onClick={() => approve()}
      sx={{ borderColor: theme => theme.palette.success.main }}
      startIcon={
        <ThumbUp sx={{ color: theme => theme.palette.success.main }} />
      }
      disabled={isLoading}
    >
      {translate('accept')}
    </Button>
  ) : (
    <span />
  );
};

export default AcceptButton;