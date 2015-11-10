//==========================================================
// <T>控件对象。</T>
//
// @class
// @author maocy
// @version 150610
//==========================================================
MO.FGuiControl = function FGuiControl(o){
   o = MO.Class.inherits(this, o, MO.FGuiComponent, MO.MUiControl, MO.MGraphicObject, MO.MRenderableLinker, MO.MListener, MO.MUiMargin, MO.MUiPadding, MO.MUiBorder, MO.MGuiSize);
   //..........................................................
   // @property
   o._optionScale            = MO.Class.register(o, [new MO.AGetter('_optionScale')], true);
   // @property
   o._alpha                  = MO.Class.register(o, [new MO.APtyString('_alpha'), new MO.AGetSet('_alpha')], 1);
   o._displayOrder           = MO.Class.register(o, [new MO.APtyString('_displayOrder'), new MO.AGetSet('_displayOrder')], 0);
   o._foreColor              = MO.Class.register(o, [new MO.APtyString('_foreColor'), new MO.AGetSet('_foreColor')], '#FFFFFF');
   o._foreFont               = MO.Class.register(o, [new MO.APtyFont('_foreFont'), new MO.AGetSet('_foreFont')]);
   o._backColor              = MO.Class.register(o, [new MO.APtyString('_backColor'), new MO.AGetSet('_backColor')]);
   o._backFont               = MO.Class.register(o, [new MO.APtyFont('_backFont'), new MO.AGetSet('_backFont')]);
   o._backResource           = MO.Class.register(o, [new MO.APtyString('_backResource'), new MO.AGetSet('_backResource')]);
   o._backGrid               = MO.Class.register(o, [new MO.APtyPadding('_backGrid'), new MO.AGetter('_backGrid')]);
   o._backHoverColor         = MO.Class.register(o, [new MO.APtyString('_backHoverColor'), new MO.AGetSet('_backHoverColor')]);
   o._backHoverResource      = MO.Class.register(o, [new MO.APtyString('_backHoverResource'), new MO.AGetSet('_backHoverResource')]);
   o._backHoverGrid          = MO.Class.register(o, [new MO.APtyPadding('_backHoverGrid'), new MO.AGetter('_backHoverGrid')]);
   //..........................................................
   // @attribute
   o._manager                = MO.Class.register(o, new MO.AGetSet('_manager'));
   // @attribute
   o._statusReady            = false;
   o._statusDirty            = true;
   o._statusHover            = false;
   // @attribute
   o._backImage              = null;
   o._backHoverResource      = null;
   // @attribute
   o._clientRectangle        = MO.Class.register(o, new MO.AGetter('_clientRectangle'));
   o._parentRectangle        = MO.Class.register(o, new MO.AGetter('_parentRectangle'));
   o._eventRectangle         = null;
   // @attribute
   o._operationDownListeners = MO.Class.register(o, new MO.AListener('_operationDownListeners', MO.EEvent.OperationDown));
   o._operationMoveListeners = MO.Class.register(o, new MO.AListener('_operationMoveListeners', MO.EEvent.OperationMove));
   o._operationUpListeners   = MO.Class.register(o, new MO.AListener('_operationUpListeners', MO.EEvent.OperationUp));
   // @attribute
   o._paintEvent             = null;
   //..........................................................
   // @event
   o.onResourceLoad          = MO.FGuiControl_onResourceLoad;
   o.onUpdate                = MO.FGuiControl_onUpdate;
   // @event
   o.onPaintBegin            = MO.FGuiControl_onPaintBegin;
   o.onPaintEnd              = MO.FGuiControl_onPaintEnd;
   // @event
   o.onOperationDown         = MO.FGuiControl_onOperationDown;
   o.onOperationMove         = MO.FGuiControl_onOperationMove;
   o.onOperationUp           = MO.FGuiControl_onOperationUp;
   o.onEvent                 = MO.FGuiControl_onEvent;
   //..........................................................
   // @process
   o.oeInitialize            = MO.FGuiControl_oeInitialize;
   o.oeResize                = MO.FGuiControl_oeResize;
   o.oeUpdate                = MO.FGuiControl_oeUpdate;
   //..........................................................
   // @method
   o.construct               = MO.FGuiControl_construct;
   // @method
   o.isReady                 = MO.FGuiControl_isReady;
   o.isDirty                 = MO.FGuiControl_isDirty;
   o.setVisible              = MO.FGuiControl_setVisible;
   o.setSize                 = MO.FGuiControl_setSize;
   o.findManager             = MO.FGuiControl_findManager;
   // @method
   o.testReady               = MO.FGuiControl_testReady;
   o.testDirty               = MO.FGuiControl_testDirty;
   o.testInRange             = MO.FGuiControl_testInRange;
   o.loadResourceImage       = MO.FGuiControl_loadResourceImage;
   o.paint                   = MO.FGuiControl_paint;
   o.update                  = MO.FGuiControl_update;
   o.build                   = MO.Method.empty;
   o.makeRenderable          = MO.FGuiControl_makeRenderable;
   o.updateRenderable        = MO.FGuiControl_updateRenderable;
   o.processReady            = MO.FGuiControl_processReady;
   o.processEvent            = MO.FGuiControl_processEvent;
   o.dirty                   = MO.FGuiControl_dirty;
   // @method
   o.psPaint                 = MO.FGuiControl_psPaint;
   o.psUpdate                = MO.FGuiControl_psUpdate;
   // @method
   o.dispose                 = MO.FGuiControl_dispose;
   return o;
}

