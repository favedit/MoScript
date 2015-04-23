//==========================================================
// <T>场景相机属性页面。</T>
//
// @class
// @author maocy
// @history 150210
//==========================================================
function FDsCommonLayerPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible       = false;
   // @attribute
   o._workspace     = null;
   o._layer         = null;
   o._layerResource = null;
   // @attribute
   o._controlGuid   = null;
   o._controlCode   = null;
   o._controlLabel  = null;
   // @event
   //..........................................................
   o.onBuilded      = FDsCommonLayerPropertyFrame_onBuilded;
   o.onDataChanged  = FDsCommonLayerPropertyFrame_onDataChanged;
   //..........................................................
   // @method
   o.construct      = FDsCommonLayerPropertyFrame_construct;
   // @method
   o.loadObject     = FDsCommonLayerPropertyFrame_loadObject;
   // @method
   o.dispose        = FDsCommonLayerPropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsCommonLayerPropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsCommonLayerPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 关联对象
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   // 关联对象
   o._controlTypeCd.addDataChangedListener(o, o.onDataChanged);
   o._controlTransformCd.addDataChangedListener(o, o.onDataChanged);
}

//==========================================================
// <T>数据改变处理。</T>
// <P>不改变渲染器代码。</P>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsCommonLayerPropertyFrame_onDataChanged(p){
   var o = this;
   var r = o._layerResource;
   // 设置参数
   r.setCode(o._controlCode.get());
   r.setLabel(o._controlLabel.get());
   // 设置参数
   r.setTypeCd(o._controlTypeCd.get());
   r.setTransformCd(o._controlTransformCd.get());
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param s:scene:FE3dScene 场景
// @param l:layer:FE3dSceneLayer 场景层
//==========================================================
function FDsCommonLayerPropertyFrame_loadObject(s, l){
   var o = this;
   var r = l.resource();
   // 设置属性
   o._layer = l;
   o._layerResource = r;
   // 设置参数
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r.label());
   // 设置参数
   o._controlTypeCd.set(r.typeCd());
   o._controlTransformCd.set(r.transformCd());
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsCommonLayerPropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
