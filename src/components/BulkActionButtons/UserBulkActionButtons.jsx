import { BulkDeleteWithUndoButton, BulkExportButton, BulkUpdateWithConfirmButton } from "react-admin"

const UserBulkActionButtons = () => {
  return (
    <>
      <BulkExportButton></BulkExportButton>
      <BulkUpdateWithConfirmButton data={new Date()}></BulkUpdateWithConfirmButton>
      <BulkDeleteWithUndoButton></BulkDeleteWithUndoButton>
    </>
  )
}
export default UserBulkActionButtons