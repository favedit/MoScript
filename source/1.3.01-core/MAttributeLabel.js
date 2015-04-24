//==========================================================
// <T>属性标签接口。</T>
//
// @face
// @author maocy
// @history 150420
//==========================================================
function MAttributeLabel(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @attribute
   o._label   = null;
   //..........................................................
   // @method
   o.label    = MAttributeLabel_label;
   o.setLabel = MAttributeLabel_setLabel;
   return o;
}

//==========================================================
// <T>获得标签。</T>
//
// @method
// @return String 标签
//==========================================================
function MAttributeLabel_label(){
   return this._label;
}

//==========================================================
// <T>设置标签。</T>
//
// @method
// @param label:String 标签
//==========================================================
function MAttributeLabel_setLabel(label){
   this._label = label;
}
