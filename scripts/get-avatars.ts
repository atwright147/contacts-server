import { createWriteStream } from 'fs';
import path from 'path';
import stream from 'stream';
import { promisify } from 'util';
import { fakerEN_GB as faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import got from 'got';

const IMAGE_FOLDER = path.resolve(path.join('assets', 'images', 'avatars'));
fs.ensureDirSync(IMAGE_FOLDER);
fs.emptyDirSync(IMAGE_FOLDER);

const pipeline = promisify(stream.pipeline);

dotenv.config();

faker.seed(1234567);

const QUANTITY = Number(process.env.QUANTITY_CONTACTS ?? 10);

(async (): Promise<void> => {
  for (let index = 1; index <= QUANTITY; index++) {
    const avatarUrl = faker.image.avatar();
    const downloadStream = got.stream(avatarUrl);
    const fileWriterStream = createWriteStream(path.join(IMAGE_FOLDER, `${index}.jpg`));

    downloadStream.on('downloadProgress', ({ transferred, total, percent }) => {
      const percentage = Math.round(percent * 100);
      console.error(`progress: ${transferred}/${total} (${percentage}%)`);
    });

    try {
      await pipeline(downloadStream, fileWriterStream);
      console.log(`Avatar downloaded for Contact ID ${index}}`);
    } catch (error) {
      console.error(`Something went wrong. ${(error as Error).message}`);
    }
  }
})();
