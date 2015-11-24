//==========================================================
// <T>驾驶舱号令用户模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitNoticeUser = function FEaiCockpitNoticeUser(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'notice.user';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitNoticeUser_construct;
   // @method
   o.setup      = MO.FEaiCockpitNoticeUser_setup;
   // @method
   o.process    = MO.FEaiCockpitNoticeUser_process;
   // @method
   o.dispose    = MO.FEaiCockpitNoticeUser_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUser_construct = function FEaiCockpitNoticeUser_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUser_setup = function FEaiCockpitNoticeUser_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitNoticeUserSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitNoticeUserView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitNoticeUser_process = function FEaiCockpitNoticeUser_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUser_dispose = function FEaiCockpitNoticeUser_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
