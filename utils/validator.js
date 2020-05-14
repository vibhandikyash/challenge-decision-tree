module.exports = schema => (ctx, next) => {
    const { body } = ctx.request;
    const { error } = schema.validate(body);
    if (error) {
        ctx.response.status = 400;
        ctx.response.body = {
            message: 'Values to calculate bidcap are inappropriate! Please try again.',
            data: error.message
        };
    } else {
        next()
    }

}