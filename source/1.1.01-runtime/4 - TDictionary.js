//==========================================================
// <T>名称和内容的关联保存表的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.TDictionary = function TDictionary(){
   var o = this;
   MO.TMap.call(o);
   //..........................................................
   // @method
   o.sortByName = MO.TDictionary_sortByName;
   o.joinName   = MO.TDictionary_joinName;
   // @method
   o.dump       = MO.TDictionary_dump;
   return o;
}

//==========================================================
// <T>按照名称排序。</T>
//
// @method
//==========================================================
MO.TDictionary_sortByName = function TDictionary_sortByName(comparer, parameters){
   var o = this;
   MO.Runtime.pairSort(o._names, o._values, 0, o._count, comparer, parameters);
   o.rebuild();
}

//==========================================================
// <T>将内部所有名称关联成一个字符串。</T>
//
// @method
// @param split:String 分隔符
// @return String 字符串
//==========================================================
MO.TDictionary_joinName = function TDictionary_joinName(split){
   var o = this;
   var source = new MO.TString();
   var count = o._count;
   for(var i = 0; i < count; i++){
      if(i > 0){
         source.append(split);
      }
      source.append(o._names[i]);
   }
   return source.flush();
}

//==========================================================
// <T>获得数组的内部信息。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.TDictionary_dump = function TDictionary_dump(){
   var o = this;
   var result = new MO.TString();
   var count = o._count;
   result.append(MO.Runtime.className(o), ': ', count);
   if(count > 0){
      var names = o._names;
      var values = o._values;
      result.append(' {\n');
      for(var i = 0; i < count; i++){
         result.append('   ', names[i], '=[', values[i], ']\n');
      }
      result.append('}');
   }
   return result.flush();
}
