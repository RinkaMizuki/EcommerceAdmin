import React, { useState } from "react"
import { ImageField, ImageInput, useRecordContext } from "react-admin";
import { AvatarField } from "./AvatarField";

const PreviewAvatarField = () => {
  const [isChanage, setIsChange] = useState(false)
  const record = useRecordContext()

  const handleAvatarChange = () => {
    setIsChange(true);
  }

  return (
    <>
      {isChanage ? <ImageInput source="avatar" accept="image/png,image/svg+xml,image/jpg,image/jpeg" maxSize={300000}>
        <ImageField source="src" title="avatar" />
      </ImageInput> : <ImageInput source="avatar" accept="image/png,image/svg+xml,image/jpg,image/jpeg" onChange={handleAvatarChange}>
        <AvatarField data={record} size="220" />
      </ImageInput>}
    </>
  )
};

export default PreviewAvatarField;
