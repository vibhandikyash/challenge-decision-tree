const request = require('supertest');
const app = require('../server');


test('Check Validation', async () => {
    const response = await request(app.callback()).post('/api/v1/bidcap').send({
        "rpcAlpha": 4,
        "net": 31,
        "socialClicks": 2,
        "socialClicksCutOff": 1,
        "nonSocialClicks": 2,
        "nonSocialClicksCutOff": 1,
        "currentBidCap": 5,
        "ebRpc": 0.01,
        "factor": 0.45,
    });
    expect(response.body).toBeDefined();
    expect(response.body.data).toMatch('"rpcBeta" is required');
});

test('Increase Bid Cap by 1%', async () => {
    const response = await request(app.callback()).post('/api/v1/bidcap').send({
        "rpcAlpha": 4,
        "net": 32,
        "socialClicks": 3,
        "socialClicksCutOff": 2,
        "nonSocialClicks": 3,
        "nonSocialClicksCutOff": 2,
        "currentBidCap": 5,
        "ebRpc": 25,
        "factor": 1.45,
        "rpcBeta": 2
    });
    expect(response.body).toBe(5.05);
});

test('Decrease Bid Cap by 4%', async () => {
    const response = await request(app.callback()).post('/api/v1/bidcap').send({
        "rpcAlpha": 4,
        "net": 24,
        "socialClicks": 2,
        "socialClicksCutOff": 1,
        "nonSocialClicks": 2,
        "nonSocialClicksCutOff": 1,
        "currentBidCap": 1,
        "ebRpc": 0.01,
        "factor": 0.45,
        "rpcBeta": 2
    });
    expect(response.body).toBeDefined();
    expect(response.body).toBe(0.95);
});

test('Increase Bid Cap by 1%', async () => {
    const response = await request(app.callback()).post('/api/v1/bidcap').send({
        "rpcAlpha": 4,
        "net": 32,
        "socialClicks": 1,
        "socialClicksCutOff": 4,
        "nonSocialClicks": 30,
        "nonSocialClicksCutOff": 20,
        "currentBidCap": 1,
        "ebRpc": 25,
        "factor": 1.45,
        "rpcBeta": 2
    });
    expect(response.body).toBeDefined();
    expect(response.body).toBe(1.01);
});

test('Bid Cap = Max(EBRPC, Avg.(RPC Alpha, RPC Beta))', async () => {
    const response = await request(app.callback()).post('/api/v1/bidcap').send({
        "rpcAlpha": 1.2,
        "net": 31,
        "socialClicks": 1,
        "socialClicksCutOff": 3,
        "nonSocialClicks": 2,
        "nonSocialClicksCutOff": 1,
        "currentBidCap": 4,
        "ebRpc": 1,
        "factor": 1.45,
        "rpcBeta": 2
    });
    expect(response.body).toBeDefined();
    expect(response.body).toBe(1.6);
});

test('Increase Bid Cap by 5%', async () => {
    const response = await request(app.callback()).post('/api/v1/bidcap').send({
        "rpcAlpha": 2,
        "net": 2,
        "socialClicks": 2,
        "socialClicksCutOff": 1,
        "nonSocialClicks": 2,
        "nonSocialClicksCutOff": 1,
        "currentBidCap": 1,
        "ebRpc": 3,
        "factor": 1,
        "rpcBeta": 10
    });
    expect(response.body).toBeDefined();
    expect(response.body).toBe(1.05);
});

test('Decrease Bid Cap by 5%', async () => {
    const response = await request(app.callback()).post('/api/v1/bidcap').send({
        "rpcAlpha": 1,
        "net": 2,
        "socialClicks": 2,
        "socialClicksCutOff": 1,
        "nonSocialClicks": 2,
        "nonSocialClicksCutOff": 1,
        "currentBidCap": 1,
        "ebRpc": 0.01,
        "factor": 0.45,
        "rpcBeta": 1
    });
    expect(response.body).toBeDefined();
    expect(response.body).toBe(0.95);
});

test('Increase Bid Cap by 2%', async () => {
    const response = await request(app.callback()).post('/api/v1/bidcap').send({
        "rpcAlpha": 2,
        "net": 2,
        "socialClicks": 1,
        "socialClicksCutOff": 2,
        "nonSocialClicks": 2,
        "nonSocialClicksCutOff": 1,
        "currentBidCap": 5,
        "ebRpc": 4,
        "factor": 1.45,
        "rpcBeta": 1
    });
    expect(response.body).toBeDefined();
    expect(response.body).toBe(4);
});

test('Bid Cap = Min(EBRPC, Avg.(RPC Alpha, RPC Beta))', async () => {
    const response = await request(app.callback()).post('/api/v1/bidcap').send({
        "rpcAlpha": 1,
        "net": 2,
        "socialClicks": 1,
        "socialClicksCutOff": 2,
        "nonSocialClicks": 2,
        "nonSocialClicksCutOff": 1,
        "currentBidCap": 0.5,
        "ebRpc": 1.5,
        "factor": 0.45,
        "rpcBeta": 1
    });
    expect(response.body).toBeDefined();
    expect(response.body).toBe(0.505);
});

