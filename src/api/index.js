import axiosClient from "../axios";

export async function postData(url, postData) {
  try {
    return await axiosClient.post(url, postData);
  } catch (err) {
    console.error(err);
  }
}
