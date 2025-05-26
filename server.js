const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const customerRoutes = require('./routes/customerRoutes'); 

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/api/customers', customerRoutes);

app.listen(3000, () => {
  console.log('✅ CRM API running at http://localhost:3000');
});
