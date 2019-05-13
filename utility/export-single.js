module.exports = function bar(req,res){ 
  req.logger = Date.now();
}
