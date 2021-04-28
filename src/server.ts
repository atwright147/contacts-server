import dotenv from 'dotenv';

import { APP } from './app';

dotenv.config();

const PORT = process.env.PORT ?? 3001;

APP.listen(PORT, () => console.info(`Contacts server listening on port ${PORT}`));
