//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsTemplateDisplayFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._renderTemplate = null;
   o._renderDisplay  = null;
   //..........................................................
   // @event
   o.onBuilded       = FDsTemplateDisplayFrame_onBuilded;
   o.onDataChanged   = FDsTemplateDisplayFrame_onDataChanged;
   //..........................................................
   // @method
   o.construct       = FDsTemplateDisplayFrame_construct;
   // @method
   o.loadObject      = FDsTemplateDisplayFrame_loadObject;
   // @method
   o.dispose         = FDsTemplateDisplayFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsTemplateDisplayFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 关联对象
   var mp = o.searchControl('matrixPanel');
   var c = o._controlTranslate = mp.searchControl('translate');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlRotation = mp.searchControl('rotation');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlScale = mp.searchControl('scale');
   c.addDataChangedListener(o, o.onDataChanged);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsTemplateDisplayFrame_onDataChanged(p){
   var o = this;
   var d = o._renderDisplay;
   var m = d.modelMatrix();
   // 设置环境颜色
   var v = o._controlTranslate.get();
   m.setTranslate(v.x, v.y, v.z);
   // 设置散射颜色
   var v = o._controlRotation.get();
   m.setRotation(v.x, v.y, v.z);
   // 设置高光颜色
   var v = o._controlScale.get();
   m.setScale(v.x, v.y, v.z);
   // 重新计算
   m.update();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateDisplayFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param t:template:FTemplate3d 模板
// @param d:display:FDisplay3d 显示
//==========================================================
function FDsTemplateDisplayFrame_loadObject(t, d){
   var o = this;
   o._renderTemplate = t;
   o._renderDisplay = d;
   // 获得矩阵
   var m = d.modelMatrix();
   // 设置参数
   o._controlTranslate.set(m.tx, m.ty, m.tz);
   o._controlRotation.set(m.rx, m.ry, m.rz);
   o._controlScale.set(m.sx, m.sy, m.sz);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsTemplateDisplayFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
