const app = require('express')();
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const routes = require('./routes');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', routes);

app.listen(3000);