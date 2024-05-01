import axios, { AxiosResponse } from 'axios';

type FormData = any;

export const uploadFile = (formData: FormData): Promise<AxiosResponse<any>> => {
  return axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_BASEURL || '', formData);
};
