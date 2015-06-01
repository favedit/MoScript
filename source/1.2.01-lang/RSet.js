with(MO){
   //============================================================
   // <T>集合管理类。</T>
   //
   // @reference
   // @author maocy
   // @version 141231
   //============================================================
   MO.RSet = function RSet(){
      var o = this;
      //..........................................................
      // @method
      o.contains       = RSet_contains;
      o.containsString = RSet_containsString;
      return o;
   }

   //===========================================================
   // <T>内容中是否含有指定数据。</T>
   //
   // @param v:value:Integer 内容
   // @param d:data:Integer 数据
   // @return Boolean 是否含有
   //===========================================================
   MO.RSet_contains = function RSet_contains(v, d){
      return (v & d) == d;
   }

   //===========================================================
   // <T>内容中是否含有指定数据。</T>
   //
   // @param v:value:String 内容
   // @param d:data:String 数据
   // @return Boolean 是否含有
   //===========================================================
   MO.RSet_containsString = function RSet_containsString(v, d){
      if((v != null) && (s != null)){
         return v.indexOf(s) != -1;
      }
      return false;
   }
   //..........................................................
   // 实例化内容
   MO.RSet = new RSet();
}
