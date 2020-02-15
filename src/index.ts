import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
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

app.listen(process.env.PORT, () => {
   console.log('listen neko back: ' + process.env.PORT)
});