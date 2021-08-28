const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
  });

const db = require('./queries');

app.post('/api/create', db.createEmployee);
app.get('/api/distinct_departments', db.list_distinct_departments);
app.get('/api/salary_above_tenlakhs', db.salary_above_tenlakhs);
app.get('/api/employees', db.getall);
app.put('/api/Update/:id', db.updateEmployee);
app.delete('/api/Delete', db.deleteDepartment);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });
