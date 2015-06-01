//===========================================================
// Pack操作类
//
// @reference
// @author maochunyang
// @version 1.0.1
//===========================================================
var RPack = new function(o){
   if(!o){o=this};
   // Method
   o.pack        = RPack_pack;
   o.packString  = RPack_packString;
   o.unpack      = RPack_unpack;
   o.packStyle   = RPack_packStyle;
   o.unpackStyle = RPack_unpackStyle;
   o.parseLink   = RPack_parseLink;
   o.unpackLink  = RPack_unpackLink;
   o.split       = RPack_split;
   // Construct
   RMemory.register('RPack', o);
   return o;
}

//===========================================================
//
//===========================================================
function RPack_pack(){
   var g = arguments;
   var c = g.length;
   if(0 != (c % 2)){
      return alert('pack error. length='+c);
   }
   var a = new TAttributes();
   for(var n=0;n<c;n+=2){
      a.set(g[n], g[n+1]);
   }
   return a;
}

//===========================================================
//
//===========================================================
function RPack_packString(){
   var g = arguments;
   var c = g.length;
   if(0 != (c % 2)){
      return alert('pack error. length='+c);
   }
   var a = new TAttributes();
   for(var n=0;n<c;n+=2){
      a.set(g[n], g[n+1]);
   }
   return a.pack();
}

//===========================================================
//
//===========================================================
function RPack_unpack(s){
   var a = new TAttributes();
   a.unpack(s);
   return a;
}

//===========================================================
//
//===========================================================
function RPack_packStyle(map){
   var pack = new TString();
   if(map){
      var count = map.count;
      for(var n=0; n<count; n++){
         if(n > 0){
            pack.append(';');
         }
         pack.append(map.name(n));
         pack.append(':');
         pack.append(map.value(n));
      }
   }
   return pack.toString();
}

//===========================================================
//
//===========================================================
function RPack_unpackStyle(map, pack){
   if(map && pack){
      var subs = pack.split(/;/g);
      var count = subs.length;
      for(var n=0; n<count; n++){
         if(subs[n]){
            var sub = subs[n].split(/:/g);
            if(sub.length == 2){
               map.set(RString.trim(sub[0]), RString.trim(sub[1]));
            }
         }
      }
   }
}

//===========================================================
// attributes, value
//
//===========================================================
function RPack_parseLink(as, v){
   if(v && as && v.indexOf('${') == 0 && v.indexOf('}') == v.length-1){
      return as.get(v.substring(2, v.length-1));
   }
   return v;
}

//===========================================================
// link, attributes
//
//===========================================================
function RPack_unpackLink(link, as){
   if(link){
      var pk = new TAttributes();
      var subs = link.split(/,/g);
      for(var n=0; n<subs.length; n++){
         var sub = subs[n];
         if(sub){
            var is = sub.split(/=/g);
            if(is.length == 2){
               pk.set(RString.trim(is[0]), this.parseLink(as, RString.trim(is[1])));
            }
         }
      }
      return pk;
   }
}

//===========================================================
// source, 
//
//===========================================================
function RPack_split(s, a, b){
   var rs = new TAttributes();
   var subs = s.split(a);
   for(var n=0; n<subs.length; n++){
      var sub = subs[n].split(b);
      if(sub.length == 2){
         rs.set(sub[0], sub[1]);
      }else{
         rs.set(sub, null);
      }
   }
   return rs;
}


