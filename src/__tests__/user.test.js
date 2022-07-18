const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const User = require('../models/User');

const { connectDB, disconnectDB } = require('../services/db');

describe('/api/users', () => {
  let serverToken;
  let testUser;

  beforeAll(async () => {
    await connectDB();

    testUser = await new User({
      email: 'test@test.com',
      picture: 'https://test.com',
      state: 'IDLING',
      growth: 'ADULT',
      fun: 10,
      hunger: 10,
      birthCount: 0,
      tiredness: 10,
      exp: 10,
      happiness: 10,
      profileName: 'yoobin',
      profileDescription: 'hi',
    }).save();

    serverToken = jwt.sign(
      testUser._id.toHexString(),
      process.env.TOKEN_SECRET,
    );
  });

  afterAll(async () => {
    await User.findByIdAndRemove(testUser._id);
    testUser = null;
    serverToken = null;

    await disconnectDB();
  });

  it('GET /user-information', async () => {
    const response = await request(app)
      .get('/api/users/user-information')
      .set('Cookie', [`server_token=${serverToken}`])
      .expect('Content-Type', /json/i);

    expect(response.body.ok).toBeTruthy();
    expect(response.body.status).toEqual(200);
    expect(response.body.userInformation).toMatchObject({
      email: 'test@test.com',
      picture: 'https://test.com',
      state: 'IDLING',
      growth: 'ADULT',
      fun: 10,
      hunger: 10,
      birthCount: 0,
      tiredness: 10,
      exp: 10,
      happiness: 10,
      profileName: 'yoobin',
      profileDescription: 'hi',
    });
  });

  it('PATCH /new-information', async () => {
    const response = await request(app)
      .patch('/api/users/new-information')
      .set('Cookie', [`server_token=${serverToken}`])
      .send({
        newInformation: {
          email: 'test@test.com',
          picture: 'https://test.com',
          state: 'IDLING',
          growth: 'ADULT',
          fun: 5,
          hunger: 5,
          birthCount: 0,
          tiredness: 5,
          exp: 5,
          happiness: 5,
          profileName: 'yoobin',
          profileDescription: 'hi',
        },
      })
      .expect('Content-Type', /json/i);

    let targetUser = await User.findById(testUser._id);

    expect(response.body.ok).toBeTruthy();
    expect(response.body.status).toEqual(200);
    expect(targetUser.fun).toEqual(5);
    expect(targetUser.hunger).toEqual(5);

    const secondResponse = await request(app)
      .patch('/api/users/new-information')
      .set('Cookie', [`server_token=${serverToken}`])
      .send({
        newInformation: {
          email: 'test@test.com',
          picture: 'https://test.com',
          state: 'IDLING',
          growth: 'ADULT',
          fun: 10,
          hunger: 10,
          birthCount: 0,
          tiredness: 10,
          exp: 10,
          happiness: 10,
          profileName: 'yoobin',
          profileDescription: 'hi',
        },
      })
      .expect('Content-Type', /json/i);

    targetUser = await User.findById(testUser._id);

    expect(secondResponse.ok).toBeTruthy();
    expect(secondResponse.status).toEqual(200);
    expect(targetUser.fun).toEqual(10);
    expect(targetUser.hunger).toEqual(10);
  });

  it('POST /profile', async () => {
    const response = await request(app)
      .patch('/api/users/profile')
      .set('Cookie', [`server_token=${serverToken}`])
      .send({
        newProfile: {
          profileName: 'yb',
          profileDescription: 'hello',
        },
      })
      .expect('Content-Type', /json/i);

    const targetUser = await User.findById(testUser._id);

    expect(response.ok).toBeTruthy();
    expect(response.status).toEqual(200);
    expect(targetUser.profileName).toEqual('yb');
    expect(targetUser.profileDescription).toEqual('hello');
  });
});
