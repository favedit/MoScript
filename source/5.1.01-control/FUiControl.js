//==========================================================
// <T>控件的基类。</T>
// <P>支持控件的样式、建立、显示、设计、模式功能。</P>
//
//  hParent<TAG>
// ┌-------------------┐
// │ hContainer<DIV>   │
// │┌---------------┐│
// ││Control        ││
// │└---------------┘│
// └-------------------┘
//
// @class
// @author maocy
// @version 141231
//==========================================================
MO.FUiControl = function FUiControl(o){
   o = MO.Class.inherits(this, o, MO.FUiComponent, MO.MUiStyle, MO.MUiSize, MO.MUiPadding, MO.MUiMargin);
   //..........................................................
   // @property Boolean 是否回行
   o._wrapCd        = MO.Class.register(o, [new MO.APtyEnum('_wrapCd', null, MO.EUiWrap, MO.EUiWrap.NextLine), new MO.AGetSet('_wrapCd')]);
   // @property Boolean 是否禁止
   o._visible       = MO.Class.register(o, new MO.APtyBoolean('_visible'), true);
   // @property Boolean 是否禁止
   o._disable       = MO.Class.register(o, new MO.APtyBoolean('_disable'), false);
   // @property String 提示信息
   o._hint          = MO.Class.register(o, new MO.APtyString('_hint'));
   //..........................................................
   // @style
   o._stylePanel    = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   // @style
   //o._styleDesign = MO.Class.register(o, new AStyle('Design'));
   // @style
   //o._styleDesignHover = MO.Class.register(o, new AStyle('DesignHover'));
   // @style
   //o._styleDesignDrag  = MO.Class.register(o, new AStyle('DesignDrag'));
   // @style
   //o._styleDesignMove  = MO.Class.register(o, new AStyle('DesignMove'));
   //..........................................................
   // @attribute
   o._layoutCd      = MO.EUiLayout.Display;
   o._sizeCd        = MO.EUiSize.Normal;
   // @attribute
   o._statusVisible = true;
   o._statusEnable  = true;
   o._statusBuild   = false;
   o._statusBuilded = false;
   o._storage       = null;
   //o._events      = null;
   //..........................................................
   // @html 父容器
   o._hParent       = null;
   // @html 面板容器
   o._hPanel        = null;
   //..........................................................
   // @event
   o.onEnter        = MO.Class.register(o, new MO.AEventMouseEnter('onEnter'), MO.FUiControl_onEnter);
   o.onLeave        = MO.Class.register(o, new MO.AEventMouseLeave('onLeave'), MO.FUiControl_onLeave);
   //o.onMouseOver    = MO.Class.register(o, new AEventMouseOver('onMouseOver'));
   //o.onMouseOut     = MO.Class.register(o, new AEventMouseOut('onMouseOut'));
   //o.onMouseDown    = MO.Class.register(o, new AEventMouseDown('onMouseDown'));
   //o.onMouseUp      = MO.Class.register(o, new AEventMouseUp('onMouseUp'));
   //o.onClick        = MO.Class.register(o, new AEventClick('onClick'));
   //o.onDoubleClick  = MO.Class.register(o, new AEventDoubleClick('onDoubleClick'));
   //o.onResize       = MO.Class.register(o, new AEventResize('onResize'));
   // @event
   o.onBuildPanel   = MO.FUiControl_onBuildPanel;
   o.onBuild        = MO.FUiControl_onBuild;
   o.onBuilded      = MO.Method.empty;
   //..........................................................
   // @process
   o.oeMode         = MO.FUiControl_oeMode;
   o.oeEnable       = MO.FUiControl_oeEnable;
   o.oeVisible      = MO.FUiControl_oeVisible;
   o.oeResize       = MO.FUiControl_oeResize;
   o.oeRefresh      = MO.FUiControl_oeRefresh;
   o.oeFrame        = MO.FUiControl_oeFrame;
   //..........................................................
   // @method
   o.construct      = MO.FUiControl_construct;
   // @method
   o.topControl     = MO.FUiControl_topControl;
   o.panel          = MO.FUiControl_panel;
   // @method
   o.isVisible      = MO.FUiControl_isVisible;
   o.setVisible     = MO.FUiControl_setVisible;
   o.show           = MO.FUiControl_show;
   o.hide           = MO.FUiControl_hide;
   // @method
   o.isEnable       = MO.FUiControl_isEnable;
   o.setEnable      = MO.FUiControl_setEnable;
   o.enable         = MO.FUiControl_enable;
   o.disable        = MO.FUiControl_disable;
   // @method
   o.attachEvent    = MO.FUiControl_attachEvent;
   o.linkEvent      = MO.FUiControl_linkEvent;
   o.callEvent      = MO.FUiControl_callEvent;
   // @method
   o.psMode         = MO.FUiControl_psMode;
   o.psDesign       = MO.FUiControl_psDesign;
   o.psEnable       = MO.FUiControl_psEnable;
   o.psVisible      = MO.FUiControl_psVisible;
   o.psResize       = MO.FUiControl_psResize;
   o.psRefresh      = MO.FUiControl_psRefresh;
   o.psFrame        = MO.FUiControl_psFrame;
   // @method
   o.isBuild        = MO.FUiControl_isBuild;
   o.build          = MO.FUiControl_build;
   o.builded        = MO.FUiControl_builded;
   o.refresh        = MO.FUiControl_refresh;
   o.setPanel       = MO.FUiControl_setPanel;
   // @method
   o.dispose        = MO.FUiControl_dispose;
   return o;
}

