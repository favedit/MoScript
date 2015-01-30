 //==========================================================
// <T>场景显示对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FSceneDisplay3d(o){
   o = RClass.inherits(this, o, FTemplate3d);
   //..........................................................
   // @attribute
   o._dataReady        = false;
   o._movieMatrix      = null;
   o._modelMatrix      = null;
   o._resource         = null;
   o._materials        = null;
   o._movies           = null;
   //..........................................................
   // @method
   o.construct         = FSceneDisplay3d_construct;
   // @method
   o.loadSceneResource = FSceneDisplay3d_loadSceneResource;
   o.loadResource      = FSceneDisplay3d_loadResource;
   o.process           = FSceneDisplay3d_process;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FSceneDisplay3d_construct(){
   var o = this;
   o.__base.FTemplate3d.construct.call(o);
   o._movieMatrix = new SMatrix3d();
   o._modelMatrix = new SMatrix3d();
}

//==========================================================
// <T>加载空间资源。</T>
//
// @method
// @param p:resource:FRs3SceneSpace 空间资源
//==========================================================
function FSceneDisplay3d_loadSceneResource(p){
   var o = this;
   o._resource = p;
   // 设置矩阵
   o._modelMatrix.assign(p.matrix());
   // 设置材质集合
   var rms = p.materials();
   if(rms){
      var c = rms.count();
      var ms = o._materials = new TDictionary();
      for(var i = 0; i < c; i++){
         var rm = rms.get(i);
         var m = RClass.create(FSceneMaterial3d);
         m.loadSceneResource(rm);
         ms.set(rm.code(), m);
      }
   }
   // 加载动画集合
   var rms = p.movies();
   if(rms){
      var c = rms.count();
      var ms = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var rm = rms.get(i);
         var m = RClass.create(FSceneDisplayMovie3d);
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
function FSceneDisplay3d_loadResource(p){
   var o = this;
   // 加载渲染集合
   var ms = o._materials;
   var rds = p.renderables();
   var c = rds.count();
   if(c > 0){
      var rs = o._templateRenderables = new TObjects();
      for(var i = 0; i < c; i++){
         var rd = rds.get(i);
         var mc = rd.materialCode();
         // 创建显示对象
         var r = RClass.create(FSceneDisplayRenderable3d);
         r._display = o;
         r._context = o._context;
         r.loadResource(rd);
         rs.push(r);
         // 查找材质
         var m = ms.get(mc);
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
function FSceneDisplay3d_process(p){
   var o = this;
   o.__base.FTemplate3d.process.call(o, p);
   // 加载动画集合
   o._matrix.identity();
   var ms = o._movies;
   if(ms){
      var c = ms.count();
      for(var i = 0; i < c; i++){
         ms.get(i).process(o._movieMatrix);
      }
      o._matrix.append(o._movieMatrix);
   }
   o._matrix.append(o._modelMatrix);
}
