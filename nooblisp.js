  
  
nooblisp={};

isArray=function(obj) {
  return obj.constructor == Array;
}

nooblisp.memory={
  "plus":function(a,b){return a+b;},
  "minus":function(a,b){return a-b;},
  "times":function(a,b){return a*b;},
  "div":function(a,b){return a/b;},
  "eq":function(a,b){return a===b;},
  "lt":function(a,b){return (a<b);},
  "gt":function(a,b){return (a>b);},
  "set":function(k,v){this.memory[k]=v;},
  "get":function(k){return (this.memory[k] ? this.memory[k] : false); },
  "pass":function(val){return val;},
  "incr":function(k){return this.memory[k]++;},
  "decr":function(k){return this.memory[k]--;},
  "print":function(v){document.write(v);},
};



nooblisp.exec=function(a){
  if (a[0]=="if"){
    if (!a[3]){
      a[3]=false;
    }
    var res=this.exec(a[1]);
    return (res ? this.exec(a[2]) : this.exec(a[3]));
  }else if (a[0]=="while"){
    while (this.exec(a[0])){
      this.exec(a[1]);
    }
  }else if (typeof a[0]=="string"){
    if (typeof this.memory[a[0]]=="function"){
      var cb=this.memory[a[0]];
      var argz=[];
      var ret=false;
      for (i=1;i<a.length;i++){
        if (isArray(a[i])){
          argz.push(this.exec(a[i]));
        }else{
          argz.push(a[i]);
        }
      }
      ret=cb.apply(this,argz);
      return ret; 
    }else{
      return false;
    } 
  }else if (typeof a[0]=="object" && isArray(a[0])){
    res="arr";
    for (var p=0;p<a.length;p++){
      res=this.exec(a[p]);
    }
    return res;
  }
  //return a;
}
