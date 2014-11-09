module.exports=bint

function bint(n){  
   if(!(this instanceof bint))
      return new bint(n);
   this.a=n.toString()
   }
bint.remainder=null
bint.prototype.lte=function(b,c){ // c=true for <=, false for <
// background function for lt() and le()
   if(this.a.lz){
      if(!b.lz) return true
      } 
   else
      if(b.lz) return false
   var la=this.a.length
   var lb=b.a.length
   if(la!=lb) return la<lb
   for(var i=0; i<la; i++){
      var ca=this.a[i]
      var cb=b.a[i]
      if(ca!=cb)
         return ca<cb
      }
   return c
   }
bint.prototype.lt=function(b){
   if(!(b instanceof bint)) b=new bint(b)
   return this.lte(b,false) // a<b
   }
bint.prototype.le=function(b){
   if(!(b instanceof bint)) b=new bint(b)
   return this.lte(b,true) // a<=b
   }
bint.prototype.eq=function(b){
   if(!(b instanceof bint)) b=new bint(b)
   return this.a==b.a 
   }
bint.prototype.gt=function(b){
   if(!(b instanceof bint)) b=new bint(b)
   return b.lt(this) 
   }
bint.prototype.ge=function(b){
   if(!(b instanceof bint)) b=new bint(b)
   return b.le(this) 
   }

bint.prototype.toString=function(){
   return this.a
   }


bint.prototype.add=function(b){
   if(!(b instanceof bint)) b=new bint(b)
   // hand off negative a
   if(this.lz) return this.mod.subtract(b).neg
   // positive a; hand off negative b
   if(b.lz) return this.subtract(b.mod)
   
   // this and b both >= 0
   var na=this.a.length-1
   var nb=b.a.length-1
   var n=na>nb?na:nb
   var s=""
   var c=0
   for(var i=0; i<=n; i++){
      var j=na>=i?Number(this.a[na-i]):0   // use a[na-1]
      var k=nb>=i?Number(b.a[nb-i]):0
      var x=j+k+c
      if(x>9){
         x=x-10
         c=1
         }
      else
         c=0
      s=x.toString()+s
      }
   if(c) s="1"+s
   //console.log("add "+this.a+"+"+b.a+" = "+s)
   return new bint(s)
   }

bint.prototype.subtract=function(b){
   if(!(b instanceof bint)) b=new bint(b)
   // hand off negative a
   if(this.lz) return this.mod.add(b).neg
   // positive a; hand off negative b
   if(b.lz) return this.add(b.mod)
   // positive a and b;  a < b - invert
   if(this.lt(b)) return b.subtract(this).neg

   // now this >= b >= 0 
   var na=this.a.length-1
   var nb=b.a.length-1
   var n=na // na >= nb always
   var s=""
   var c=0
   for(var i=0; i<=n; i++){
      var j=na>=i?Number(this.a[na-i]):0
      var k=nb>=i?Number(b.a[nb-i]):0
      var x=j-k-c
      if(x<0){
         x=x+10
         c=1
         }
      else
         c=0
      s=x.toString()+s
      }
   if(c){
      console.log(this.a+".subtract("+b.a+") error. s="+s+" c="+c)
      process.exit(0)
      }
   while(s[0]=="0" && s.length>1)
      s=s.substr(1)
   return new bint(s)
   }


bint.prototype.mul=function(b){
   if(!(b instanceof bint)) b=new bint(b)
   if(this.lz) return this.neg.mul(b).neg
   if(b.lz) return this.mul(b.neg).neg
   if(this.zer || b.zer) return new bint(0)

   var n1=this.a.length-1
   var n2=b.a.length-1
   var s=""
   var c=0
   for(var i=0; i<=n1+n2; i++){
      for(var j=0; j<=i; j++){
         var p1=n1-j
         var p2=n2-i+j
         var k1=(p1>=0 && p1<=n1)?Number(this.a[p1]):0
         var k2=(p2>=0 && p2<=n2)?Number(b.a[p2]):0
         c+=(k1*k2)
         }
      var x=c%10
      c=(c-x)/10
      s=x.toString()+s
      }
   if(c>0) s=c.toString()+s
   return new bint(s)
   }

// divide a by b. no remainder
bint.prototype.div=function(b){
   if(!(b instanceof bint)) b=new bint(b)
   if(this.lz) return this.neg.div(b).neg
   if(b.lz) return this.div(b.neg).neg
   if(this.zer || b.zer) return new bint(0)
   if(this.lt(b)) return new bint(0)
   
   var la=this.a.length-1
   var lb=b.a.length-1
   var t=new bint(this.a.substr(0,lb))
   var d=""
   //var z=0
   //console.log(this.a+".subtract("+b.a+") t="+t)
   for(var i=lb; i<=la; i++){
      if(t.a=="0")
         t.a=this.a[i]
      else
         t.a+=this.a[i]
      var k=0
      while(b.le(t)){
         //console.log("k="+k+" t="+t)
         k++
         t=t.subtract(b)
         }
      if(k!=0 || d!="") d+=k.toString()
      //if(z++<30)console.log(i+" "+t.a+" "+d+" "+k)
      }
   bint.remainder=t
   return new bint(d)
   }


Object.defineProperties(bint.prototype,{
   lz:{
      get: function(){
         return this.a[0]=="-"
         }
      },
   gez:{
      get: function(){
         return this.a[0]!="-"
         }
      },
   ez:{
      get: function(){
         return this.a=="0" 
         }
      },
   mod:{
      get: function (){
         return new bint(this.lz?this.a.substr(1):this.a) // |a|
         }
      },
   neg:{
      get: function (){
         return this.lz?this.mod:(this.a=="0")?new bint(0):new bint("-"+this.a) // -a
         }
      },
   sq:{
      get: function (){
         return this.mul(this) // a*a
         }
      },
   val:{
      get: function(){
         return Number(this.a)
         }
      }
   })
