module.exports={

o: function(){ // all args contiguous
   process.stdout.write([].join.call(arguments,""))
   },

ol: function(){ // all args contiguous plus a newline
   process.stdout.write([].join.call(arguments,""))
   process.stdout.write("\n")
   },

os: function(s){ // args separated by first arg
   process.stdout.write([].slice.call(arguments,1).join(s))
   },

ot: function(s){ 
// args separated by first arg 
// and terminated by last arg 
   process.stdout.write([].slice.call(arguments,1,-1).join(s))
   process.stdout.write(arguments[arguments.length-1])
   }

}