 //==========================================================
// <T>游戏实例控制器。</T>
//
// @class
// @author maocy
// @history 150419
//==========================================================
function FGmEntityMoveController(o){
   o = RClass.inherits(this, o, FGmEntityController);
   //..........................................................
   // @method
   o.construct  = FGmEntityMoveController_construct;
   // @method
   o.dispose    = FGmEntityMoveController_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FGmEntityMoveController_construct(){
   var o = this;
   o.__base.FGmEntityController.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FGmEntityMoveController_dispose(){
   var o = this;
   // 父处理
   o.__base.FGmEntityController.dispose.call(o);
}
