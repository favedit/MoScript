//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitNoticeTable = function FEaiCockpitNoticeTable(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'notice.table';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitNoticeTable_construct;
   // @method
   o.setup      = MO.FEaiCockpitNoticeTable_setup;
   // @method
   o.process    = MO.FEaiCockpitNoticeTable_process;
   // @method
   o.dispose    = MO.FEaiCockpitNoticeTable_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTable_construct = function FEaiCockpitNoticeTable_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTable_setup = function FEaiCockpitNoticeTable_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitNoticeTableSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitNoticeTableView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitNoticeTable_process = function FEaiCockpitNoticeTable_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTable_dispose = function FEaiCockpitNoticeTable_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
