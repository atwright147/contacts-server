/* eslint-disable @typescript-eslint/no-explicit-any */

import faker from 'faker';
import dotenv from 'dotenv';
import got from 'got';
import { createWriteStream } from 'fs';
import stream from 'stream';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs-extra';

const IMAGE_FOLDER = path.resolve('avatars');
fs.ensureDirSync(IMAGE_FOLDER);
fs.emptyDirSync(IMAGE_FOLDER);

const pipeline = promisify(stream.pipeline);

dotenv.config();

faker.seed(1234567);
faker.locale = 'en_GB';

const QUANTITY = process.env.QUANTITY_CONTACTS ?? 10;

export async function seed(): Promise<void> {
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
}
