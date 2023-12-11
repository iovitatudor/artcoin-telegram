import getWithExpiry from "./getAuthFunction";

const AuthGuard = async function (to, from, next) {
  const isAuth = getWithExpiry('auth')
  try {
    if (!isAuth) {
      return next({name: 'Signin'})
    } else {
     return next();
    }
  } catch (err) {
    return next({name: 'Signin'})
  }
};


export default AuthGuard;