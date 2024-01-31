import { CreateButton, useRecordContext } from 'react-admin';

const CreateRelatedReviewButton = () => {
  const record = useRecordContext();

  return (
    <CreateButton
      resource="rates"
      state={{ record: { productId: record.id } }}
    />
  );
};

export default CreateRelatedReviewButton;