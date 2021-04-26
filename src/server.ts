import { APP } from './app';

const PORT = 3001;

APP.listen(PORT, () => console.info(`Contacts server listening on port ${PORT}`));
