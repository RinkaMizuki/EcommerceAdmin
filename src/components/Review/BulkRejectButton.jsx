import * as React from 'react';
import ThumbDown from '@mui/icons-material/ThumbDown';

import {
  Button,
  useUpdateMany,
  useNotify,
  useUnselectAll,
  useListContext,
} from 'react-admin';

const BulkRejectButton = () => {
  const { selectedIds = noSelection } = useListContext();
  const notify = useNotify();
  const unselectAll = useUnselectAll('reviews');

  const [updateMany, { isLoading }] = useUpdateMany(
    'reviews',
    { ids: selectedIds, data: { status: 'rejected' } },
    {
      mutationMode: 'undoable',
      onSuccess: () => {
        notify('Approved success', {
          type: 'info',
          undoable: true,
        });
        unselectAll();
      },
      onError: () => {
        notify('Approved error', {
          type: 'error',
        });
      },
    }
  );

  return (
    <Button
      label="reject"
      onClick={() => updateMany()}
      disabled={isLoading}
    >
      <ThumbDown />
    </Button>
  );
};

export default BulkRejectButton;