//==========================================================
// <T>选择框理接口。</T>
//
// @class MValidator
// @history 091130 MAOCY 创建
//==========================================================
function MDescSelect(o){
   o = RClass.inherits(this, o, MValidator);
   //..........................................................
   // @property
   o.dataEmpty   = RClass.register(o, new TPtyBool('dataEmpty', true));
   o.editRefer   = RClass.register(o, new TPtyStr('editRefer', null));
   // 是否允许可以输入  Y:可以输入.N,NULL不可输入默认为N
   o.editCheck   = RClass.register(o, new TPtyStr('editCheck', null));
   o.editDynamic = RClass.register(o, new TPtyBool('editDynamic', false));
   //..........................................................
   // @icon
   o.stDropSelectIcon = RClass.register(o, new TStyleIcon('DropSelect'));
   //..........................................................
   // @process
   o.oeValid      = MDescSelect_oeValid;
   return o;
}

//==========================================================
// <T>校验处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MDescSelect_oeValid(e){
   var o = this;
   var r = EEventStatus.Stop;
   // 判断是否需要检查
   if(o._visible && o._validable){
      var t = o.text();
      // 必须性检查
      if(o.validRequire && !RValidator.validRequire(o, t)){
         e.controls.push(o);
         return r;
      }
      // 内容有效性检查
      if(!RString.isEmpty(t)){
         if(RString.isEmpty(o.items.value(t))){
            return RContext.get('MDescSelect:ValidValue');
         }
      }
   }
   return r;
}
