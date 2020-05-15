const BidcapService = require('./bidcap.service');

exports.getbidcap = ctx => {
  const expression = BidcapService.getConditionExpression(ctx.request.body);
  const bidCap = BidcapService.execute(expression);
  ctx.body = bidCap;
};
