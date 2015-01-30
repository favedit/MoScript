//==========================================================
// <T>字符串列表的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
function TStrings(o){
   if(!o){o = this;}
   TList(o);
   // Method
   o.pack   = TStrings_pack;
   o.unpack = TStrings_unpack;
   return o;
}

//==========================================================
// <T>将表中所有数据连接成一个字符串。</T>
// <P>打包方式：(字符串长度的长度+字符串长度+字符串)+...。</P>
//
// @method
// @return String 打包字符串
//==========================================================
function TStrings_pack(){
   var o = this;
   var r = new TString();
   var c = o.count;
   for(var n = 0; n < c; n++){
      var s = o.get(n);
      var sl = s.length.toString();
      var sll = sl.length;
      sa = sll + sl + s;
      r.append(sa);
   }
   return r.toString();
}

//==========================================================
// <T>将一个打包字符串分解为所有子项。</T>
//
// @method
// @param p:pack:String 打包字符串
//==========================================================
function TStrings_unpack(p){
   var o = this;
   if(!RString.isEmpty(p)){
      var c = p.length;
      for(var n = 0; n < c;){
         var ll = parseInt(p.charAt(n++));
         var l = parseInt(p.substr(n, ll));
         n += ll; 
         var s = p.substr(n, l);
         n += l;
         o.push(s);
      }
   }
}
