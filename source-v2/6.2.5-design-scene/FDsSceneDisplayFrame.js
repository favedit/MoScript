//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsSceneDisplayFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._activeScene   = null;
   o._activeDisplay = null;
   //..........................................................
   // @event
   o.onBuilded      = FDsSceneDisplayFrame_onBuilded;
   o.onDataChanged  = FDsSceneDisplayFrame_onDataChanged;
   //..........................................................
   // @method
   o.construct      = FDsSceneDisplayFrame_construct;
   // @method
   o.loadObject     = FDsSceneDisplayFrame_loadObject;
   // @method
   o.dispose        = FDsSceneDisplayFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSceneDisplayFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 关联对象
   o._controlTranslate.addDataChangedListener(o, o.onDataChanged);
   o._controlRotation.addDataChangedListener(o, o.onDataChanged);
   o._controlScale.addDataChangedListener(o, o.onDataChanged);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneDisplayFrame_onDataChanged(p){
   var o = this;
   var d = o._activeDisplay;
   var m = d.matrix();
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
function FDsSceneDisplayFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载显示信息。</T>
//
// @method
// @param s:scene:FE3dScene 场景
// @param d:display:FDisplay3d 显示
//==========================================================
function FDsSceneDisplayFrame_loadObject(s, d){
   var o = this;
   o._activeScene = s;
   o._activeDisplay = d;
   // 获得矩阵
   var m = d.matrix();
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
function FDsSceneDisplayFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
