with(MO){
   //==========================================================
   // <T>数据内容。</T>
   //
   // @reference
   // @author maocy
   // @version 150105
   //==========================================================
   MO.FContent = function FContent(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._name = null;
      //..........................................................
      // @method
      o.name  = FContent_name;
      return o;
   }

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return 名称
   //==========================================================
   MO.FContent_name = function FContent_name(){
      return this._name;
   }
}
