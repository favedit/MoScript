//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FRenderModel(o){
   o = RClass.inherits(this, o, FRenderable);
   //..........................................................
   // @attribute
   o._context    = null;
   o._dataReady  = false;
   o._geometrys  = null;
   //..........................................................
   o.onDataLoad  = FRenderModel_onDataLoad;
   //..........................................................
   // @method
   o.construct   = FRenderModel_construct;
   o.geometrys   = FRenderModel_geometrys;
   o.testReady   = FRenderModel_testReady;
   o.testVisible = FRenderModel_testVisible;
   o.load        = FRenderModel_load;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRenderModel_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._geometrys = new TObjects();
}

//==========================================================
// <T>获得几何体集合。</T>
//
// @return 几何体集合
//==========================================================
function FRenderModel_geometrys(){
   return this._geometrys;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FRenderModel_testReady(){
   return this._dataReady;
}

//==========================================================
// <T>测试是否可见。</T>
//
// @param p:region:FRegion 区域
// @return Boolean 是否可见
//==========================================================
function FRenderModel_testVisible(p){
   var o = this;
   return o._dataReady && o._visible;
}

function FRenderModel_onDataLoad(c){
   var o = this;
   var v = RClass.create(FDataView);
   v._endianCd = true;
   v.link(c.outputData());

   var rm = RClass.create(FRs3Model);
   rm.unserialize(v);

   var gs = rm.geometrys();
   var gc = gs.count();
   for(var n = 0; n < gc; n++){
      var g = gs.get(n);
      var mg = RClass.create(FRenderGeometry);
      mg.linkContext(o._context);
      mg.loadResource(g);
      o._geometrys.push(mg);
   }
   // 加载完成
   o._dataReady  = true;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FRenderModel_load(u){
   var o = this;
   var hc = RClass.create(FHttpConnection);
   hc._asynchronous = true;
   hc.lsnsLoad.register(o, o.onDataLoad);
   hc.send(u);
}
