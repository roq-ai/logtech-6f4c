import axios from 'axios';
import queryString from 'query-string';
import { AccessKeyInterface, AccessKeyGetQueryInterface } from 'interfaces/access-key';
import { GetQueryInterface } from '../../interfaces';

export const getAccessKeys = async (query?: AccessKeyGetQueryInterface) => {
  const response = await axios.get(`/api/access-keys${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAccessKey = async (accessKey: AccessKeyInterface) => {
  const response = await axios.post('/api/access-keys', accessKey);
  return response.data;
};

export const updateAccessKeyById = async (id: string, accessKey: AccessKeyInterface) => {
  const response = await axios.put(`/api/access-keys/${id}`, accessKey);
  return response.data;
};

export const getAccessKeyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/access-keys/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAccessKeyById = async (id: string) => {
  const response = await axios.delete(`/api/access-keys/${id}`);
  return response.data;
};
