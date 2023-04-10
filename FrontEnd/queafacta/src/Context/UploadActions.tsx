import { API_URL } from "../Util/util";
import axios from "axios";

export async function fileUpload(multiFile:any, fileType:any, id:any) {

  let response = null;
  const body = { file: multiFile, file_type: fileType, user_id: id };
  response = await axios.post(API_URL +'s3/upload', body, { headers: {"Content-type": "multipart/form-data"}});
  
  return response;
}
