import { ROUTE_CHANGE_EVENT } from "./constant";

export const routeInit = (onChangeRoute) =>
  window.addEventListener(ROUTE_CHANGE_EVENT, (e) => {
    const path = e.detail ?? "/";
    onChangeRoute(path);
  });

export const routeChange = (url) =>
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, { detail: url }));
