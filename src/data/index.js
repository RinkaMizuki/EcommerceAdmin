import { userService } from "../services/userService";

const updateUserFormData = (
  params
) => {
  const formData = new FormData();

  const user = userService.getUser();
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

const productFormData = (
  params, files = []
) => {
  const formData = new FormData();
  const data = params.data;
  console.log(data);
  const colors = JSON.parse(localStorage.getItem("colors_save") || []);

  const colorCodes = colors.map(c => c.colorCode);

  if (data?.files) {
    for (let index = 0; index < data.files.length; index++) {
      const image = data.files[index].rawFile;
      formData.append("files", image);
    }
  }
  else {
    for (let index = 0; index < files.length; index++) {
      const image = files[index];
      formData.append("files", image);
    }
  }

  formData.append("categoryId", data.categoryId);
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("colorCode", colorCodes);
  formData.append("discount", data.discount);
  formData.append("flashSale", data.flashSale);
  formData.append("hot", data.hot);
  formData.append("price", data.price);
  formData.append("quantity", data.productStock.stockQuantity);
  formData.append("return", data.return);
  formData.append("status", data.status);
  formData.append("upComing", data.upcoming);

  localStorage.removeItem("colors_save")

  return formData;
};

const sliderFormData = (params) => {
  const formData = new FormData();
  const data = params.data;

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("formFile", data.url.rawFile);
  return formData;
}

const handleGetFiles = async (params) => {

  const data = [];
  const images = params.data.productImages;

  if (params.data.url?.rawFile) {
    data.unshift(params.data.url?.rawFile);
  }
  else {
    //old thumbnail
    const response = await fetch(params.url);
    const blob = await response.blob();
    const file = new File([blob], params.data.image, { type: blob.type });
    file["path"] = params.data.image;
    data.unshift(file);
  }
  for (const obj of images) {
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
  productFormData,
  sliderFormData,
  handleGetFiles,
}