import { ResStatus } from "@/router/enums";

export interface IGenericResponse {
  status: ResStatus;
  errors: any; // eslint-disable-line
  data: any; // eslint-disable-line
  code?: number;
}