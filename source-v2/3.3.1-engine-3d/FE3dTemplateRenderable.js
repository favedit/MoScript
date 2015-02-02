//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FE3dTemplateRenderable(o){
   o = RClass.inherits(this, o, FE3dMeshRenderable);
   //..........................................................
   // @attribute
   o._ready            = false;
   // @attribute
   o._resource         = null;
   o._model            = null;
   o._materialCode     = null;
   o._materialResource = null;
   //..........................................................
   // @method
   o.construct         = FE3dTemplateRenderable_construct;
   // @method
   o.testReady         = FE3dTemplateRenderable_testReady;
   o.testVisible       = FE3dTemplateRenderable_testVisible;
   // @method
   o.loadResource      = FE3dTemplateRenderable_loadResource;
   o.reloadResource    = FE3dTemplateRenderable_reloadResource;
   o.load              = FE3dTemplateRenderable_load;
   o.build             = FE3dTemplateRenderable_build;
   // @method
   o.dispose           = FE3dTemplateRenderable_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dTemplateRenderable_construct(){
   var o = this;
   o.__base.FE3dMeshRenderable.construct.call(o);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 准备好
//==========================================================
function FE3dTemplateRenderable_testReady(){
   var o = this;
   if(!o._model.testReady()){
      return false;
   }
   var ts = o._textures;
   if(ts){
      var c = ts.count();
      for(var i = 0; i < c; i++){
         var t = ts.value(i);
         if(!t.testReady()){
            return false;
         }
      }
   }
   return true;
}

//==========================================================
// <T>测试是否可见。</T>
//
// @method
// @return Boolean 是否可见
//==========================================================
function FE3dTemplateRenderable_testVisible(p){
   return this._ready;
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param p:resource:FRs3TemplateRenderable 资源
//==========================================================
function FE3dTemplateRenderable_loadResource(p){
   var o = this;
   // 设置资源
   o._resource = p;
   //............................................................
   // 设置数据
   o._modelMatrix.assign(p.matrix());
   // 加载模型
   o._model = RConsole.find(FRd3ModelConsole).load(o._context, p.modelGuid());
   //............................................................
   // 加载材质
   var m = o._materialResource = p._activeMaterial._material;
   var mi = o._material.info();
   mi.assign(m.info());
   o._effectName = mi.effectName;
   var rs = m.textures();
   if(rs){
      var bc = RConsole.find(FRd3BitmapConsole)
      var c = rs.count();
      var ts = o._textures = new TDictionary();
      for(var i = 0; i < c; i++){
         var r = rs.get(i);
         var t = bc.load(o._context, r.bitmapGuid(), r.code());
         ts.set(r.code(), t);
      }
   }
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
function FE3dTemplateRenderable_reloadResource(){
   var o = this;
   // 加载材质
   var m = o._materialResource;
   var mi = o._material.info();
   mi.assign(m.info());
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param p:resource:FRs3TemplateRenderable 资源
//==========================================================
function FE3dTemplateRenderable_load(){
   var o = this;
   var r = o._resource;
   // 设置网格
   o._renderable = o._model.findMeshByGuid(r.meshGuid());
   // 加载完成
   o._ready = true;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:animation:FRd3Animation 动画
//==========================================================
function FE3dTemplateRenderable_build(p){
   var o = this;
   var r = o._renderable;
   // 建立骨头集合
   var rbs = r.boneIds();
   if(rbs){
      var bs = o._bones = new TObjects();
      var c = rbs.length();
      for(var i = 0; i < c; i++){
         var bi = rbs.get(i);
         var b = p.findBone(bi);
         if(b == null){
            throw new TError("Bone is not exists. (bone_id={1})", bi);
         }
         bs.push(b);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3dTemplateRenderable_dispose(){
   var o = this;
   // 设置属性
   // 父处理
   o.__base.FE3dMeshRenderable.dispose.call(o);
}
