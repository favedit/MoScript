//==========================================================
// <T>场景相机属性页面。</T>
//
// @class
// @author maocy
// @history 150210
//==========================================================
function FDsSceneLayerPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible      = false;
   // @attribute
   o._workspace    = null;
   o._layer        = null;
   // @attribute
   o._controlGuid  = null;
   o._controlCode  = null;
   o._controlLabel = null;
   //..........................................................
   // @method
   o.construct     = FDsSceneLayerPropertyFrame_construct;
   // @method
   o.loadObject    = FDsSceneLayerPropertyFrame_loadObject;
   // @method
   o.dispose       = FDsSceneLayerPropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneLayerPropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param s:scene:FE3dScene 场景
// @param l:layer:FE3dSceneLayer 场景层
//==========================================================
function FDsSceneLayerPropertyFrame_loadObject(s, l){
   var o = this;
   var r = l.resource();
   // 设置属性
   o._layer = l;
   // 设置参数
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r._label);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneLayerPropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
