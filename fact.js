var bint=require("bint")
var next={"2":"3"}

exports.factors=factors
exports.factor=factor
exports.isprime=isprime
exports.np=np

function factors(n){
   var f=[]
   for(var k=new bint(0);n.gt(1);n=n.div(k)){
      k=factor(n);
      var ks=k.toString();
      f[ks]++||(f[ks]=1);
      }
   var s=""
   for(var i in f)
       s+=(s.length?"*":"")+i+(f[i]>1?("^"+f[i]):"")
   return s
   }

function factor(n){
   //if(++z>20) process.exit()
   //ol("factor ",n)
   for(var i=new bint(2),j=new bint(4); j.le(n); j=j.add(i.add(i.add(1))),i=np(i)){
      var k=n.div(i)
      //ol("divs n=",n," i=",i," j=",j," k=",k," rem=",bint.remainder)
      if(bint.remainder.ez) return i
      }
   //ol("return ",n)
   return n
   }
 
function isprime(n){
   //ol("isprime ",n)
   return n.gt(1) && factor(n).eq(n)
   }

function np(n){
   if(n.toString() in next) return new bint(next[n])
   var i
   for(i=n.add(2);!isprime(i);i=i.add(2)){} 
   //if(progress) o(("        "+i).match(/.{8}$/)+"\r")
   next[n.toString()]=i.toString()
   return i
   }

