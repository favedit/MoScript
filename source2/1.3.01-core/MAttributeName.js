with(MO){
   //==========================================================
   // <T>属性名称接口。</T>
   //
   // @face
   // @author maocy
   // @history 150411
   //==========================================================
   MO.MAttributeName = function MAttributeName(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @attribute
      o._name   = null;
      //..........................................................
      // @method
      o.name    = MAttributeName_name;
      o.setName = MAttributeName_setName;
      return o;
   }

   //==========================================================
   // <T>获得名称。</T>
   //
   // @return String 名称
   //==========================================================
   MO.MAttributeName_name = function MAttributeName_name(){
      return this._name;
   }

   //==========================================================
   // <T>设置名称。</T>
   //
   // @param name:String 名称
   //==========================================================
   MO.MAttributeName_setName = function MAttributeName_setName(name){
      this._name = name;
   }
}
