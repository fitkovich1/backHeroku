"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: false }));
app.use((req, res, next) => {
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
const someRouter = express_1.default.Router();
someRouter.get('/y', (req, res) => {
    fakeState.counter += 1;
    res.status(200).json({ z: 1, count: fakeState.counter });
});
app.use('/x', someRouter);
mongoose_1.default.connect('mongodb+srv://fitkovich1:1793001427901byfly@cluster0-5zgnh.mongodb.net/fake_data?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('status: 200');
    app.listen(process.env.PORT, () => {
        console.log('listen neko back: ' + process.env.PORT);
    });
}).catch(e => console.log('error connection' + e));
//# sourceMappingURL=index.js.map