//==========================================================
// <T>命名空间。</T>
//
// @class
// @author maocy
// @history 150612
//==========================================================
// 实例化内容
MO.Eai.setup = function Eai_setup(hPanel){
   var o = this;
   o._hPanel = hPanel;
   // 创建应用
   var application = o.Application = MO.RClass.create(MO.FEaiApplication);
   // 创建画板
   var canvas = o.Canvas = MO.RClass.create(MO.FEaiCanvas);
   canvas.build(hPanel);
   canvas.setPanel(hPanel);
   // 配置处理
   application.linkGraphicContext(canvas);
   application.setup();
}
