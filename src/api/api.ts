import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';

interface RequestArgs<T = any> {
  url: string;
  headers?: AxiosRequestHeaders;
  data?: T;
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// TODO: 로그인 기능 구현 후 요청 인터셉터 추가 및 props에 header정보 추가
// TODO: 상태코드 정한 후 응답 인터셉터 추가

const get = async <T>({url}: RequestArgs): Promise<T> => {
  const response = await axios.get<T>(url);
  return response.data;
};

const post = async <T>({ url, data }: RequestArgs): Promise<T> => {
  const response = await axios.post<T>(url, data);
  return response.data;
};

const put = async <T>({ url, data }: RequestArgs): Promise<T> => {
  const response = await axios.put<T>(url, data);
  return response.data;
};

const del = async <T>({ url }: RequestArgs): Promise<T> => {
  const response = await axios.delete<T>(url);
  return response.data;
};

export { get, post, put, del };
export default api;