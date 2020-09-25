const { Router } = require('express');
const { socket } = require('../../services/socketio');

const router = Router();

router.get('/', (req, res) => {

	console.log(socket);

	socket.send('testing');

	return res.send();
});

module.exports = router;
