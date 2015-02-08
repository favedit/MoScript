//==========================================================
// <T>模板主题属性页面。</T>
//
// @class
// @author maocy
// @history 150202
//==========================================================
function FDsSceneThemePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible        = false;
   o._frameName      = 'design3d.template.property.ThemeFrame';
   // @attribute
   o._workspace      = null;
   // @attribute
   o._renderTemplate = null;
   o._renderTheme    = null;
   // @attribute
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   //..........................................................
   // @event
   o.onBuilded       = FDsSceneThemePropertyFrame_onBuilded;
   //..........................................................
   // @method
   o.construct       = FDsSceneThemePropertyFrame_construct;
   // @method
   o.loadObject      = FDsSceneThemePropertyFrame_loadObject;
   // @method
   o.dispose         = FDsSceneThemePropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSceneThemePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 设置关联
   o._controlGuid = o.searchControl('guid');
   o._controlCode = o.searchControl('code');
   o._controlLabel = o.searchControl('label');
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneThemePropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param t:template:FTemplate3d 模板
// @param m:material:FRs3Material 材质
//==========================================================
function FDsSceneThemePropertyFrame_loadObject(t, m){
   var o = this;
   // 设置属性
   o._renderTemplate = t;
   o._renderTheme = m;
   // 设置参数
   o._controlGuid.set(m.guid());
   o._controlCode.set(m.code());
   o._controlLabel.set(m._label);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneThemePropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
