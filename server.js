const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser');


// prepopulate sample data
var products = [
    {
        id: 1,
        name: 'laptop'
    },
    {
        id: 2,
        name: 'phone'
    }
];


// to ensure newly added product id start from 3
var currentId = 2; 

// static folder setup
app.use(express.static(__dirname));

// setup bodyParser
app.use(bodyParser.json());

// setup routes
app.get('/products', function(req, res) {
    //res.send('hooked files properly');
    res.send({products: products});
});

app.post('/products', function(req, res) {
    const productName = req.body.name;
    currentId++;
    products.push({id: currentId, name: productName});
    res.send('Successfully created product');
});

app.put('/products/:id', function(req, res){
    const id      = req.params.id;
    const newName = req.body.newName;
 
    products.forEach(function(product, index){
        var found     = false;
        if(!found && product.id === Number(id)) {
            product.name = newName
            found = true;
        }
    });
    res.send('Successfully updated data');
});

app.delete('/products/:id', function(req, res){
    const id = req.params.id;
    products.forEach(function(product, index){
        var found = false;
        if(!found && product.id === Number(id)) {
            products.splice(index, 1);
        };  
    });
});


// server setup
const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
    console.log('Server started at port ' + PORT);
});