//==========================================================
// <T>资源加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FGuiControl_onResourceLoad = function FGuiControl_onResourceLoad(event){
   this.dirty();
}

//==========================================================
// <T>更新内容处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FGuiControl_onUpdate = function FGuiControl_onUpdate(event){
   var o = this;
   var location = o._location;
   var size = o._size;
   var rectangle = event.rectangle;
   //..........................................................
   // 子控件处理
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         if(MO.Class.isClass(component, MO.FGuiControl)){
            component.onUpdate(event);
         }
      }
   }
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FGuiControl_onPaintBegin = function FGuiControl_onPaintBegin(event){
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   // 绘制底色
   if(o._backColor){
      graphic.fillRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height, o._styleBackcolor, 1);
   }
   // 绘制背景图
   var image = null;
   var imageGrid = null;
   if(o._statusHover){
      image = o._backHoverImage;
      imageGrid = o._backHoverGrid;
   }else{
      image = o._backImage;
      imageGrid = o._backGrid;
   }
   if(image){
      if(imageGrid && !imageGrid.isEmpty()){
         graphic.drawGridImage(image.bitmap, rectangle.left, rectangle.top, rectangle.width, rectangle.height, imageGrid);
      }else{
         graphic.drawImage(image.bitmap, rectangle.left, rectangle.top, rectangle.width, rectangle.height);
      }
   }
   // 绘制外边框
   if(o._borderOuter.valid){
      graphic.drawBorder(rectangle, o._borderOuter);
   }
   // 绘制内边框
   if(o._borderInner.valid){
      graphic.drawBorder(rectangle, o._borderInner);
   }
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FGuiControl_onPaintEnd = function FGuiControl_onPaintEnd(event){
   var o = this;
}

//==========================================================
// <T>操作落下处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FGuiControl_onOperationDown = function FGuiControl_onOperationDown(event){
   var o = this;
   if(event.flag){
      o.processOperationDownListener(event);
   }
}

//==========================================================
// <T>操作移动处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FGuiControl_onOperationMove = function FGuiControl_onOperationMove(event){
   var o = this;
   if(event.flag){
      o.processOperationMoveListener(event);
   }
   //if(o._backHoverResource){
      //o._statusHover = true;
      //console.log(o._name, event.code + '-' + event.flag, '(' + event.clientX + ',' + event.clientY + ')', '(' + event.locationX + ',' + event.locationY + ')');
      //o.topComponent().build();
   //}
}

//==========================================================
// <T>操作抬起处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FGuiControl_onOperationUp = function FGuiControl_onOperationUp(event){
   var o = this;
   if(event.flag){
      o.processOperationUpListener(event);
   }
}

//==========================================================
// <T>时间响应处理。</T>
//
// @method
// @param event:SEvent 事件信息
// @param flag:Boolean 标志
//==========================================================
MO.FGuiControl_onEvent = function FGuiControl_onEvent(event, flag){
   var o = this;
   event.flag = flag;
   //..........................................................
   var code = event.code;
   switch(code){
      case MO.EEvent.MouseDown:
         o.onOperationDown(event);
         break;
      case MO.EEvent.MouseMove:
         o.onOperationMove(event);
         break;
      case MO.EEvent.MouseUp:
         o.onOperationUp(event);
         break;
      default:
         throw new TError('Unknown event type.');
   }
}

