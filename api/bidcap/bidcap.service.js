const BidCapService = {
  getConditionExpression({
    rpcAlpha,
    rpcBeta,
    ebRpc,
    net,
    nonSocialClicks,
    nonSocialClicksCutOff,
    socialClicks,
    socialClicksCutOff,
    currentBidCap,
    factor,
  }) {
    const avgAlphaBeta = (rpcAlpha + rpcBeta) / 2;
    const maxValue = Math.max(ebRpc, avgAlphaBeta);
    const socialClickCondition =
      socialClicks > socialClicksCutOff &&
      nonSocialClicks > nonSocialClicksCutOff;

    let condition = {
      condition: rpcAlpha > 2.5 && net > 30,
      truePath: {
        condition: socialClickCondition,
        truePath: {
          condition: currentBidCap < Math.max(ebRpc * factor, avgAlphaBeta),
          truePath: {
            returnValue: this.getBidcap(currentBidCap, 1, 'increase'),
          },
          falsePath: {
            returnValue: this.getBidcap(currentBidCap, 4, 'decrease'),
          },
        },
        falsePath: {
          condition: currentBidCap < maxValue,
          truePath: {
            returnValue: this.getBidcap(currentBidCap, 1, 'increase'),
          },
          falsePath: {
            returnValue: maxValue,
          },
        },
      },
      falsePath: {
        condition: socialClickCondition,
        truePath: {
          condition: currentBidCap < Math.min(ebRpc * factor, avgAlphaBeta),
          truePath: {
            returnValue: this.getBidcap(currentBidCap, 5, 'increase'),
          },
          falsePath: {
            returnValue: this.getBidcap(currentBidCap, 5, 'decrease'),
          },
        },
        falsePath: {
          condition: currentBidCap < maxValue,
          truePath: {
            returnValue: this.getBidcap(currentBidCap, 1, 'increase'),
          },
          falsePath: {
            returnValue: maxValue,
          },
        },
      },
    };
    return condition;
  },

  execute({ condition, truePath, falsePath, returnValue }) {
    if (returnValue) return returnValue;
    return condition ? this.execute(truePath) : this.execute(falsePath);
  },

  getBidcap(currentBidcap, per, type) {
    if (type === 'increase') {
      return (currentBidcap += (currentBidcap * per) / 100);
    }
    if (type === 'decrease') {
      return (currentBidcap -= (currentBidcap * per) / 100);
    }
  },
};

module.exports = BidCapService;
