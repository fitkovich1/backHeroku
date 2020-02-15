import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import  mongoose from 'mongoose';
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

app.use((req: Request, res: Response, next: NextFunction) => {
   console.log('Time: ', new Date().toString());
   console.log(req.method, req.url, 'params:', req.params);
   console.log('query:', req.query);
   console.log('body:', req.body);
   console.log('cookies:', req.cookies);
   // console.log('headers:', req.headers);
   // console.log('rawHeaders:', req.rawHeaders);
   next();
});

const fakeState = {
   counter: 0,
};
const someRouter = express.Router();
someRouter.get('/y', (req:Request, res:Response) => {
   fakeState.counter += 1;
   res.status(200).json({z:1, count: fakeState.counter})
});

app.use('/x', someRouter);

mongoose.connect('mongodb+srv://fitkovich1:1793001427901byfly@cluster0-5zgnh.mongodb.net/fake_data?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
       console.log('status: 200');
       app.listen(process.env.PORT, () => {
          console.log('listen neko back: ' + process.env.PORT)
       });
}).catch(e => console.log('error connection' + e));

