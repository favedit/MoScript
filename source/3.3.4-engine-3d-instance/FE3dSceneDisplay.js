 //==========================================================
// <T>场景显示对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3dSceneDisplay(o){
   o = RClass.inherits(this, o, FE3dTemplate);
   //..........................................................
   // @attribute
   o._dataReady        = false;
   o._optionPlay       = false;
   o._optionMovie      = false;
   o._movieMatrix      = null;
   o._resourceScene    = null;
   o._materials        = null;
   o._movies           = null;
   //..........................................................
   // @method
   o.construct         = FE3dSceneDisplay_construct;
   // @method
   o.resourceScene     = FE3dSceneDisplay_resourceScene;
   o.loadSceneResource = FE3dSceneDisplay_loadSceneResource;
   o.loadResource      = FE3dSceneDisplay_loadResource;
   o.updateMatrix      = FE3dSceneDisplay_updateMatrix;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dSceneDisplay_construct(){
   var o = this;
   o.__base.FE3dTemplate.construct.call(o);
   o._movieMatrix = new SMatrix3d();
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FRs3SceneDisplay 资源
//==========================================================
function FE3dSceneDisplay_resourceScene(){
   return this._resourceScene;
}

//==========================================================
// <T>加载空间资源。</T>
//
// @method
// @param p:resource:FRs3SceneSpace 空间资源
//==========================================================
function FE3dSceneDisplay_loadSceneResource(p){
   var o = this;
   var cf = RConsole.find(FE3dSceneConsole).factory();
   o._resourceScene = p;
   // 设置矩阵
   o._matrix.assign(p.matrix());
   // 设置材质集合
   var rms = p.materials();
   if(rms){
      var c = rms.count();
      var ms = o._materials = new TDictionary();
      for(var i = 0; i < c; i++){
         var rm = rms.get(i);
         var m = cf.create(EE3dScene.Material);
         m._display = o;
         m.loadSceneResource(rm);
         ms.set(rm.groupGuid(), m);
      }
   }
   // 加载动画集合
   var rms = p.movies();
   if(rms){
      var c = rms.count();
      var ms = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var rm = rms.get(i);
         var m = RClass.create(FE3dSceneDisplayMovie);
         m.loadResource(rm);
         ms.push(m);
      }
   }
}

//==========================================================
// <T>加载资源。</T>
//
// @param p:resource:FRs3Template 资源
//==========================================================
function FE3dSceneDisplay_loadResource(p){
   var o = this;
   var cf = RConsole.find(FE3dSceneConsole).factory();
   // 加载渲染集合
   var ms = o._materials;
   var rds = p.displays();
   var c = rds.count();
   if(c > 0){
      for(var i = 0; i < c; i++){
         var rd = rds.get(i);
         // 创建显示对象
         var r = cf.create(EE3dScene.Renderable);
         r._display = o;
         r.linkGraphicContext(o);
         r.loadResource(rd);
         o._meshRenderables.push(r);
         o.pushRenderable(r);
         // 加载材质
         var rdm = rd.materials().first();
         var m = ms.get(rdm.groupGuid());
         if(m){
            r.loadMaterial(m);
         }
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dSceneDisplay_updateMatrix(p){
   var o = this;
   // 加载动画集合
   var m = o._currentMatrix.identity();
   var ms = o._movies;
   if(ms){
      if(o._optionMovie){
         var c = ms.count();
         for(var i = 0; i < c; i++){
            ms.get(i).process(o._movieMatrix);
         }
      }
      m.append(o._movieMatrix);
   }
   m.append(o._matrix);
   // 计算父矩阵
   var t = o._parent;
   if(t){
      o._currentMatrix.append(t._currentMatrix);
   }
}
