import { Resource } from './resource';

type TestData = Record<string, string | number>;

describe('safe-resource', () => {
  let data: TestData;
  beforeEach(() => {
    data = {
      id: 1,
      info1: 'info1',
      info2: 'info2',
      info3: 'info3',
      sensitive: 'sensitive',
    };
  });

  describe('safe()', () => {
    describe('given valid args', () => {
      test('should return only safe properties', () => {
        const service = new Resource(data);

        expect(service.safe(['id', 'sensitive'])).toEqual({
          info1: 'info1',
          info2: 'info2',
          info3: 'info3',
        });
      });
    });

    describe('given invalid args', () => {
      test('should throw', () => {
        const service = new Resource(data);

        expect(() => service.safe('invalid' as any)).toThrowError('Invalid arg, should be an array');
      });
    });
  });
});
