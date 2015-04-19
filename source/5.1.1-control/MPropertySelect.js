//==========================================================
// <T>选择编辑属性。</T>
//
// @class
// @author maocy
// @version 150225
//==========================================================
function MPropertySelect(o){
   o = RClass.inherits(this, o, MUiEditValidator, MUiEditReference, MUiEditZoom);
   //..........................................................
   // @property
   o._editCaseCd     = RClass.register(o, new APtyString('_editCaseCd'));
   o._editPattern    = RClass.register(o, new APtyString('_editPattern'));
   o._editLength     = RClass.register(o, new APtyInteger('_editLength'));
   o._editComplete   = RClass.register(o, new APtyBoolean('_editComplete'));
   o._validLengthMin = RClass.register(o, new APtyInteger('_validLengthMin'));
   o._validLengthMax = RClass.register(o, new APtyInteger('_validLengthMax'));
   //..........................................................
   // @process
   o.oeValid         = MPropertySelect_oeValid;
   return o;
}

//==========================================================
// <T>校验处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MPropertySelect_oeValid(e){
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
      // 长度检查
      if(o.editLength && !RValidator.validTextLength(o, t, o.editLength)){
         e.controls.push(o);
         return r;
      }
   }
   return r;
}
