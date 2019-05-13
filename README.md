
# testing with Mocha
* mocha uses GlOBALS ( reduces boilerplate, a developer erogonomics )
* unit testing is testing a function in a file
* intergration tests, test multiple units in one test to see if it works together. 
* mocha doesnt have any assertion functionality it uses Node's assert module
* supertest for intergration tests against Express servers
$ `npm install -D mocha supertest`

## a Unit Test File
$ mkdir test
$ cd test
$ touch <name-of-file>.spec.js


## the UNIT TEST
* use Node.js's assert module 
* also require the file you are testing. 
```
const assert = require('assert');
const requestTime = ('../path-to-file');
```
### create a Suite and test
* describe (title, callback) creates a suite
* a test 
  - it (title, callback);
* try to have one assertion per test. 
* describe if true
* describe if false

```
// test /request-time.spec.js
describe('requestTime middleware', funtion() {
  it ('should add a 'requestTime property to the req parameter', function() {
    const req = {};
    requestTime(req,null,()=>{});
    assert.ok(req.reqestTime > 0)
  })
})
```


## the INTERGRATION TEST
* not only does a funciton work but the whole system works.
* example code
``` 
  const express = require('express');
  const app = express();
  app.use(requre('./lib/request-time));
  app.get('/unix-timestamp', (req,res) => {
    rew.json({
      timestamp: Math.floor(req.requestTime /1000 )
    });
  });
  if (require.main === module) {
    app.listen(3000 , () => {
      console.log('Example app listening on port 3000!);
    })
  }
```

### creating the test
``` 
const assert = require('assert');
const app = require('../App');
const request = require('supertest');
describe('GET /unix-timestamp', function () {
  it('should respond with JSON object containing timestamp', function (done) {
    //assertion goes here
  })
})
```

* NODEBACK style ( not good but do able)
  - async mocha test
  - if you have async functions it will return the tests in order
```
 it('should respond with JSON object containing timestamp', funciton(done){
   request(app).get('/unix-timestamp')
    .expect(200).end((err,res)) => {
      if(err) {
        return done(err);
      }
    }
    assert.ok(res.body.timestamp < 1e10);
    done()
 })
```

* PROMISE STYLE

```
it('should respond wiht JSON object containing timestamp, function() {
  function () {
    return request(app).get('/unix-timestamp')
      .expect(200)
      .then(res => {
        assert.ok(res.body.timestamp < 1e10);
      });
  }
})
```