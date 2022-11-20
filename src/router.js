const ROUTE_CHANGE_EVENT = "ROUTE_CHANGE_EVENT";

export const routeInit = (onChangeRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT, (e) => {
    console.log(e.detail);
    const path = e.detail ?? "/";
    onChangeRoute(path);
  });
};

export const routeChange = (url) => {
  // history.pushState(null, null, url);
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, { detail: url }));
};
