with(MO){
   //==========================================================
   // <T>位图框架。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsBitmapFrameSet = function FDsBitmapFrameSet(o){
      o = RClass.inherits(this, o, FDsFrameSet);
      //..........................................................
      // @attribute
      o._frameCanvas          = null;
      o._frameCanvasToolBar   = null;
      o._frameCanvasContent   = null;
      o._frameProperty        = null;
      o._framePropertyToolBar = null;
      o._framePropertyContent = null;
      //..........................................................
      // @process
      o.onBuilded             = FDsBitmapFrameSet_onBuilded;
      o.onDataLoaded          = FDsBitmapFrameSet_onDataLoaded;
      //..........................................................
      // @method
      o.construct             = FDsBitmapFrameSet_construct;
      // @method
      o.loadByGuid            = FDsBitmapFrameSet_loadByGuid;
      o.loadByCode            = FDsBitmapFrameSet_loadByCode;
      o.reload                = FDsBitmapFrameSet_reload;
      // @method
      o.dispose               = FDsBitmapFrameSet_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsBitmapFrameSet_onBuilded = function FDsBitmapFrameSet_onBuilded(p){
      var o = this;
      o.__base.FDsFrameSet.onBuilded.call(o, p);
      //..........................................................
      o._frameCanvasToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._frameCanvasContent._hPanel.className = o.styleName('Canvas_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      //..........................................................
      // 设置分割
      var spliterProperty = o._spliterProperty;
      spliterProperty.setAlignCd(EUiAlign.Right);
      spliterProperty.setSizeHtml(o._frameProperty._hPanel);
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.FDsBitmapFrameSet_onDataLoaded = function FDsBitmapFrameSet_onDataLoaded(event){
      var o = this;
      debugger
      // 加载完成
      o._activeSpace = event._activeSpace;
      //o._catalog.buildSpace(o._activeSpace);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsBitmapFrameSet_construct = function FDsBitmapFrameSet_construct(){
      var o = this;
      // 父处理
      o.__base.FDsFrameSet.construct.call(o);
   }

   //==========================================================
   // <T>根据唯一编码加载位图信息。</T>
   //
   // @method
   // @param guid:String 唯一编码
   //==========================================================
   MO.FDsBitmapFrameSet_loadByGuid = function FDsBitmapFrameSet_loadByGuid(guid){
      var o = this;
      o._activeGuid = guid;
      // 获得资源信息
      var bitmap = o._activeResource = RConsole.find(FDrBitmapConsole).query(guid);
      // 加载画板
      var canvas = o._canvasContent;
      canvas.loadByGuid(guid);
      // 加载属性
      var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
      frame.loadObject(bitmap);
   }

   //==========================================================
   // <T>根据代码加载位图信息。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FDsBitmapFrameSet_loadByCode = function FDsBitmapFrameSet_loadByCode(code){
      var o = this;
      o._activeCode = code;
      var connection = RConsole.find(FDrBitmapConsole).query(code);
      connection.addLoadListener(o, o.onDataLoaded);
   }

   //==========================================================
   // <T>重新加载数据内容。</T>
   //
   // @method
   //==========================================================
   MO.FDsBitmapFrameSet_reload = function FDsBitmapFrameSet_reload(){
      var o = this;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsBitmapFrameSet_dispose = function FDsBitmapFrameSet_dispose(){
      var o = this;
      // 父处理
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
