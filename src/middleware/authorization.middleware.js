export const isAuthorization = (role) => {
  return (req, res, next) => {
      if (req.user.role !== role) return next(new Error("you  unAuthorized!") , {cause:401});
       
      return next()
  };
};
