//==========================================================
// <T>选择编辑属性。</T>
//
// @class
// @author maocy
// @version 150225
//==========================================================
MO.MPropertySelect = function MPropertySelect(o){
   o = MO.Class.inherits(this, o, MO.MUiEditValidator, MO.MUiEditReference, MO.MUiEditZoom);
   //..........................................................
   // @property
   o._editCaseCd     = MO.Class.register(o, new MO.APtyString('_editCaseCd'));
   o._editPattern    = MO.Class.register(o, new MO.APtyString('_editPattern'));
   o._editLength     = MO.Class.register(o, new MO.APtyInteger('_editLength'));
   o._editComplete   = MO.Class.register(o, new MO.APtyBoolean('_editComplete'));
   o._validLengthMin = MO.Class.register(o, new MO.APtyInteger('_validLengthMin'));
   o._validLengthMax = MO.Class.register(o, new MO.APtyInteger('_validLengthMax'));
   //..........................................................
   // @process
   o.oeValid         = MO.MPropertySelect_oeValid;
   return o;
}

//==========================================================
// <T>校验处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MPropertySelect_oeValid = function MPropertySelect_oeValid(e){
   var o = this;
   var r = MO.EEventStatus.Stop;
   // 判断是否需要检查
   if(o._visible && o._validable){
      var t = o.text();
      // 必须性检查
      if(o.validRequire && !MO.RValidator.validRequire(o, t)){
         e.controls.push(o);
         return r;
      }
      // 长度检查
      if(o.editLength && !MO.RValidator.validTextLength(o, t, o.editLength)){
         e.controls.push(o);
         return r;
      }
   }
   return r;
}
