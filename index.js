// code for adding all files except node modules (git add --all -- :!node_modules) 
// this was used git push origin main --force when I did reset of commits 

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session'); // for encrypting cookies 
const passport = require('passport');
const passportLocal = require('./config/passport-local-stra');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware') // compi. sccs to css files
const flash = require('connect-flash') // we need to use it afer session is created 
const customMware = require('./config/middleware') // this is accesed after app.use(flash) in this file 

app.use(sassMiddleware({ // we always need to use before server starts
    src: './assets/scss', 
    dest: './assets/css', // where we need to put our css files after scss are compliedto css
    debug: true,
    outputStyle: 'extended', // do we want it in single line or multi. line
    prefix: '/css' // where my server should look for css files this will give /css as prefix so we give file loca. after this 
})) // this middleware will convert scss files to css which will be sent to server 

const mongoStoreInstance = MongoStore.create({
    mongoUrl: 'mongodb://localhost/test-app', // replace with your MongoDB connection string
    collectionName: 'sessions' // optional
});

app.use(express.urlencoded()); // for reading through post request 

app.use(cookieParser());

app.use(express.static('./assets'));

// make the upload path available  to the browser 
app.use('/uploads',express.static(__dirname + '/uploads'))

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// MongoStore is used to store the session cookie in DB 
app.use(session({ // express-session
    name: 'codial', //name of the cookie
    // change the secrete before deployment in production mode 
    secret: 'blahblah', //this is encryption 
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100) // it is in milisec.
    },
    store: mongoStoreInstance
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash()) // used in users_contro
app.use(customMware.setFlash) // this is used in layout.ejs

// use express router
app.use('/', require('./routes'));  // error occured when it was written before app.use(passport.initialize()) these 

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
