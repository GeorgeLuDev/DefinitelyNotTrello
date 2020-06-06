const express = require('express');

const app = express();


app.get('/api/customers', (req, res) => {
	const customers = [
		{id: 1, firstName: 'John', lastName: 'Doe'},
		{id: 2, firstName: 'Chris', lastName: 'Smith'},
		{id: 3, firstName: 'Matt', lastName: 'Johnson'},
		{id: 4, firstName: 'Francis', lastName: 'Fermo'}
	];

	console.log('Bin hit');

	res.json(customers);
});

const port = 5000;

app.listen(port, () => console.log('Server started on port ${port}'));
