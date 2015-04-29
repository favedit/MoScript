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
   o.onMaterialClick   = FDsCommonRenderableFrame_onMaterialClick;
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
// <T>数据改变处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsCommonRenderableFrame_onMaterialClick(ps, pi){
   var o = this;
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
// @param space:FE3dSpace 空间
// @param renderable:FE3dRenderable 渲染对象
//==========================================================
function FDsCommonRenderableFrame_loadObject(s, renderable){
   var o = this;
   o._activeScene = s;
   o._activeRenderable = renderable;
   // 设置矩阵参数
   var matrix = renderable.matrix();
   o._controlTranslate.set(matrix.tx, matrix.ty, matrix.tz);
   o._controlRotation.set(matrix.rx, matrix.ry, matrix.rz);
   o._controlScale.set(matrix.sx, matrix.sy, matrix.sz);
   // 建立材质集合
   var materialBox = o._controlMaterials;
   materialBox.clear();
   //var materials = renderable.materials();
   var indexBuffers = renderable.indexBuffers();
   var count = indexBuffers.count();
   for(var i = 0; i < count; i++){
      //var e = materials.at(i);
      var item = materialBox.createItem(null, i + ': ');
      item.setTag(e);
      materialBox.push(item);
   }
   // 建立效果器集合
   var effectBox = o._controlEffects;
   effectBox.clear();
   var es = renderable.infos();
   var c = es.count();
   for(var i = 0; i < c; i++){
      var e = es.at(i).effect;
      if(e){
         var item = effectBox.createItem(null, e.code());
         item.setTag(e);
         effectBox.push(item);
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
