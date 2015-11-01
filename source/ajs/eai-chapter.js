MO.FEaiChapter = function FEaiChapter(o){
   o = MO.Class.inherits(this, o, MO.FChapter);
   return o;
}
MO.FEaiChartChapter = function FEaiChartChapter(o){
   o = MO.Class.inherits(this, o, MO.FEaiChapter);
   o._code                    = MO.EEaiChapter.Chart;
   o._sceneTotal              = MO.Class.register(o, new MO.AGetter('_sceneTotal'));
   o._sceneHistory            = MO.Class.register(o, new MO.AGetter('_sceneHistory'));
   o._sceneCustomer           = MO.Class.register(o, new MO.AGetter('_sceneCustomer'));
   o._sceneCustomerSphere     = MO.Class.register(o, new MO.AGetter('_sceneCustomerSphere'));
   o._sceneCustomerInvestment3d = MO.Class.register(o, new MO.AGetter('_sceneCustomerInvestment3d'));
   o._sceneMarketerCustomer   = MO.Class.register(o, new MO.AGetter('_sceneMarketerCustomer'));
   o._sceneMarketerMarketer   = MO.Class.register(o, new MO.AGetter('_sceneMarketerMarketer'));
   o._sceneMarketerProduct    = MO.Class.register(o, new MO.AGetter('_sceneMarketerProduct'));
   o._sceneMarketerManage     = MO.Class.register(o, new MO.AGetter('_sceneMarketerManage'));
   o._sceneDepartmentMarketer = MO.Class.register(o, new MO.AGetter('_sceneDepartmentMarketer'));
   o._scenePerformence        = MO.Class.register(o, new MO.AGetter('_scenePerformence'));
   o._sceneStatisticsMarketer = MO.Class.register(o, new MO.AGetter('_sceneStatisticsMarketer'));
   o._sceneDepartment         = MO.Class.register(o, new MO.AGetter('_sceneDepartment'));
   o._sceneLive               = MO.Class.register(o, new MO.AGetter('_sceneLive'));
   o._sceneWorld              = MO.Class.register(o, new MO.AGetter('_sceneWorld'));
   o._sceneSales              = MO.Class.register(o, new MO.AGetter('_sceneSales'));
   o._sceneShow1019           = MO.Class.register(o, new MO.AGetter('_sceneShow1019'));
   o._sceneSesameFinancial     = MO.Class.register(o, new MO.AGetter('_sceneSesameFinancial'));
   o.construct                = MO.FEaiChartChapter_construct;
   o.createScene              = MO.FEaiChartChapter_createScene;
   o.process                  = MO.FEaiChartChapter_process;
   o.dispose                  = MO.FEaiChartChapter_dispose;
   return o;
}
MO.FEaiChartChapter_construct = function FEaiChartChapter_construct(){
   var o = this;
   o.__base.FEaiChapter.construct.call(o);
}
MO.FEaiChartChapter_createScene = function FEaiChartChapter_createScene(code){
   var o = this;
   var scene = null;
   switch(code){
      case MO.EEaiScene.ChartCustomerSphere:
         scene = o._sceneCustomerSphere = MO.Class.create(MO.FEaiChartCustomerSphereScene);
         break;
      case MO.EEaiScene.ChartCustomerInvestment3d:
         scene = o._sceneCustomerInvestment3d = MO.Class.create(MO.FEaiCstInvestment3dScene);
         break;
      case MO.EEaiScene.ChartMarketerCustomer:
         scene = o._sceneMarketerCustomer = MO.Class.create(MO.FEaiChartMktCustomerScene);
         break;
      case MO.EEaiScene.ChartMarketerMarketer:
         scene = o._sceneMarketerMarketer = MO.Class.create(MO.FEaiChartMktMarketerScene);
         break;
       case MO.EEaiScene.ChartMarketerProduct:
         scene = o._sceneMarketerMarketer = MO.Class.create(MO.FEaiChartMktProductScene);
         break;
      case MO.EEaiScene.ChartMarketerManage:
         scene = o._sceneMarketerManage = MO.Class.create(MO.FEaiChartMktManageScene);
         break;
      case MO.EEaiScene.ChartDepartmentMarketer:
         scene = o._sceneDepartmentMarketer = MO.Class.create(MO.FEaiChartDptMarketerScene);
         break;
      case MO.EEaiScene.ChartPerformence:
         scene = o._scenePerformence = MO.Class.create(MO.FEaiChartPerformenceScene);
         break;
      case MO.EEaiScene.ChartStatisticsMarketer:
         scene = o._sceneStatisticsMarketer = MO.Class.create(MO.FEaiChartStatMarketerScene);
         break;
      case MO.EEaiScene.ChartPerformenceMarketer:
         scene = o._sceneStatisticsMarketer = MO.Class.create(MO.FEaiChartPerfMarketerScene);
         break;
      case MO.EEaiScene.ChartShow1019:
         scene = o._sceneShow1019 = MO.Class.create(MO.FEaiChartShow1019Scene);
         break;
      case MO.EEaiScene.ChartShow1022:
         scene = o._sceneShow1022 = MO.Class.create(MO.FEaiChartShow1022Scene);
         break;
      case MO.EEaiScene.ChartShow1022MktCtm:
         scene = o._sceneShow1022MtkCtm = MO.Class.create(MO.FEaiChartMktCtm1022Scene);
         break;
      case MO.EEaiScene.ChartSesameFinancial:
         scene = o._sceneSesameFinancial = MO.Class.create(MO.FEaiChartSesameFinancialScene);
         break;
   }
   scene.linkGraphicContext(o);
   return scene;
}
MO.FEaiChartChapter_process = function FEaiChartChapter_process(){
   var o = this;
   o.__base.FEaiChapter.process.call(o);
}
MO.FEaiChartChapter_dispose = function FEaiChartChapter_dispose(){
   var o = this;
   o.__base.FEaiChapter.dispose.call(o);
}
MO.FEaiCockpitChapter = function FEaiCockpitChapter(o){
   o = MO.Class.inherits(this, o, MO.FEaiChapter);
   o._code         = MO.EEaiChapter.Chart;
   o._sceneCockpit = MO.Class.register(o, new MO.AGetter('_sceneCockpit'));
   o.construct     = MO.FEaiCockpitChapter_construct;
   o.createScene   = MO.FEaiCockpitChapter_createScene;
   o.dispose       = MO.FEaiCockpitChapter_dispose;
   return o;
}
MO.FEaiCockpitChapter_construct = function FEaiCockpitChapter_construct(){
   var o = this;
   o.__base.FEaiChapter.construct.call(o);
}
MO.FEaiCockpitChapter_createScene = function FEaiCockpitChapter_createScene(code){
   var o = this;
   var scene = null;
   switch(code){
      case MO.EEaiScene.Cockpit:
         scene = o._sceneCockpit = MO.Class.create(MO.FEaiCockpitScene);
         break;
   }
   scene.linkGraphicContext(o);
   return scene;
}
MO.FEaiCockpitChapter_dispose = function FEaiCockpitChapter_dispose(){
   var o = this;
   o.__base.FEaiChapter.dispose.call(o);
}
