import getWithExpiry from "./getAuthFunction";

const GuestGuard = function (to, from, next) {
  const hasAuth = getWithExpiry('auth');
  if (hasAuth) next({name: 'Dashboard'});
  else next();
};

export default GuestGuard;