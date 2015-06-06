//==========================================================
// <T>应用程序。</T>
//
// @class
// @author maocy
// @history 150604
//==========================================================
MO.REaiApplication = function REaiApplication(){
   var o = MO.RSingleton.call(this);
   //..........................................................
   // @attribute
   o._stageCountry     = null;
   o._stageGroup       = null;
   o._stageGroupReport = null;
   o._stageCompany     = null;
   // @attribute
   o._activeStage      = null;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.REaiApplication.prototype.setup = function REaiApplication_setup(){
   var o = this;
   o._stageCountry = MO.RClass.create(MO.FEaiCountryStage);
   o._stageGroup = MO.RClass.create(MO.FEaiGroupStage);
   o._stageGroupReport = MO.RClass.create(MO.FEaiGroupReportStage);
   o._stageCompany = MO.RClass.create(MO.FEaiCompanyStage);
}

//==========================================================
// <T>根据枚举查找一个舞台。</T>
//
// @method
// @param stageCd:EEaiStage 舞台枚举
// @return FEaiStage 舞台
//==========================================================
MO.REaiApplication.prototype.findStage = function REaiApplication_findStage(stageCd){
   var o = this;
   switch(stageCd){
      case MO.EEaiStage.Country:
         return o._stageCountry;
      case MO.EEaiStage.Group:
         return o._stageGroupReport;
      case MO.EEaiStage.GroupReport:
         return o._stageGroupReport;
      case MO.EEaiStage.Company:
         return o._stageCompany;
      default:
         throw new TError(o, 'Unknown stage type. (stage_cd={1})', stageCd);
   }
}

//==========================================================
// <T>根据枚举选中一个舞台。</T>
//
// @method
// @param stageCd:EEaiStage 舞台枚举
// @return FEaiStage 舞台
//==========================================================
MO.REaiApplication.prototype.selectStage = function REaiApplication_selectStage(stageCd){
   var o = this;
   var stage = o.findStage(stageCd);
   return stage;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.REaiApplication.prototype.dispose = function REaiApplication_dispose(){
   var o = this;
   // 释放属性
   o._stageCountry = MO.RObject.dispose(o._stageCountry);
   o._stageGroup = MO.RObject.dispose(o._stageGroup);
   o._stageGroupReport = MO.RObject.dispose(o._stageGroupReport);
   o._stageCompany = MO.RObject.dispose(o._stageCompany);
   o._activeStage = null;
   // 父处理
   o.__base.FUiControl.dispose.call(o);
}
//..........................................................
// 实例化内容
MO.EaiApplication = new MO.REaiApplication();