//==========================================================
// <T>当该控件获得热点时的处理</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.FUiControl_onEnter = function FUiControl_onEnter(e){
   var o = this;
   MO.Console.find(MO.FUiFocusConsole).enter(o);
   if(o._hint){
      MO.RWindow.setStatus(o._hint);
   }
}

//==========================================================
// <T>当该控件失去热点时的处理</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.FUiControl_onLeave = function FUiControl_onLeave(e){
   var o = this;
   MO.Console.find(MO.FUiFocusConsole).leave(o);
   if(o._hint){
      MO.RWindow.setStatus();
   }
}

//==========================================================
// <T>创建一个控件容器。</T>
// <P>默认为DIV页面元素。</P>
//
// @method
// @param p:event:MO.TEventProcess 事件处理
//==========================================================
MO.FUiControl_onBuildPanel = function FUiControl_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.RBuilder.createDiv(p, o.styleName('Panel'));
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FUiControl_onBuild = function FUiControl_onBuild(p){
   var o = this;
   // 建立控件容器
   o.onBuildPanel(p);
   // 设置可见性
   if(o._statusVisible != o._visible){
      o.setVisible(o._visible);
   }
   // 设置容器样式
   var h = o._hPanel;
   MO.RHtml.linkSet(h, 'control', o);
   // 关联容器事件
   o.attachEvent('onEnter', h);
   o.attachEvent('onLeave', h);
   //o.attachEvent('onMouseOver', h);
   //o.attachEvent('onMouseOut', h);
   //o.attachEvent('onMouseDown', h);
   //o.attachEvent('onMouseUp', h);
   //o.attachEvent('onClick', h);
   //o.attachEvent('onDoubleClick', h);
   //o.attachEvent('onKeyDown', h);
   //o.attachEvent('onKeyPress', h);
   //o.attachEvent('onKeyUp', h);
   //o.attachEvent('onResize', h);
   // 设置容器位置/大小/空白
   o.refreshBounds();
   o.refreshPadding();
   o.refreshMargin();
   // 如果父容器是可以容纳控件的，则将自己添加到父容器
   //if(MO.Class.isClass(o.parent, MContainer)){
   //   o.parent.appendChild(o);
   //}
}

