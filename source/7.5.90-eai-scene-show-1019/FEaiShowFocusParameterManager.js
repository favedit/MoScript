//==========================================================
// <T>预设聚焦参数管理器。</T>
//
// @class
// @author sunpeng
// @version 150929
//==========================================================
MO.FEaiShowFocusParameterManager = function FEaiShowFocusParameterManager(o) {
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._dict = null;
   //..........................................................
   // @method
   o.getFocusParameter = MO.FEaiShowFocusParameterManager_getFocusParameter;
   //..........................................................
   // @method
   o.construct = MO.FEaiShowFocusParameterManager_construct;
   o.setup = MO.FEaiShowFocusParameterManager_setup;
   o.dispose = MO.FEaiShowFocusParameterManager_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiShowFocusParameterManager_construct = function FEaiShowFocusParameterManager_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._dict = new MO.TDictionary();
}

//==========================================================
// <T>初始化。</T>
//
// @method
//==========================================================
MO.FEaiShowFocusParameterManager_setup = function FEaiShowFocusParameterManager_setup() {
   var o = this;
   var dict = o._dict;
   dict.set('china', new MO.SShowFocusParameter(2.15, -750, 1400));
   dict.set('china1024', new MO.SShowFocusParameter(2.18, -450, 800));
   dict.set('area.0', new MO.SShowFocusParameter(0, 0, 300));
   dict.set('area.1', new MO.SShowFocusParameter(1.98, 0, 400));
   dict.set('area.2', new MO.SShowFocusParameter(1.98, 0, 400));
   dict.set('area.3', new MO.SShowFocusParameter(0, 0, 400));
   dict.set('area.4', new MO.SShowFocusParameter(0, 0, 400));
   dict.set('area.5', new MO.SShowFocusParameter(0, 0, 400));
   dict.set('area.6', new MO.SShowFocusParameter(0, 0, 400));
   dict.set('area.7', new MO.SShowFocusParameter(0, 0, 400));
   dict.set('area.8', new MO.SShowFocusParameter(0, 0, 400));
}

//==========================================================
// <T>获取聚焦参数。</T>
//
// @method
//==========================================================
MO.FEaiShowFocusParameterManager_getFocusParameter = function FEaiShowFocusParameterManager_getFocusParameter(key) {
   var o = this;
   return o._dict.get(key);
}

//============================================================
// <T>释放处理。</T>
//
// @method
//============================================================
MO.FEaiShowFocusParameterManager_dispose = function FEaiShowFocusParameterManager_dispose() {
   var o = this;
   o._dict = MO.Lang.Object.dispose(o._dict);
}