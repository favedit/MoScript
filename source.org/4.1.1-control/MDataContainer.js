//==========================================================
// <T>数据内容的接口。</T>
//
// @face
// @author maocy
// @version 150124
//==========================================================
function MDataContainer(o){
   o = RClass.inherits(this, o, MDataValue);
   //..........................................................
   // @method
   o.dsDataLoad = MDataContainer_dsDataLoad;
   o.dsDataSave = MDataContainer_dsDataSave;
   return o;
}


//==========================================================
// <T>数据源从加载数据。</T>
//
// @method
// @param p:dataSource:FDataSource 数据源
//==========================================================
function MDataContainer_dsDataLoad(p){
   var o = this;
   var e = new TEventProcess(null, o, 'oeDataLoad', MDataValue);
   e.source = p;
   o.process(e);
   e.dispose();
}

//==========================================================
// <T>存储数据到数据源。</T>
//
// @method
// @param p:dataSource:FDataSource 数据源
//==========================================================
function MDataContainer_dsDataSave(p){
   var o = this;
   var e = new TEventProcess(null, o, 'oeDataSave', MDataValue);
   e.source = p;
   o.process(e);
   e.dispose();
}
