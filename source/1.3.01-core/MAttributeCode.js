with(MO){
   //==========================================================
   // <T>属性代码接口。</T>
   //
   // @face
   // @author maocy
   // @history 150419
   //==========================================================
   MO.MAttributeCode = function MAttributeCode(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @attribute
      o._code   = null;
      //..........................................................
      // @method
      o.isCode  = MAttributeCode_isCode;
      o.code    = MAttributeCode_code;
      o.setCode = MAttributeCode_setCode;
      return o;
   }

   //==========================================================
   // <T>判断是否指定代码。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.MAttributeCode_isCode = function MAttributeCode_isCode(code){
      return this._code == code;
   }

   //==========================================================
   // <T>获得代码。</T>
   //
   // @method
   // @return String 代码
   //==========================================================
   MO.MAttributeCode_code = function MAttributeCode_code(){
      return this._code;
   }

   //==========================================================
   // <T>设置代码。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.MAttributeCode_setCode = function MAttributeCode_setCode(code){
      this._code = code;
   }
}
