// generic composition
/*
const pipe = (...fns) =>
  x => fns.reduce((v, f) => f(v), x);
*/

function pipe(...fns) {
  // TODO: rewrite above reduce to for cycle
  // urcite to bude vracat funkciu
  // len ju nejako musite poskladat
  // ako ? musite vediet precitat ten reduce hore
  let r=function(v){
    for(let i = 0; i < fns.length; i++) {
      v = fns[i](v);
    }
    return v;
  };
  return r;
}
module.exports = pipe;
//npx mocha test --grep=01


// ------------- TESTS -------------------------------
process.env.SELF_TEST && (() => {
  console.error(`[self test]:${__filename}:...`)

  const assert = require("assert");

  const a = (v) => `a(${v})`
  const b = (v) => `b(${v})`
  const c = (v) => `c(${v})`

  assert.equal(pipe(a, b, c)("x"), "c(b(a(x)))");

  assert.equal(pipe(a)("x"), "a(x)");

  console.error(`[self test]:${__filename}:OK`)
})();
