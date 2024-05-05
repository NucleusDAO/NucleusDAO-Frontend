import { ICreateDAO, ICreateUser } from '@/libs/types';
import axios, { AxiosResponse } from 'axios';

type FormData = any;

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_NUCLEUSDAO_URL}`,
  timeout: 36000,
});

export const uploadFile = (formData: FormData): Promise<AxiosResponse<any>> => {
  return axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_BASEURL || '', formData);
};

export const aePrice = () =>
  client.get('cryptos/aeternity-price').then((response) => response.data);

export const createDaoEP = (payload: ICreateDAO) =>
  client.post('daos', payload).then((response) => response);

export const createUser = (payload: ICreateUser) =>
  client.post('users', payload).then((response) => response);

export const updateUser = (payload: ICreateUser, address: string) =>
  client.put(`users/${address}`, payload).then((response) => response);

export const getUser = (address: string) =>
  client.get(`users/${address}`).then((response) => response.data.user);
