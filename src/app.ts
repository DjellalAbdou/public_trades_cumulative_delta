import KEYS from '@config/keys';
import server from './server';

const PORT = Number(KEYS.PORT) || 5001;

// ! if we use kubernetes, do not remove 0.0.0.0 so that liveness probe would work
server.listen(PORT, '0.0.0.0', async () => {
    console.log(`app now listening for requests on port ${PORT}`);
});
