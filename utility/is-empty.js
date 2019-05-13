const isEmpty = (value) => 
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value) === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

const another = ()=>{console.log('another function')}
module.exports = {isEmpty, another};