const request = require('supertest');

jest.mock('firebase-admin', () => {
  const getMock = jest.fn();
  const docMock = jest.fn(() => ({
    get: getMock,
    update: jest.fn().mockResolvedValue(),
    delete: jest.fn().mockResolvedValue(),
  }));
  const collectionMock = jest.fn(() => ({ doc: docMock }));
  return {
    initializeApp: jest.fn(),
    firestore: () => ({ collection: collectionMock }),
    __esModule: true,
    getMock,
    docMock,
    collectionMock,
  };
});

const { app } = require('../index');
const admin = require('firebase-admin');

const mockDocData = { title: 'test', category: '', meta: {}, tags: [] };

beforeEach(() => {
  admin.getMock.mockReset();
  admin.getMock.mockResolvedValue({ exists: true, id: '1', data: () => mockDocData });
});

describe('GET /api/pages/:id', () => {
  test('missing id -> 400', async () => {
    const res = await request(app).get('/api/pages/');
    expect(res.statusCode).toBe(400);
  });

  test('not found -> 404', async () => {
    admin.getMock.mockResolvedValue({ exists: false });
    const res = await request(app).get('/api/pages/abc');
    expect(res.statusCode).toBe(404);
  });

  test('ok -> 200', async () => {
    const res = await request(app).get('/api/pages/abc');
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('test');
  });
});

describe('PUT /api/pages/:id', () => {
  test('missing title -> 400', async () => {
    const res = await request(app).put('/api/pages/abc').send({});
    expect(res.statusCode).toBe(400);
  });
});

describe('DELETE /api/pages/:id', () => {
  test('not found -> 404', async () => {
    admin.getMock.mockResolvedValue({ exists: false });
    const res = await request(app).delete('/api/pages/abc');
    expect(res.statusCode).toBe(404);
  });
});
