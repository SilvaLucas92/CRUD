const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mainRoutes = require('./routes/mainRoutes');

app.listen(process.env.PORT || 3000 ,()=>{
    console.log("Servidor corriendo en el puerto 3000")
});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use('/', mainRoutes);