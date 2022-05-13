const API_VERSION = "v1/";
export const API_BASE_URL = "http://localhost:8000/api/";
export const API_TOKEN_CREATE_URL = `${API_BASE_URL}token/`;
export const API_TOKEN_REFRESH_URL = `${API_BASE_URL}token/refresh/`;
export const API_TOKEN_VERIFY_URL = `${API_BASE_URL}token/refresh/`;
export const API_PHOTO_LIST_VIEW_URL = `${API_BASE_URL}${API_VERSION}photos/`;
export const API_OWN_PHOTO_LIST_VIEW_URL = `${API_BASE_URL}${API_VERSION}photos/own/`;

export const API_PHOTO_DETAIL_VIEW_URL = (id) =>
  `${API_PHOTO_LIST_VIEW_URL}${id}/`;

export const API_PHOTO_DETAIL_SOURCE_URL = (id) =>
  `${API_PHOTO_DETAIL_VIEW_URL(id)}source/`;
