//==========================================================
// <T>三维渲染引擎。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
MO.REngine3d = function REngine3d(){
   var o = this;
   //..........................................................
   // @attribute
   o._setuped  = false;
   o._contexts = null;
   return o;
}

//==========================================================
// <T>卸载处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.REngine3d.prototype.onUnload = function REngine3d_onUnload(event){
   this.dispose();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.REngine3d.prototype.setup = function REngine3d_setup(){
   var o = this;
   if(!o._setuped){
      // 设置属性
      o._contexts = new MO.TObjects();
      // 注册事件
      MO.RWindow.lsnsUnload.register(o, o.onUnload);
      o._setuped = true;
   }
}

//==========================================================
// <T>获得环境集合。</T>
//
// @method
// @return TObjects 环境集合
//==========================================================
MO.REngine3d.prototype.contexts = function REngine3d_contexts(){
   return this._contexts;
}

//==========================================================
// <T>创建渲染环境。</T>
//
// @method
// @param clazz:HtmlCanvasTag 页面画板
// @param hCanvas:HtmlCanvasTag 页面画板
// @param attributes:HtmlCanvasTag 页面画板
// @return FGraphicContext 绘制环境
//==========================================================
MO.REngine3d.prototype.createContext = function REngine3d_createContext(clazz, hCanvas, attributes){
   var o = this;
   // 配置检查处理
   o.setup();
   // 创建类对象
   var context = MO.Class.create(clazz);
   if(attributes){
      context._optionAlpha = attributes.alpha;
      context._optionAntialias = attributes.antialias;
   }
   context.linkCanvas(hCanvas);
   // 保存环境
   o._contexts.push(context);
   return context;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.REngine3d.prototype.dispose = function REngine3d_dispose(){
   var o = this;
   var contexts = o._contexts;
   if(contexts){
      var count = contexts.count();
      for(var i = 0; i < count; i++){
         var context = contexts.at(i);
         context.dispose();
      }
      o._contexts = MO.Lang.Object.dispose(contexts);
   }
}
//..........................................................
// 实例化内容
MO.REngine3d = new MO.REngine3d();
MO.Engine3d = MO.REngine3d;
