//==========================================================
// <T>缓冲对象接口。</T>
//
// @face
// @author maocy
// @history 150430
//==========================================================
function MPoolAble(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @attribute
   o._poolCode   = null;
   //..........................................................
   // @method
   o.poolCode    = MPoolAble_poolCode;
   o.setPoolCode = MPoolAble_setPoolCode;
   return o;
}

//==========================================================
// <T>获得缓冲代码。</T>
//
// @method
// @return String 缓冲代码
//==========================================================
function MPoolAble_poolCode(){
   return this._code;
}

//==========================================================
// <T>设置缓冲代码。</T>
//
// @method
// @param poolCode:String 缓冲代码
//==========================================================
function MPoolAble_setPoolCode(poolCode){
   this._poolCode = poolCode;
}
