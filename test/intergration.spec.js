const {assert} = require('chai');
const supertest = require('supertest');
const app = require('../index')

const data = {
  name: 'wolfie',
  newName: 'Wolfie Truong',
  people: []
}

describe('intergration test for web server', ()=>{
  describe('routes tests', () => {
    it('POST /addPerson route should add a person to the collection', (done) => {
      supertest(app)
        .post('/addPerson')
        .send({name:data.name})
        .expect(200)
        .end((err,res) => {
          if(err) { return done(err) }
          let response = {
            name: data.name
          }
          assert.equal(res.body.name, response.name, `should return a json with value ${response.name}`);
          done();
        })
    })

    it('GET /people route should return array of people', (done)=>{
      supertest(app)
        .get('/people')
        .expect(200)
        .end((err,res)=>{
          if (err) {
            return done(err)
          }
          assert.typeOf(res.body, 'array', "should return all people");
          done();
        })
    })

    it('POST /updatePerson should update a person', (done) => {
      supertest(app)
        .post('/updatePerson')
        .send(data)
        .expect(200)
        .end((err, res) => {
        if (err) {
          return done(err)
        }
        assert.equal(res.body.msg, `person has been updated to ${data.newName}`, "should return json with msg")
        done()
      })
    })

    it('POST /deletePerson should delete a person', (done) =>{
      supertest(app)
        .post('/deletePerson', data.newName)
        .expect(200)
        .end((err,res) => {
          if (err) {
            return done(err)
          }
        assert.equal(res.body.msg, "person has been deleted")
        done()
        })
    })
  })
})