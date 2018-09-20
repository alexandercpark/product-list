const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_number_between_two_values#Getting_a_random_integer_between_two_values
function _getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function _createRandomReviews(productId) {
  let reviews = [];

  for (let i = 0; i < _getRandomInt(2,4); i++)
    reviews.push({
      userName: faker.internet.userName(),
      text: faker.random.words(_getRandomInt(2,5)),
      product: productId
    })
  
  return reviews;
}

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product({
      category: faker.commerce.department(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: `https://picsum.photos/200/300/?image=${_getRandomInt(1, 200)}`
    })

    product.reviews = _createRandomReviews(product.id);

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

router.get('/products', (req, res, next) => {
  const perPage = 9

  // return the first page by default
  const page = req.query.page || 1

  let filter = {};
  
  //optional category filtering
  filter = req.query.category ? {...filter, category:req.query.category} : {}
  //optional name filtering
  var nameRegex = new RegExp(req.query.name);
  console.log(nameRegex);
  filter = req.query.name ? {...filter, name: {$regex: nameRegex, $options: 'i'}} : filter

  console.log(filter);
  //optional sorting
  const sort = {};
  switch(req.query.price) {
    case "lowest":
      sort.price = "asc"
      break;
    case "highest":
      sort.price = "desc"
      break;
  }

  Product
    .find(filter)
    //sort first, if we sort after pagination then the will only sort on a subset
    //of the data rather than the entire dataset
    .sort(sort)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      if (err)
        return next(err)

      res.send(products)
    })
})

router.get('/products/categories', (req, res, next) => {
  Product.distinct("category", (error, categories) => {
    res.send(categories)
  })
})

router.get('/products/count', (req, res, next) => {
  let filter = req.query.category ? {category:req.query.category} : {}
  Product.count(filter, (error, count) => {
    if(error)
      return next(error);
    
    res.send({count})
  })
})

router.get('/products/:productId', (req, res, next) => {
  Product.findById(req.params.productId, (err, product) => {
    if (err)
      res.status(404)

    res.send(product)
  });

});

router.post('/products', (req, res, next) => {
  let product = new Product(req.body);
  product.save().then(() => {
    res.json(product);
  })
});

router.post('/:productId/reviews', (req, res, next) => {
    Product.findByIdAndUpdate(req.params.productId, {$push: {reviews: req.body}}, (err, product) => {
      if(err)
        return next(err);
      
      res.json(product);
    });
});

router.delete('/products/:productId', (req, res, next) => {
  Product.findByIdAndRemove(req.params.productId, (err, product) => {
    if (err)
      return next(err)
    
    res.send(product);
    });
});

router.get('/reviews', (req, res, next) => {
  let page = req.query.page || 1
  let perPage = 40

  //instructions say to go through the product
  //but it is much easier to go through the reviews...
  Product.find({}, (err, products) => {
    if(err)
      res.status(500).send(err);
    
    //only get the reviews
    let reviews = products.map(product => product.reviews)
    //wrap up into a single array
                          .reduce((acc, cur) => acc.concat(cur), [])
    //pagination
                          .slice((perPage * page) - perPage, (perPage * page));
    res.json(reviews);
  })
});

router.delete('/reviews/:reviewId', (req, res, next) => {
  let mongoOperation = {
    $pull: {
      reviews: {
        _id: req.params.reviewId
      }
    }
  };

  Product.update({}, mongoOperation, (err, result)=> {
    if(err)
      return next(err);
    
    //send a 200 back, the result is basically garbage output
    res.send();
  });
});

module.exports = router