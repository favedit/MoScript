//==========================================================
// <T>名称和内容的关联保存表的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
function TDictionary(o){
   if(!o){o = this;}
   TMap(o);
   //..........................................................
   // @method
   o.dump = TDictionary_dump;
   return o;
}


//==========================================================
// <T>获得数组的内部信息。</T>
//
// @method
// @return String 字符串
//==========================================================
function TDictionary_dump(){
   var o = this;
   var r = new TString();
   var c = o._count;
   r.append(RRuntime.className(o), ': ', c);
   if(c > 0){
      r.append(' {\n');
      for(var n = 0; n < c; n++){
         r.append('   ', o._names[n], '=[', o._values[n], ']\n');
      }
      r.append('}');
   }
   return r.toString();
}
