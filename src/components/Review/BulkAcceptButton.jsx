import * as React from 'react';
import ThumbUp from '@mui/icons-material/ThumbUp';

import {
  Button,
  useUpdateMany,
  useNotify,
  useUnselectAll,
  useListContext,
} from 'react-admin';

const BulkAcceptButton = () => {
  const { selectedIds = noSelection } = useListContext();
  const notify = useNotify();
  const unselectAll = useUnselectAll('reviews');

  const [updateMany, { isLoading }] = useUpdateMany(
    'reviews',
    { ids: selectedIds, data: { status: 'accepted' } },
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
      label="accept"
      onClick={() => updateMany()}
      disabled={isLoading}
    >
      <ThumbUp />
    </Button>
  );
};

export default BulkAcceptButton;