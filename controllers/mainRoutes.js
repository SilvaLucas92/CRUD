const path = require('path');
const fs = require('fs')
const productsPath = path.join(__dirname, '../data/dataProducts.json');
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

const controller = {
    home: (req, res) => {
        res.render('../views/home', {
            product: productsData
        })
    },

    create: (req, res) => {
        res.render('../views/create')
    },

    store: (req, res) => {
        const idGenerator = () => {
            let lastProduct = productsData[productsData.length - 1];
            let lastId = lastProduct.id;
            return lastId + 1;
        };
        productsData.push({
            ...req.body,
            image: req.file? req.file.filename : null,
            id: idGenerator()
        });
        fs.writeFileSync(productsPath, JSON.stringify(productsData, null, ' '));
        return res.redirect('/');
    },

    detail: (req, res) => {
        let id = Number(req.params.id);
        let productFound = productsData.find(pdt => pdt.id === id);
        res.render('../views/detail', {
            product: productFound
        })
    },

    edit: (req, res) => {
        let id = Number(req.params.id);
        let productFound = productsData.find(pdt => pdt.id === id);
        res.render('../views/edit', {
            product: productFound
        })
    },

    update: (req, res) => {
        let id = Number(req.params.id);
        let updateProduct = productsData.map(pdt => {
            if(pdt.id === id){
                return {
                    ...pdt,
                    name: pdt.name? pdt.name : req.body.name,
                    description: pdt.description? pdt.description : req.body.description,
                    price: pdt.price? pdt.price :req.body.price,
                    image: req.file? req.file.filename : pdt.image
                }
            }
            return pdt;
        })
        fs.writeFileSync(productsPath, JSON.stringify(updateProduct, null, ' '));
        return res.redirect('/');
    },
    
    destroy: (req, res) => {
        let id = Number(req.params.id);
        let productToDelete = productsData.filter(pdt => pdt.id !== id);
        fs.writeFileSync(productsPath, JSON.stringify(productToDelete, null, ' '));
        return res.redirect('/');
    }
}

module.exports = controller;