//==========================================================
// <T>处理初始化事件。</T>
//
// @method
// @param event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
MO.FGuiControl_oeInitialize = function FGuiControl_oeInitialize(event){
   var o = this;
   var resultCd = o.__base.FGuiComponent.oeInitialize.call(o, event)
   if(event.isBefore()){
      // 加载背景资源
      if(o._backResource){
         var image = o._backImage = new MO.SGuiImage();
         image.resource = o._backResource;
         image.load();
      }
      // 加载背景活动资源
      if(o._backHoverResource){
         var image = o._backHoverImage = new MO.SGuiImage();
         image.resource = o._backHoverResource;
         image.load();
      }
   }
   return resultCd;
}

//==========================================================
// <T>表单图片控件。</T>
//
// @class
// @author maocy
// @version 150610
//==========================================================
MO.FGuiControl_oeResize = function FGuiControl_oeResize(event){
   var o = this;
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>表单图片控件。</T>
//
// @class
// @author maocy
// @version 150610
//==========================================================
MO.FGuiControl_oeUpdate = function FGuiControl_oeUpdate(event){
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiControl_construct = function FGuiControl_construct(){
   var o = this;
   o.__base.FGuiComponent.construct.call(o);
   o.__base.MGuiSize.construct.call(o);
   o.__base.MUiMargin.construct.call(o);
   o.__base.MUiPadding.construct.call(o);
   o.__base.MUiBorder.construct.call(o);
   // 创建属性
   o._parentRectangle = new MO.SRectangle();
   o._clientRectangle = new MO.SRectangle();
   o._eventRectangle = new MO.SRectangle();
   o._foreFont = new MO.SUiFont();
   o._backFont = new MO.SUiFont();
   //o._backColor = '#CCCCCC';
   //o._borderInner.left.color = '#FFFFFF';
   //o._borderInner.top.color = '#00FF00';
   //o._borderInner.right.color = '#0000FF';
   //o._borderInner.bottom.color = '#FF00FF';
   // 创建属性
   o._paintEvent = new MO.SGuiPaintEvent();
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 准备好
//==========================================================
MO.FGuiControl_isReady = function FGuiControl_isReady(){
   return this._statusReady;
}

//==========================================================
// <T>测试是否数据脏。</T>
//
// @method
// @return Boolean 数据脏
//==========================================================
MO.FGuiControl_isDirty = function FGuiControl_isDirty(){
   return this._statusDirty;
}

//==========================================================
// <T>设置可见性。</T>
//
// @method
// @param flag:Boolean 标志
//==========================================================
MO.FGuiControl_setVisible = function FGuiControl_setVisible(flag){
   var o = this;
   // 设置标志
   o._visible = flag;
   // 设置渲染对象
   //var renderable = o._renderable;
   //if(renderable){
   //   renderable.setVisible(flag);
   //}
   // 全部脏
   var manager = o._manager;
   if(manager){
      manager.dirty();
   }
}

//==========================================================
// <T>设置大小。</T>
//
// @method
// @param width:Number 宽度
// @param height:Number 高度
//==========================================================
MO.FGuiControl_setSize = function FGuiControl_setSize(width, height){
   var o = this;
   o.__base.MGuiSize.setSize.call(o, width, height);
   // 设置渲染对象坐标
   //var renderable = o._renderable;
   //if(renderable){
   //   renderable.setSize(width, height);
   //}
}

//==========================================================
// <T>设置大小。</T>
//
// @method
// @param width:Number 宽度
// @param height:Number 高度
//==========================================================
MO.FGuiControl_findManager = function FGuiControl_findManager(){
   var o = this;
   var manager = o._manager;
   if(!manager){
      var findControl = o._parent;
      while(findControl){
      }
   }
   
   // 设置渲染对象坐标
   //var renderable = o._renderable;
   //if(renderable){
   //   renderable.setSize(width, height);
   //}
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
MO.FGuiControl_testReady = function FGuiControl_testReady(){
   var o = this;
   // 检查位图是否加载完成
   var image = o._backImage;
   if(image){
      if(!image.testReady()){
         return false;
      }
   }
   // 检查位图是否加载完成
   var image = o._backHoverImage;
   if(image){
      if(!image.testReady()){
         return false;
      }
   }
   return true;
}

//==========================================================
// <T>测试是否脏数据。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
MO.FGuiControl_testDirty = function FGuiControl_testDirty(){
   var o = this;
   // 查询是否有子控件脏
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         if(MO.Class.isClass(component, MO.FGuiControl)){
            var dirty = component.testDirty();
            if(dirty){
               o._statusDirty = true;
               break;
            }
         }
      }
   }
   // 返回当前对象脏状态
   return o._statusDirty;
}

//==========================================================
// <T>测试是否在范围内。</T>
//
// @method
// @param x:Number 横坐标
// @param y:Number 纵坐标
// @return Boolean 是否在范围内
//==========================================================
MO.FGuiControl_testInRange = function FGuiControl_testInRange(x, y){
   var o = this;
   //var range = o._clientRectangle.testRange(x, y);
   //return range;
}

//==========================================================
// <T>加载资源图片。</T>
//
// @method
// @param uri:String 网络地址
// @return FImage 资源
//==========================================================
MO.FGuiControl_loadResourceImage = function FGuiControl_loadResourceImage(uri){
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = imageConsole.load(uri);
   image.addLoadListener(o, o.onResourceLoad);
   return image;
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @param event:SEvent 时间
//==========================================================
MO.FGuiControl_paint = function FGuiControl_paint(event){
   var o = this;
   var location = o._location;
   var size = o._size;
   var dockCd = o._dockCd;
   var anchorCd = o._anchorCd;
   var graphic = event.graphic;
   var parentRectangle = event.parentRectangle;
   var rectangle = event.rectangle;
   //var sizeRate = event.sizeRate;
   var calculateRate = event.calculateRate;
   var calculateWidth = calculateRate.width;
   var calculateHeight = calculateRate.height;
   o._parentRectangle.assign(parentRectangle);
   o._eventRectangle.assign(rectangle);
   //..........................................................
   // 设置范围
   var parentRight = parentRectangle.right();
   var parentBottom = parentRectangle.bottom();
   var left = 0;
   var top = 0;
   var right = 0;
   var bottom = 0;
   var width = 0;
   var height = 0;
   if(anchorCd & MO.EUiAnchor.Left){
      left = rectangle.left + location.x * calculateWidth;
   }else{
      left = rectangle.left + location.x;
   }
   if(anchorCd & MO.EUiAnchor.Top){
      top = rectangle.top + location.y * calculateHeight;
   }else{
      top = rectangle.top + location.y;
   }
   if(anchorCd & MO.EUiAnchor.Right){
      right = parentRight - o._right * calculateWidth;
   }else{
      right = parentRight - o._right;
   }
   if(anchorCd & MO.EUiAnchor.Bottom){
      bottom = parentBottom - o._bottom * calculateHeight;
   }else{
      bottom = parentBottom - o._bottom;
   }
   if((anchorCd & MO.EUiAnchor.Left) && (anchorCd & MO.EUiAnchor.Right)){
      width = size.width * calculateWidth;
   }else{
      width = size.width;
   }
   if((anchorCd & MO.EUiAnchor.Top) && (anchorCd & MO.EUiAnchor.Bottom)){
      height = size.height * calculateHeight;
   }else{
      height = size.height;
   }
   //..........................................................
   // 计算停靠位置
   if((dockCd == MO.EUiDock.RightTop) || (dockCd == MO.EUiDock.Right) || (dockCd == MO.EUiDock.RightBottom)){
      right = parentRight - o._right * calculateWidth;
      left = right - width;
   }
   if((dockCd == MO.EUiDock.LeftBottom) || (dockCd == MO.EUiDock.Bottom) || (dockCd == MO.EUiDock.RightBottom)){
      bottom = parentBottom - o._bottom * calculateHeight;
      top = bottom - height;
   }
   // 计算锚点位置
   if((anchorCd & MO.EUiAnchor.Left) && (anchorCd & MO.EUiAnchor.Right)){
      width = right - left;
   }else if(o._anchorCd & MO.EUiAnchor.Left){
      left = parentRight - width - o._right;
      width = right - left;
   }else if(o._anchorCd & MO.EUiAnchor.Right){
      width = parentRight - left - o._right;
   }
   if((anchorCd & MO.EUiAnchor.Top) && (o._anchorCd & MO.EUiAnchor.Bottom)){
      height = bottom - top;
   }else if(o._anchorCd & MO.EUiAnchor.Top){
      top = parentBottom - height - o._bottom;
      height = bottom - top;
   }else if(o._anchorCd & MO.EUiAnchor.Bottom){
      height = parentBottom - top - o._bottom;
   }
   //..........................................................
   // 计算范围
   rectangle.set(left, top, Math.max(width, 0), Math.max(height, 0));
   parentRectangle.assign(rectangle);
   o._clientRectangle.assign(rectangle);
   graphic.store();
   graphic.setScale(o._scale.width, o._scale.height);
   //..........................................................
   // 开始绘制处理
   o.onPaintBegin(event);
   // 子控件处理
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         if(MO.Class.isClass(component, MO.FGuiControl)){
            component.paint(event);
         }
      }
   }
   // 绘制结束处理
   o.onPaintEnd(event);
   graphic.restore();
   //..........................................................
   rectangle.assign(o._eventRectangle);
   parentRectangle.assign(o._parentRectangle);
   o._statusDirty = false;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
MO.FGuiControl_update = function FGuiControl_update(){
   var o = this;
   var size = o._size;
   // 更新处理
   var event = MO.Memory.alloc(SGuiUpdateEvent)
   event.rectangle.set(0, 0, size.width, size.height)
   o.onUpdate(event);
   MO.Memory.free(event);
}

//==========================================================
// <T>脏处理。</T>
//
// @method
//==========================================================
MO.FGuiControl_dirty = function FGuiControl_dirty(){
   this._statusDirty = true;
}

//==========================================================
// <T>建立渲染对象处理。</T>
//
// @method
//==========================================================
MO.FGuiControl_makeRenderable = function FGuiControl_makeRenderable(){
   var o = this;
   //var location = o._location;
   //var size = o._size;
   //..........................................................
   // 获得渲染对象
   var renderable = o._renderable;
   if(!renderable){
      renderable = o._renderable = o._graphicContext.createObject(MO.FGuiControlRenderable);
      renderable.setControl(o);
   }
   //renderable.setLocation(location.x, location.y);
   //renderable.setSize(size.width, size.height);
   //..........................................................
   // 更新处理
   //o.update();
   return renderable;
}

//==========================================================
// <T>建立渲染对象处理。</T>
//
// @method
//==========================================================
MO.FGuiControl_updateRenderable = function FGuiControl_updateRenderable(){
   var o = this;
   var renderable = o._renderable;
   var graphic = renderable.beginDraw();
   var size = o._size;
   // 绘制处理
   var event = o._paintEvent;
   event.optionScale = false;
   event.graphic = graphic;
   event.virtualSize = size;
   event.parentRectangle.set(0, 0, size.width, size.height);
   event.rectangle.set(0, 0, size.width, size.height);
   event.calculateRate = new MO.SSize2(1, 1);
   o.paint(event);
   renderable.endDraw();
}

//==========================================================
// <T>测试是否准备好处理。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
MO.FGuiControl_processReady = function FGuiControl_processReady(){
   var o = this;
   if(!o._statusReady){
      o._statusReady = o.testReady();
   }
   return o._statusReady;
}

//==========================================================
// <T>分发改变控件可操作和禁止的事件。</T>
//
// @method
// @param enable:Boolean 是否可操作
//==========================================================
MO.FGuiControl_processEvent = function FGuiControl_processEvent(event){
   var o = this;
   var range = o.testInRange(event.locationX, event.locationY)
   if(range){
      o.onEvent(event, true);
      var components = o._components;
      if(components){
         var count = components.count();
         for(var i = 0; i < count; i++){
            var component = components.at(i);
            var result = component.processEvent(event);
            if(result){
               break;
            }
         }
      }
      o.onEvent(event, false);
      return true;
   }
   return false;
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiControl_psPaint = function FGuiControl_psPaint(event){
   var o = this;
   // 创建事件
   var event = new MO.SUiDispatchEvent(o, 'oePaint', MO.FGuiControl);
   // 处理消息
   o.process(event);
   event.dispose();
}

//==========================================================
// <T>分发控件更新的事件。</T>
//
// @method
//==========================================================
MO.FGuiControl_psUpdate = function FGuiControl_psUpdate(){
   var o = this;
   // 创建事件
   var event = new MO.SUiDispatchEvent(o, 'oeUpdate', MO.FGuiControl);
   // 处理消息
   o.process(event);
   event.dispose();
}

//==========================================================
// <T>析构处理。</T>
//
// @method
//==========================================================
MO.FGuiControl_dispose = function FGuiControl_dispose(){
   var o = this;
   // 释放属性
   o._backImage = MO.Lang.Object.dispose(o._backImage);
   o._backHoverImage = MO.Lang.Object.dispose(o._backHoverImage);
   o._clientRectangle = MO.Lang.Object.dispose(o._clientRectangle);
   o._paintEvent = MO.Lang.Object.dispose(o._paintEvent);
   // 父处理
   o.__base.MGuiSize.dispose.call(o);
   o.__base.MUiBorder.dispose.call(o);
   o.__base.MUiPadding.dispose.call(o);
   o.__base.MUiMargin.dispose.call(o);
   o.__base.MRenderableLinker.dispose.call(o);
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.MUiControl.dispose.call(o);
   o.__base.FGuiComponent.dispose.call(o);
}