//==========================================================
// <T>改变当前控件的工作模式。</T>
//
// @method
// @param e:event:MO.TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
MO.FUiControl_oeMode = function FUiControl_oeMode(e){
   var o = this;
   o._displayCd = e.displayCd;
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>改变当前控件的操作模式。</T>
//
// @method
// @param e:event:MO.TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
MO.FUiControl_oeEnable = function FUiControl_oeEnable(e){
   var o = this;
   if(e.isBefore()){
      o.setEnable(e.enable);
   }
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>改变当前控件的显示模式。</T>
//
// @method
// @param e:event:MO.TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
MO.FUiControl_oeVisible = function FUiControl_oeVisible(e){
   var o = this;
   if(e.isBefore()){
      o.setVisible(e.visible);
   }
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>改变当前控件的显示大小。</T>
//
// @method
// @param p:event:MO.TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
MO.FUiControl_oeResize = function FUiControl_oeResize(p){
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>刷新当前控件的显示内容。</T>
//
// @method
// @param e:event:MO.TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
MO.FUiControl_oeRefresh = function FUiControl_oeRefresh(e){
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>刷新当前控件的逐帧内容。</T>
//
// @method
// @param event:MO.TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
MO.FUiControl_oeFrame = function FUiControl_oeFrame(event){
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FUiControl_construct = function FUiControl_construct(){
   var o = this;
   o.__base.FUiComponent.construct.call(o);
   o.__base.MUiStyle.construct.call(o);
   o.__base.MUiSize.construct.call(o);
   o.__base.MUiPadding.construct.call(o);
   o.__base.MUiMargin.construct.call(o);
}

//==========================================================
// <T>获得指定类型的父控件。</T>
//
// @method
// @param c:class:Class 类
// @return FUiControl 父控件
//==========================================================
MO.FUiControl_topControl = function FUiControl_topControl(c){
   var r = this;
   if(c){
      while(r._parent){
         if(MO.Class.isClass(r._parent, c)){
            return r._parent;
         }
         r = r._parent;
      }
      if(!MO.Class.isClass(r, c)){
         return null;
      }
   }else{
      while(r._parent){
         if(!MO.Class.isClass(r._parent, FUiControl)){
            break;
         }
         r = r._parent;
      }
   }
   return r;
}

//==========================================================
// <T>根据底板类型得到相应的页面元素。</T>
//
// @method
// @param p:value:EPanel 底板类型
// @return HtmlTag 页面元素
//==========================================================
MO.FUiControl_panel = function FUiControl_panel(p){
   var o = this;
   switch(p){
      case MO.EPanel.Parent:
         return o._hParent;
      case MO.EPanel.Container:
      case MO.EPanel.Size:
         return o._hPanel;
   }
   return null;
}

//==========================================================
// <T>判断当前控件是否显示。</T>
//
// @method
// @return Boolean 是否显示
//==========================================================
MO.FUiControl_isVisible = function FUiControl_isVisible(){
   return this._statusVisible;
}

//==========================================================
// <T>设置控件的隐藏和显示。</T>
//
// @method
// @param p:visible:Boolean 是否显示
//==========================================================
MO.FUiControl_setVisible = function FUiControl_setVisible(p){
   var o = this;
   o._statusVisible = p;
   // 设置布局底板的可见性
   //var h = o._hLayoutCell;
   //if(h){
   //   MO.RHtml.displaySet(hp, v);
   //}
   // 设置控件底板的可见性
   var h = o.panel(MO.EPanel.Container);
   if(h){
      //MO.RHtml.displaySet(h, p);
      MO.RHtml.visibleSet(h, p);
   }
}

//==========================================================
// <T>显示状态切换。</T>
//
// @method
//==========================================================
MO.FUiControl_show = function FUiControl_show(){
   var o = this;
   if(!o._statusVisible){
      o.setVisible(true);
   }
}

//==========================================================
// <T>隐藏状态切换。</T>
//
// @method
//==========================================================
MO.FUiControl_hide = function FUiControl_hide(){
   var o = this;
   if(o._statusVisible){
      o.setVisible(false);
   }
}

//==========================================================
// <T>判断当前控件是否可以操作。</T>
//
// @method
// @return Boolean 是否可以
//==========================================================
MO.FUiControl_isEnable = function FUiControl_isEnable(){
   return this._statusEnable;
}

//==========================================================
// <T>设置控件的可操作和禁止。</T>
//
// @method
// @param p:enable:Boolean 是否可操作
//==========================================================
MO.FUiControl_setEnable = function FUiControl_setEnable(p){
   var o = this;
   o._statusEnable = p;
   var h = o.panel(EPanel.Container);
   if(h){
      h.style.disabled = !p;
   }
}

//==========================================================
// <T>可操作状态切换。</T>
//
// @method
//==========================================================
MO.FUiControl_enable = function FUiControl_enable(){
   var o = this;
   if(!o._statusEnable){
      o.setEnable(true);
   }
}

//==========================================================
// <T>禁止状态切换。</T>
//
// @method
//==========================================================
MO.FUiControl_disable = function FUiControl_disable(){
   var o = this;
   if(o._statusEnable){
      o.setEnable(false);
   }
}

//==========================================================
// <T>将一个页面元素和已经注册过的事件相关联。</T>
// <P>如果指定了立即函数，则发生事件时，会立即执行立即函数。
//    该立即函数的this指针指向当前控件实例。</P>
// <P>如果存在注册过的队列函数，则发生事件时，该事件被排到队列中等待执行。
//    执行时该函数的this指针指向当前控件实例。</P>
//
// @method
// @param n:name:String 注册过的事件名称
// @param h:hPanel:HTML 页面元素
// @param m:method:Function 立即函数
// @return TEvent 关联的事件对象
// @see RControl.attachEvent
//==========================================================
MO.FUiControl_attachEvent = function FUiControl_attachEvent(n, h, m, u){
   return MO.RUiControl.attachEvent(this, n, h, m, u);
}

//==========================================================
// <T>将一个页面元素和已经注册过的事件相关联。</T>
// <P>如果指定了立即函数，则发生事件时，会立即执行立即函数。
//    该立即函数的this指针指向到达者控件实例。
//    可以通过事件对象的发出者访问到该发出对象。</P>
// <P>如果存在注册过的队列函数，则发生事件时，该事件被排到队列中等待执行。
//    执行时该函数的this指针指向到达者控件实例。
//    可以通过事件对象的发出者访问到该发出对象。</P>
//
// @method
// @param t:target:FUiControl 到达者控件
// @param n:name:String 注册过的事件名称
// @param h:hPanel:HTML 页面元素
// @param m:method:Function 立即函数
// @return TEvent 关联的事件对象
// @see RControl.linkEvent
//==========================================================
MO.FUiControl_linkEvent = function FUiControl_linkEvent(t, n, h, m){
   return MO.RUiControl.linkEvent(this, t, n, h, m);
}

//==========================================================
// <T>调用控件的关联事件。</T>
//
// @method
// @param n:name:String 事件名称
// @param s:source:FUiControl 事件源
// @param e:event:TEvent 事件对象
//==========================================================
MO.FUiControl_callEvent = function FUiControl_callEvent(n, s, e){
   var o = this;
   var es = o._events;
   if(es){
      var ec = es.get(n);
      if(ec){
         ec.invoke(s, s, e);
      }
   }
}

//==========================================================
// <T>分发工作模式的事件。</T>
//
// @method
// @param p:displayMode:EDisplayMode 显示模式
//==========================================================
MO.FUiControl_psMode = function FUiControl_psMode(p){
   var o = this;
   // 创建事件
   var e = new MO.TEventProcess(o, 'oeMode', MO.FUiControl);
   e.displayCd = p;
   // 处理消息
   o.process(e);
   e.dispose();
}

//==========================================================
// <T>分发改变控件设计状态的事件。</T>
//
// @method
// @param m:mode:EDesign 设计模式
// @param f:flag:Boolean 开始还是结束
//==========================================================
MO.FUiControl_psDesign = function FUiControl_psDesign(m, f){
   var o = this;
   MO.Console.find(FDesignConsole).setFlag(m, f, o);
   // 创建事件
   var e = new MO.TEventProcess(o, 'oeDesign', MO.MDesign)
   e.mode = m;
   e.flag = f;
   // 处理消息
   o.process(e);
   e.dispose();
}

//==========================================================
// <T>分发改变控件可操作和禁止的事件。</T>
//
// @method
// @param v:enable:Boolean 是否可操作
//==========================================================
MO.FUiControl_psEnable = function FUiControl_psEnable(v){
   var o = this;
   // 创建事件
   var e = new MO.TEventProcess(o, 'oeEnable', MO.FUiControl)
   e.enable = v;
   // 处理消息
   o.process(e);
   e.dispose();
}

//==========================================================
// <T>分发改变控件隐藏和显示的事件。</T>
//
// @method
// @param v:visible:Boolean 是否可见
//==========================================================
MO.FUiControl_psVisible = function FUiControl_psVisible(v){
   var o = this;
   // 创建事件
   var e = new MO.TEventProcess(o, 'oeVisible', MO.FUiControl);
   e.visible = v;
   // 处理消息
   o.process(e);
   e.dispose();
}

//==========================================================
// <T>分发改变控件大小的事件。</T>
//
// @method
//==========================================================
MO.FUiControl_psResize = function FUiControl_psResize(){
   var o = this;
   // 创建事件
   var e = new MO.TEventProcess(o, 'oeResize', MO.FUiControl);
   // 处理消息
   o.process(e);
   e.dispose();
}

//==========================================================
// <T>分发控件刷新的事件。</T>
//
// @method
// @param t:type:String 刷新类型
//==========================================================
MO.FUiControl_psRefresh = function FUiControl_psRefresh(t){
   var o = this;
   // 创建事件
   var e = new MO.TEventProcess(o, 'oeRefresh', MO.FUiControl);
   // 处理消息
   o.process(e);
   e.dispose();
}

//==========================================================
// <T>分发控件帧的事件。</T>
//
// @method
//==========================================================
MO.FUiControl_psFrame = function FUiControl_psFrame(){
   var o = this;
   // 创建事件
   var event = new MO.TEventProcess(o, 'oeFrame', MO.FUiControl);
   // 处理消息
   o.process(event);
   event.dispose();
}

//==========================================================
// <T>判断是否已经构建。</T>
//
// @method
// @return Boolean 是否构建
//==========================================================
MO.FUiControl_isBuild = function FUiControl_isBuild(){
   return this._statusBuild;
}

//==========================================================
// <T>构建处理。</T>
// <P>只允许构建一次，不允许重复构建。</P>
//
// @method
// @param p:html:HtmlTag 页面元素
//==========================================================
MO.FUiControl_build = function FUiControl_build(p){
   var o = this;
   // 检查状态
   if(o._statusBuild){
      throw new MO.TError(o, 'Current control is already builded.');
   }
   // 获得文档对象
   var d = null;
   if(p.createElement){
      d = p;
   }else if(p.ownerDocument && p.ownerDocument.createElement){
      d = p.ownerDocument;
   }else if(p.hDocument){
      d = p.hDocument;
   }else{
      throw new MO.TError("Build document is invalid. (document={1})", p);
   }
   // 构建处理
   var a = new MO.SArguments();
   a.owner = o;
   a.hDocument = d;
   o.onBuild(a);
   a.owner = null;
   a.hDocument = null;
   MO.Lang.Object.free(a);
   // 设置状态
   o._statusBuild = true;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:html:HtmlTag 页面元素
//==========================================================
MO.FUiControl_builded = function FUiControl_builded(p){
   var o = this;
   // 检查状态
   if(!o._statusBuild){
      throw new MO.TError(o, 'Current control is not build.');
   }
   // 检查完成状态
   if(o._statusBuilded){
      throw new MO.TError(o, 'Current control is already builded.');
   }
   // 构建完成处理
   o.onBuilded(p);
   // 设置状态
   o._statusBuilded = true;
}

//==========================================================
// <T>刷新处理。</T>
// <P>构件后，重新加载内容时，需要刷新处理。</P>
//
// @method
//==========================================================
MO.FUiControl_refresh = function FUiControl_refresh(){
   var o = this;
   // 检查状态
   if(!o._statusBuild){
      throw new MO.TError(o, 'Current control is not build.');
   }
}

//==========================================================
// <T>设置控件的页面父容器。</T>
//
// @method
// @param h:hPanel:HtmlTag 页面元素
//==========================================================
MO.FUiControl_setPanel = function FUiControl_setPanel(h){
   var o = this;
   o._hParent = h;
   h.appendChild(o._hPanel);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FUiControl_dispose = function FUiControl_dispose(){
   var o = this;
   // 释放属性
   o._disable = null;
   o._wrapCd = null;
   o._hint = null;
   // 释放属性
   o._styleContainer = null;
   // 释放属性
   o._statusVisible = null;
   o._statusEnable = null;
   o._statusBuild = null;
   // 释放属性
   o._hParent = null;
   o._hPanel = MO.RHtml.free(o._hPanel);
   // 释放处理
   o.__base.MUiMargin.dispose.call(o);
   o.__base.MUiPadding.dispose.call(o);
   o.__base.MUiSize.dispose.call(o);
   o.__base.MUiStyle.dispose.call(o);
   o.__base.FUiComponent.dispose.call(o);
}
