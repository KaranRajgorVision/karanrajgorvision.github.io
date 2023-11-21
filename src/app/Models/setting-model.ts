import { StandardResponse } from "./StandardResponse";
import { IAllApiResponce } from "./comman-api-res-model";

export interface IUploadDataType {
  userID: Number,
  linkUrl: String
}


export interface IGetUserUploadedLink {
  isActive: boolean,
  linkUrl: string,
  userId: number,
  userLinkId: number,
  status: string,
  uploadedBy: string
}


export interface IUploadApiResponceData extends IAllApiResponce {
  payload: number;
}


export interface IGetUserUploadedLinkApiResponceData extends IAllApiResponce {
  payload:any;
}
