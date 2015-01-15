 //==========================================================
// <T>模板。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FTemplate3d(o){
   o = RClass.inherits(this, o, FDisplay3d);
   //..........................................................
   // @attribute
   o._dataReady           = false;
   o._ready               = false;
   o._resource            = null;
   // @attribute
   o._animation           = null;
   // @attribute
   o._resource            = null;
   o._templateRenderables = null;
   //..........................................................
   // @method
   o.testReady            = FTemplate3d_testReady;
   o.setResource          = FTemplate3d_setResource;
   o.loadRenderable       = FTemplate3d_loadRenderable;
   o.loadResource         = FTemplate3d_loadResource;
   o.processLoad          = FTemplate3d_processLoad;
   o.process              = FTemplate3d_process;
   return o;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FTemplate3d_testReady(){
   return this._dataReady;
}

//==========================================================
// <T>设置资源模板。</T>
//
// @param p:resource:FRs3Template 资源模板
//==========================================================
function FTemplate3d_setResource(p){
   this._resource = p;
}

//==========================================================
// <T>加载渲染对象。</T>
//
// @param p:renderable:FRd3Model 渲染对象
//==========================================================
function FTemplate3d_loadRenderable(p){
   debugger
   var o = this;
   var c = o._context;
   var r = p.resource();
   // 创建顶点缓冲集合
   var rgs = p.geometrys();
   if(rgs){
      var c = rgs.count();
      if(c > 0){
         var gs = o._geometrys = new TObjects();
         var rs = o.renderables();
         for(var i = 0; i < c; i++){
            var rg = rgs.get(i);
            var g = RClass.create(FGeometry3d);
            g.load(rg);
            gs.push(g);
            rs.push(g);
         }
      }
   }
   // 读取动画信息
   var a = null;
   var ra = r.animation();
   if(ra){
      a = o._animation = RClass.create(FRd3Animation);
      // 加载骨骼
      var rk = r.skeleton();
      var rbs = rk.bones();
      var c = rbs.count();
      for(var i = 0; i < c; i++){
         var rb = rbs.value(i);
         var b = RClass.create(FRd3Bone);
         b.loadResource(rb);
         a.bones().set(b.id(), b);
      }
      // 加载动画
      a.loadResource(ra);
   }
   // 绑定骨头集合到几何体中
   var gs = o._geometrys;
   if(gs){
      var c = gs.count();
      for(var i = 0; i < c; i++){
         gs.get(i).build(a);
      }
   }
   // 数据准备完成
   o._dataReady = true;
}

//==========================================================
// <T>加载资源模板。</T>
//
// @param p:resource:FRs3Template 资源模板
//==========================================================
function FTemplate3d_loadResource(p){
   var o = this;
   // 加载资源渲染集合
   var rs = p.renderables();
   var c = rs.count();
   if(c > 0){
      var r3s = o._templateRenderables = new TObjects();
      for(var i = 0; i < c; i++){
         var r = rs.get(i);
         var r3 = RClass.create(FTemplateRenderable3d);
         r3._display = o;
         r3._context = o._context;
         r3.loadResource(r);
         r3s.push(r3);
      }
   }
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FTemplate3d_processLoad(){
   var o = this;
   if(o._ready){
      return true;
   }
   // 加载资源
   if(!o._dataReady){
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
      o._dataReady = true;
   }
   // 加载渲染对象
   var r3s = o._templateRenderables;
   var c = r3s.count();
   for(var i = 0; i < c; i++){
      var r3 = r3s.get(i);
      if(!r3.testReady()){
         return false;
      }
   }
   if(c > 0){
      var rs = o._renderables = new TObjects();
      for(var i = 0; i < c; i++){
         var r3 = r3s.get(i);
         r3.load();
         o._renderables.push(r3);
      }
   }
   // 加载完成
   o._ready = true;
   return o._ready;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FTemplate3d_process(){
   var o = this;
   o.__base.FDisplay3d.process.call(o);
   // 处理动画集合
   if(o._animation){
      o._animation.process();
   }
   return true;
}
