const Environment = require('./Environment.js');
const TokenStream = require('./TokenStream.js');
const InputStream = require('./InputStream.js');
const evaluate = require('./evaluator.js');
const parse = require('./parser.js');

const createEnv = function(){
  const env = new Environment();

  env.def('תזמן', function(func) {
    try {
      console.time('תזמן');
      return func();
    } finally {
      console.timeEnd('תזמן');
    }
  });

  env.def('הדפס', console.log);
  return env;
};

const evalStr = function(code){
  const env = createEnv();
  const ast = parse(TokenStream(InputStream(code)));
  return evaluate(ast, env);
};

// evalStr('הדפס("טוק טוק")')
module.exports = { eval: evalStr };
