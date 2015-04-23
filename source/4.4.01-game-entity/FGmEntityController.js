 //==========================================================
// <T>游戏实例控制器。</T>
//
// @class
// @author maocy
// @history 150419
//==========================================================
function FGmEntityController(o){
   o = RClass.inherits(this, o, FComponent);
   //..........................................................
   // @attribute
   o._entity    = null;
   //..........................................................
   // @method
   o.construct  = FGmEntityController_construct;
   // @method
   o.linkEntity = FGmEntityController_linkEntity;
   o.process    = FGmEntityController_process;
   // @method
   o.dispose    = FGmEntityController_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FGmEntityController_construct(){
   var o = this;
   o.__base.FComponent.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
// @param entity:FGmEntity 实例
//==========================================================
function FGmEntityController_linkEntity(entity){
   var o = this;
   o._entity = entity;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FGmEntityController_process(){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FGmEntityController_dispose(){
   var o = this;
   // 父处理
   o.__base.FComponent.dispose.call(o);
}
