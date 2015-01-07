//==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FModel3d(o){
   o = RClass.inherits(this, o, FDisplay3d);
   //..........................................................
   // @attribute
   o._statusReady = false;
   o._renderables = null;
   o._resource    = null;
   //..........................................................
   // @method
   o.construct    = FModel3d_construct;
   o.testReady    = FModel3d_testReady;
   o.load         = FModel3d_load;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FModel3d_construct(){
   var o = this;
   o.__base.FDisplay3d.construct.call(o);
   o._renderables = new TObjects();
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FModel3d_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   var c = vs.count();
   for(var n = 0; n < c; n++){
      var v = vs.get(n);
      if(v.name() == p){
         return v;
      }
   }
   return null;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FModel3d_testReady(){
   var o = this;
   if(!o._statusReady){
      if(o._resource.testReady()){
         o.load(o._resource);
         o._statusReady = true;
      }
   }
   return o._statusReady;
}

//==========================================================
// <T>加载资源。</T>
//
// @param p:resource:FRs3Geometry 资源
//==========================================================
function FModel3d_load(p){
   var o = this;
   var c = o._context;
   // 创建顶点缓冲集合
   var gs = p.geometrys();
   var gc = gs.count();
   for(var n = 0; n < gc; n++){
      var rg = gs.get(n);
      var g = RClass.create(FGeometry3d);
      g.load(rg);
      o._renderables.push(g);
   }
}
