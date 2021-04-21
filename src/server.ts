import { APP } from './app';

const PORT = 3000;

APP.listen(PORT, () => console.info(`Contacts server listening on port ${PORT}`));
