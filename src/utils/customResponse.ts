export const errorResponse = (message: string) => {
  return {
    success: false,
    message,
  };
};

export const successResponse = (message: string, data?: any) => {
  return {
    success: true,
    message,
    data,
  };
};
