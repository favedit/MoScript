with(MO){
   //==========================================================
   // <T>设计框架。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsFrameSet = function FDsFrameSet(o){
      o = MO.Class.inherits(this, o, FDuiFrameSet);
      // @style
      o._styleToolBarGround   = MO.Class.register(o, new AStyle('_styleToolBarGround', 'ToolBar_Ground'));
      o._styleCatalogContent  = MO.Class.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
      o._styleCanvasContent   = MO.Class.register(o, new AStyle('_styleCanvasContent', 'Canvas_Content'));
      o._stylePropertyContent = MO.Class.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
      //..........................................................
      // @attribute
      o._activeGuid           = null;
      o._activeCode           = null;
      o._activeSpace          = null;
      // @attribute
      o._propertyFrames       = null;
      //..........................................................
      // @method
      o.construct             = FDsFrameSet_construct;
      // @method
      o.findPropertyFrame     = FDsFrameSet_findPropertyFrame;
      o.propertyFrames        = FDsFrameSet_propertyFrames;
      o.hidePropertyFrames    = FDsFrameSet_hidePropertyFrames;
      // @method
      o.dispose               = FDsFrameSet_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsFrameSet_construct = function FDsFrameSet_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiFrameSet.construct.call(o);
      // 设置属性
      o._propertyFrames = new MO.TDictionary();
   }

   //==========================================================
   // <T>根据名称获得属性页面。</T>
   //
   // @method
   // @param code:String 代码
   // @return FDuiFrame 页面
   //==========================================================
   MO.FDsFrameSet_findPropertyFrame = function FDsFrameSet_findPropertyFrame(code){
      var o = this;
      var frame = o._propertyFrames.get(code);
      if(!frame){
         frame = MO.Console.find(FDuiFrameConsole).get(o, code, o._framePropertyContent._hContainer);
         frame._frameSet = o;
         o._propertyFrames.set(code, frame);
      }
      return frame;
   }

   //==========================================================
   // <T>获得属性页面集合。</T>
   //
   // @method
   // @param code:String 代码
   // @return TDictionary 页面集合
   //==========================================================
   MO.FDsFrameSet_propertyFrames = function FDsFrameSet_propertyFrames(){
      return this._propertyFrames;
   }

   //==========================================================
   // <T>隐藏属性界面集合。</T>
   //
   // @method
   //==========================================================
   MO.FDsFrameSet_hidePropertyFrames = function FDsFrameSet_hidePropertyFrames(){
      var o = this;
      var frames = o._propertyFrames;
      var count = frames.count();
      for(var i = 0; i < count; i++){
         var frame = frames.at(i);
         frame.hide();
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsFrameSet_dispose = function FDsFrameSet_dispose(){
      var o = this;
      // 清空属性
      o._activeSpace = null;
      // 释放属性集合
      var frames = o._propertyFrames;
      var count = frames.count();
      for(var i = 0; i < count; i++){
         var frame = frames.at(i);
         frame.dispose();
      }
      o._propertyFrames = MO.Lang.Object.dispose(o._propertyFrames);
      // 父处理
      o.__base.FDuiFrameSet.dispose.call(o);
   }
}
