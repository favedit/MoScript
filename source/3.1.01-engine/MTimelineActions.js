//==========================================================
// <T>时间线对象。</T>
//
// @class
// @author maocy
// @history 150710
//==========================================================
MO.MTimelineActions = function MTimelineActions(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._actions   = MO.Class.register(o, new MO.AGetter('_actions'));
   //..........................................................
   // @method
   o.construct  = MO.MTimelineActions_construct;
   // @method
   o.setup      = MO.MTimelineActions_setup;
   o.pushAction = MO.MTimelineActions_pushAction;
   o.process    = MO.MTimelineActions_process;
   // @method
   o.dispose    = MO.MTimelineActions_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MTimelineActions_construct = function MTimelineActions_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._actions = new MO.TObjects();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.MTimelineActions_setup = function MTimelineActions_setup(){
   var o = this;
}

//==========================================================
// <T>增加一个命令。</T>
//
// @method
// @param action:MTimelineAction 命令
//==========================================================
MO.MTimelineActions_pushAction = function MTimelineActions_pushAction(action){
   this._actions.push(action);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param context:STimelineContext 环境
//==========================================================
MO.MTimelineActions_process = function MTimelineActions_process(context){
   var o = this;
   // 处理命令集合
   var actions = o._actions;
   var count = actions.count();
   for(var i = count - 1; i >= 0; i--){
      var action = actions.at(i);
      if(!action.statusStart()){
         // 开始处理
         action.start();
      }else if(action.statusStop()){
         // 停止处理
         actions.erase(i);
         action.dispose();
      }else{
         // 逻辑处理
         action.process(context);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MTimelineActions_dispose = function MTimelineActions_dispose(){
   var o = this;
   // 释放属性
   o._actions = MO.Lang.Obejct.dispose(o._actions);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
