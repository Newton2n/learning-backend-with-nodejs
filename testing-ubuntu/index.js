const http = require("http")
console.log("Wsl with ubuntu test");
function common(params, params2) {
  return params + params2;
}
const es = (a,b)=> a +b
console.log(common(2,5))
console.log(es(2,89))