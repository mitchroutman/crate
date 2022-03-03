const express = require('express');
const session = require('express-session');
const exphbs =  require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(methodOverride('_method'));
//Setup routes to the Server
//Look at /controllers folder
app.use('/', routes);

sequelize.sync({ force: false }).then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`)
    });
});
