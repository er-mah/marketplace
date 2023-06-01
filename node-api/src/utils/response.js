export const successResponse = (message, data) => {
    return {
        status: 'success',
        message: message,
        data: data
    };
};

export const errorResponse = (message, error) => {
    return {
        status: 'error',
        message: message,
        error: error
    };
};