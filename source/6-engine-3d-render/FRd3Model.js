//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FRd3Model(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._context    = null;
   o._dataReady  = false;
   o._geometrys  = null;
   //..........................................................
   o.onDataLoad  = FRd3Model_onDataLoad;
   //..........................................................
   // @method
   o.construct   = FRd3Model_construct;
   o.geometrys   = FRd3Model_geometrys;
   o.testReady   = FRd3Model_testReady;
   o.testVisible = FRd3Model_testVisible;
   o.load        = FRd3Model_load;
   return o;
}

//==========================================================
// <T>数据加载完成。</T>
//
// @method
//==========================================================
function FRd3Model_onDataLoad(c){
   var o = this;
   var v = RClass.create(FDataView);
   v._endianCd = true;
   v.link(c.outputData());
   // 创建资源
   var rm = RClass.create(FRs3Model);
   rm.unserialize(v);
   // 读取内容
   var gs = rm.geometrys();
   var gc = gs.count();
   for(var n = 0; n < gc; n++){
      var g = gs.get(n);
      var mg = RClass.create(FRd3Geometry);
      mg.linkContext(o._context);
      mg.loadResource(g);
      o._geometrys.push(mg);
   }
   // 加载完成
   o._dataReady  = true;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRd3Model_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._geometrys = new TObjects();
}

//==========================================================
// <T>获得几何体集合。</T>
//
// @return 几何体集合
//==========================================================
function FRd3Model_geometrys(){
   return this._geometrys;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FRd3Model_testReady(){
   return this._dataReady;
}

//==========================================================
// <T>测试是否可见。</T>
//
// @param p:region:FRegion 区域
// @return Boolean 是否可见
//==========================================================
function FRd3Model_testVisible(p){
   var o = this;
   return o._dataReady && o._visible;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FRd3Model_load(u){
   var o = this;
   var hc = RClass.create(FHttpConnection);
   hc._asynchronous = true;
   hc.lsnsLoad.register(o, o.onDataLoad);
   hc.send(u);
}
