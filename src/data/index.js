const updateUserFormData = (
  params
) => {
  const formData = new FormData();
  console.log(params.data.avatar)
  const user = tokenService.getUser();
  params.data?.avatar?.rawFile ? formData.append("file", params.data.avatar.rawFile) : formData.append("file", null);
  formData.append("avatar", params.data.avatar != null ? `$avatar_${user.id}_${user.avatar}` : "");
  params.data?.birthDate ? formData.append("birthDate", params.data.birthDate) : formData.append("birthDate", params.data.previousData?.birthDate);
  params.data?.phone ? formData.append("phone", params.data.phone) : formData.append("phone", !params.data.previousData?.phone ? "" : params.data.previousData?.phone);
  params.data?.isActive && formData.append("isActive", params.data.isActive);
  params.data?.userName && formData.append("userName", params.data.userName);
  params.data?.role && formData.append("role", params.data.role);
  params.data?.password && formData.append("password", params.data.password);
  params.data?.email && formData.append("email", params.data.email);
  params.data?.emailConfirm && formData.append("emailConfirm", params.data.emailConfirm);

  return formData;
};

const createProductFormData = (
  params
) => {
  const formData = new FormData();
  const data = params.data;

  var allColorKey = Object.keys(data).filter(key => key.includes("colorCode"));

  const colorCodes = allColorKey.map(key => data[key]);

  for (let index = 0; index < data.files.length; index++) {
    const image = data.files[index].rawFile;
    formData.append("files", image);
  }
  formData.append("categoryId", data.categoryId);
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("colorCode", colorCodes);
  formData.append("discount", data.discount);
  formData.append("flashSale", data.flashSale);
  formData.append("hot", data.hot);
  formData.append("price", data.price);
  formData.append("quantity", data.quantity);
  formData.append("return", data.return);
  formData.append("status", data.status);
  formData.append("upComing", data.upComing);

  return formData;
};

const handleGetFiles = async (params) => {

  const data = [];

  for (const obj of params.data.productImages) {
    if (obj?.url) {
      // Chuyển fetch thành một hàm async
      const fetchImage = async () => {
        try {
          const response = await fetch(obj.url);
          const blob = await response.blob();
          const file = new File([blob], obj.image, { type: blob.type });
          file["path"] = obj.image;
          data.push(file);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };

      // Gọi hàm fetch bằng await để đảm bảo rằng nó hoàn thành trước khi qua vòng lặp tiếp theo
      await fetchImage();
    }
    else {
      data.push(obj.rawFile)
    }
  }
  return data;
}


export {
  updateUserFormData,
  createProductFormData,
  handleGetFiles
}