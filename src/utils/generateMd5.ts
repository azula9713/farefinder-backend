import { createHash } from 'crypto';

const generateMd5Key = (data: string) => {
  try {
    return createHash('md5').update(data).digest('hex');
  } catch (error) {
    throw error;
  }
};

export default generateMd5Key;
