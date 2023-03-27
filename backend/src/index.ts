import express from 'express';
import cors from 'cors'
import router from './routes/api';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/api', router);

const port = process.env.PORT || 3000;

app.listen(port);
console.log('Express WebApi listening on port ' + port);
