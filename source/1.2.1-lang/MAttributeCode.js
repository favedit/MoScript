//==========================================================
// <T>属性代码接口。</T>
//
// @face
// @author maocy
// @history 150419
//==========================================================
function MAttributeCode(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @attribute
   o._code   = null;
   //..........................................................
   // @method
   o.code    = MAttributeCode_code;
   o.setCode = MAttributeCode_setCode;
   return o;
}

//==========================================================
// <T>获得代码。</T>
//
// @return String 代码
//==========================================================
function MAttributeCode_code(){
   return this._code;
}

//==========================================================
// <T>设置代码。</T>
//
// @param code:String 代码
//==========================================================
function MAttributeCode_setCode(code){
   this._code = code;
}
