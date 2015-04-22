//==========================================================
// <T>场景渲染页面。</T>
//
// @author maocy
// @history 150216
//==========================================================
function FDsShareMeshRenderableFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._activeSpace      = null;
   o._activeRenderable = null;
   //..........................................................
   // @event
   o.onBuilded         = FDsShareMeshRenderableFrame_onBuilded;
   o.onDataChanged     = FDsShareMeshRenderableFrame_onDataChanged;
   o.onEffectClick     = FDsShareMeshRenderableFrame_onEffectClick;
   //..........................................................
   // @method
   o.construct         = FDsShareMeshRenderableFrame_construct;
   // @method
   o.loadObject        = FDsShareMeshRenderableFrame_loadObject;
   // @method
   o.dispose           = FDsShareMeshRenderableFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsShareMeshRenderableFrame_onBuilded(p){
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
function FDsShareMeshRenderableFrame_onDataChanged(p){
   var o = this;
   var renderable = o._activeRenderable;
   var resource = renderable.resource();
   var matrix = resource.matrix();
   // 设置环境颜色
   var value = o._controlTranslate.get();
   matrix.setTranslate(value.x, value.y, value.z);
   // 设置散射颜色
   var value = o._controlRotation.get();
   matrix.setRotation(value.x, value.y, value.z);
   // 设置高光颜色
   var value = o._controlScale.get();
   matrix.setScale(value.x, value.y, value.z);
   // 重新计算
   matrix.update();
   renderable.matrix().assign(matrix);
}

//==========================================================
// <T>效果点击处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsShareMeshRenderableFrame_onEffectClick(ps, pi){
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
function FDsShareMeshRenderableFrame_construct(){
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
function FDsShareMeshRenderableFrame_loadObject(space, renderable){
   var o = this;
   var resource = renderable.resource();
   o._activeSpace = space;
   o._activeRenderable = renderable;
   // 设置矩阵参数
   var matrix = resource.matrix();
   o._controlTranslate.set(matrix.tx, matrix.ty, matrix.tz);
   o._controlRotation.set(matrix.rx, matrix.ry, matrix.rz);
   o._controlScale.set(matrix.sx, matrix.sy, matrix.sz);
   // 设置效果器
   var ces = o._controlEffects;
   ces.clear();
   var es = renderable.infos();
   var c = es.count();
   for(var i = 0; i < c; i++){
      var e = es.valueAt(i).effect;
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
function FDsShareMeshRenderableFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
