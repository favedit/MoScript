with(MO){
   //==========================================================
   // <T>名称和内容的关联保存表的工具类。</T>
   //
   // @reference
   // @author maocy
   // @version 141229
   //==========================================================
   MO.TDictionary = function TDictionary(){
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
   MO.TDictionary_dump = function TDictionary_dump(){
      var info = new TString();
      var count = this._count;
      info.append(MO.Runtime.className(o), ': ', count);
      if(count > 0){
         info.append(' {\n');
         for(var i = 0; i < count; i++){
            info.append('   ', this._names[i], '=[', this._values[i], ']\n');
         }
         info.append('}');
      }
      return info.flush();
   }
}
