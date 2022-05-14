import { getAuthHeader, doRefreshToken } from "./auth";

const getRequestOptions = (body, method, contentType) => {
  const authHeader = getAuthHeader();
  const contentTypeHeader = contentType
    ? { "Content-Type": contentType }
    : null;
  return {
    method: method,
    headers: {
      ...contentTypeHeader,
      ...authHeader,
    },
    body: body,
  };
};

const doMakeRequest = async (url, body, method, contentType) => {
  const options = getRequestOptions(body, method, contentType);
  let response = await fetch(url, options);

  let data = null;
  if (response.ok) {
    data = await response.json();
  }

  return { ok: response.ok, status: response.status, data: data };
};

export const makeAuthorizedRequest = async (
  url,
  body,
  method = "POST",
  contentType = "application/json"
) => {
  let { ok, status, data } = await doMakeRequest(
    url,
    body,
    method,
    contentType
  );

  if (ok) return { ok, status, data };

  if (status === 401) {
    const success = await doRefreshToken();
    if (success) {
      ({ ok, status, data } = await doMakeRequest(
        url,
        body,
        method,
        contentType
      ));

      if (ok) return { ok, status, data };
    }
  }

  return { ok: false, status: status, data: null };
};

export const makeUnauthorizedRequest = async (url) => {
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    return { ok: response.ok, status: response.status, data: data };
  }

  return { ok: response.ok, status: response.status, data: null };
};
