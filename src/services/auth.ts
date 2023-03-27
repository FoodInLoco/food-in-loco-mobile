import { AxiosResponse } from 'axios';
import { ResponseBase } from '../interfaces/response.base.interface';
import { RequestSignIn } from '../interfaces/user/login/request.signIn.interface';
import { ResponseSignIn } from '../interfaces/user/login/response.signIn.interface';
import { RequestSignUp } from '../interfaces/user/registration/request.signUp.interface';
import api from './api';

export async function signIn(request: RequestSignIn): Promise<AxiosResponse<ResponseBase<ResponseSignIn>>> {
  console.log(request);

  const response = await api.post('/auth', request);
  return response;
}

export async function signUp(request: RequestSignUp): Promise<AxiosResponse<ResponseBase<string>>> {
  console.log(request);

  const response = await api.post('/user', request);
  return response;
}