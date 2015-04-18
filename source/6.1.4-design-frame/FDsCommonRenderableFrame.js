//==========================================================
// <T>场景渲染页面。</T>
//
// @author maocy
// @history 150216
//==========================================================
function FDsCommonRenderableFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._activeScene      = null;
   o._activeRenderable = null;
   //..........................................................
   // @event
   o.onBuilded         = FDsCommonRenderableFrame_onBuilded;
   o.onDataChanged     = FDsCommonRenderableFrame_onDataChanged;
   o.onEffectClick     = FDsCommonRenderableFrame_onEffectClick;
   //..........................................................
   // @method
   o.construct         = FDsCommonRenderableFrame_construct;
   // @method
   o.loadObject        = FDsCommonRenderableFrame_loadObject;
   // @method
   o.dispose           = FDsCommonRenderableFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsCommonRenderableFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 关联对象
   o._controlTranslate.addDataChangedListener(o, o.onDataChanged);
   o._controlRotation.addDataChangedListener(o, o.onDataChanged);
   o._controlScale.addDataChangedListener(o, o.onDataChanged);
   // 增加对象
   o._controlEffects.addClickListener(o, o.onEffectClick);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsCommonRenderableFrame_onDataChanged(p){
   var o = this;
   var r = o._activeRenderable;
   var m = r.matrix();
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
// <T>效果点击处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsCommonRenderableFrame_onEffectClick(ps, pi){
   var o = this;
   var e = pi.tag();
   var p = e._program;
   var s = p._vertexShader;
   // s.targetSource()
   alert(s._source);
   var s = p._fragmentShader;
   alert(s._source);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsCommonRenderableFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载渲染对象信息。</T>
//
// @method
// @param s:scene:FE3dScene 场景
// @param r:renderable:FE3dRenderable 渲染对象
//==========================================================
function FDsCommonRenderableFrame_loadObject(s, r){
   var o = this;
   o._activeScene = s;
   o._activeRenderable = r;
   // 获得矩阵
   var m = r.matrix();
   // 设置参数
   o._controlTranslate.set(m.tx, m.ty, m.tz);
   o._controlRotation.set(m.rx, m.ry, m.rz);
   o._controlScale.set(m.sx, m.sy, m.sz);
   // 设置效果器
   var ces = o._controlEffects;
   ces.clear();
   var es = r.infos();
   var c = es.count();
   for(var i = 0; i < c; i++){
      var e = es.value(i).effect;
      if(e){
         var l = ces.createItem(null, e.code());
         l.setTag(e);
         ces.push(l);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsCommonRenderableFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
