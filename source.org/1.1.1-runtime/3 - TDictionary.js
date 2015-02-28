//==========================================================
// <T>名称和内容的关联保存表的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
function TDictionary(o){
   var o = this;
   TMap.call(o);
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
      for(var i = 0; i < c; i++){
         r.append('   ', o._names[i], '=[', o._values[i], ']\n');
      }
      r.append('}');
   }
   return r.flush();
}
