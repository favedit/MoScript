with(MO){
   //==========================================================
   // <T>页面实例控制台。</T>
   //
   // @console
   // @author maocy
   // @version 150610
   //==========================================================
   MO.FGuiFrameConsole = function FGuiFrameConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._scopeCd         = EScope.Local;
      // @attribute
      o._frames          = null;
      //..........................................................
      // @method
      o.construct        = FGuiFrameConsole_construct;
      // @method
      o.create           = FGuiFrameConsole_create;
      o.find             = FGuiFrameConsole_find;
      o.get              = FGuiFrameConsole_get;
      o.alloc            = FGuiFrameConsole_alloc;
      o.free             = FGuiFrameConsole_free;
      o.dispose          = FGuiFrameConsole_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiFrameConsole_construct = function FGuiFrameConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      // 设置属性
      o._frames = new TDictionary();
   }

   //==========================================================
   // <T>构建指定表单名称的控件对象，并放置在指定HTML页面ID的位置。</T>
   //
   // @method
   // @param control:FUiControl 控件
   // @param name:String 名称
   // @return FUiFrame 页面控件
   //==========================================================
   MO.FGuiFrameConsole_create = function FGuiFrameConsole_create(control, name){
      var o = this;
      // 获得表单定义
      var describeConsole = RConsole.find(FGuiFrameDescribeConsole);
      var xframe = describeConsole.load(name);
      // 构建处理
      var frame = RGuiControl.build(null, xframe, null, null);
      return frame;
   }

   //==========================================================
   // <T>根据名称查找表单实例，如果不存在则返回空。</T>
   //
   // @method
   // @param name:String 名称
   // @return FUiFrame 页面控件
   //==========================================================
   MO.FGuiFrameConsole_find = function FGuiFrameConsole_find(name){
      return this._frames.get(name); 
   }

   //==========================================================
   // <T>根据名称查找表单实例，如果不存在则创建一个。</T>
   //
   // @method
   // @param name:String 名称
   // @return FUiFrame 页面控件
   //==========================================================
   MO.FGuiFrameConsole_get = function FGuiFrameConsole_get(name){
      var o = this;
      var frames = o._frames;
      var frame = frames.get(name);
      if(!frame){
         // 创建表单
         frame = o.create(null, name);
         frames.set(name, frame);
      }
      return frame;
   }

   //==========================================================
   // <T>释放指定的表单对象。</T>
   // <P>设置表单对象为不可见，等待再次利用。</P>
   //
   // @method
   // @param f:form:FControl 表单对象
   //==========================================================
   MO.FGuiFrameConsole_alloc = function FGuiFrameConsole_alloc(f){
   }

   //==========================================================
   // <T>释放指定的表单对象。</T>
   // <P>设置表单对象为不可见，等待再次利用。</P>
   //
   // @method
   // @param f:form:FControl 表单对象
   //==========================================================
   MO.FGuiFrameConsole_free = function FGuiFrameConsole_free(f){
      f.setVisible(false);
      this._freeFrames.push(f);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiFrameConsole_dispose = function FGuiFrameConsole_dispose(){
      var o = this;
      // 释放属性
      o._frames = RObject.dispose(o._frames, true);
      // 父处理
      o.__base.FConsole.construct.call(o);
   }
}
