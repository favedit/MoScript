 //==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dModel(o){
   o = RClass.inherits(this, o, FDisplay3d);
   //..........................................................
   // @attribute
   o._dataReady     = false;
   o._renderables   = null;
   o._animation     = null;
   // @attribute
   o._geometrys     = null;
   o._renderable    = null;
   //..........................................................
   // @method
   o.testReady      = FE3dModel_testReady;
   o.loadRenderable = FE3dModel_loadRenderable;
   o.processLoad    = FE3dModel_processLoad;
   o.process        = FE3dModel_process;
   return o;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FE3dModel_testReady(){
   return this._dataReady;
}

//==========================================================
// <T>加载渲染对象。</T>
//
// @param p:renderable:FRd3Model 渲染对象
//==========================================================
function FE3dModel_loadRenderable(p){
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
            var g = RClass.create(FModelRenderable3d);
            g._display = o;
            g.load(rg);
            gs.push(g);
            rs.push(g);
         }
      }
   }
   // 数据准备完成
   o._dataReady = true;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FE3dModel_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._renderable.testReady()){
      return false;
   }
   o.loadRenderable(o._renderable);
   return true;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dModel_process(){
   var o = this;
   o.__base.FDisplay3d.process.call(o);
   // 处理动画集合
   if(o._animation){
      o._animation.process();
   }
   return true;
}
