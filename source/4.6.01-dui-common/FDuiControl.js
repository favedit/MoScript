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
MO.FDuiControl = function FDuiControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiComponent, MO.MUiControl, MO.MListener, MO.MUiMargin, MO.MUiPadding, MO.MDuiSize, MO.MDuiStyle);
   //..........................................................
   // @property
   o._nowrap        = MO.Class.register(o, [new MO.APtyBoolean('_nowrap'), new MO.AGetSet('_nowrap')]);
   o._foreColor     = MO.Class.register(o, [new MO.APtyString('_foreColor'), new MO.AGetSet('_foreColor')]);
   o._foreFont      = MO.Class.register(o, [new MO.APtyString('_foreFont'), new MO.AGetSet('_foreFont')]);
   o._backColor     = MO.Class.register(o, [new MO.APtyString('_backColor'), new MO.AGetSet('_backColor')]);
   o._backFont      = MO.Class.register(o, [new MO.APtyString('_backFont'), new MO.AGetSet('_backFont')]);
   //..........................................................
   // @style
   o._stylePanel    = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   // @style
   //o._styleDesign = MO.Class.register(o, new MO.AStyle('Design'));
   // @style
   //o._styleDesignHover = MO.Class.register(o, new MO.AStyle('DesignHover'));
   // @style
   //o._styleDesignDrag  = MO.Class.register(o, new MO.AStyle('DesignDrag'));
   // @style
   //o._styleDesignMove  = MO.Class.register(o, new MO.AStyle('DesignMove'));
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
   o.onEnter        = MO.Class.register(o, new MO.AEventMouseEnter('onEnter'), MO.FDuiControl_onEnter);
   o.onLeave        = MO.Class.register(o, new MO.AEventMouseLeave('onLeave'), MO.FDuiControl_onLeave);
   //o.onMouseOver    = MO.Class.register(o, new MO.AEventMouseOver('onMouseOver'));
   //o.onMouseOut     = MO.Class.register(o, new MO.AEventMouseOut('onMouseOut'));
   //o.onMouseDown    = MO.Class.register(o, new MO.AEventMouseDown('onMouseDown'));
   //o.onMouseUp      = MO.Class.register(o, new MO.AEventMouseUp('onMouseUp'));
   //o.onClick        = MO.Class.register(o, new MO.AEventClick('onClick'));
   //o.onDoubleClick  = MO.Class.register(o, new MO.AEventDoubleClick('onDoubleClick'));
   //o.onResize       = MO.Class.register(o, new MO.AEventResize('onResize'));
   // @event
   o.onBuildPanel   = MO.FDuiControl_onBuildPanel;
   o.onBuild        = MO.FDuiControl_onBuild;
   o.onBuilded      = MO.Method.empty;
   //..........................................................
   // @process
   o.oeMode         = MO.FDuiControl_oeMode;
   //..........................................................
   // @method
   o.construct      = MO.FDuiControl_construct;
   // @method
   o.topControl     = MO.FDuiControl_topControl;
   o.panel          = MO.FDuiControl_panel;
   // @method
   o.isVisible      = MO.FDuiControl_isVisible;
   o.setVisible     = MO.FDuiControl_setVisible;
   o.show           = MO.FDuiControl_show;
   o.hide           = MO.FDuiControl_hide;
   // @method
   o.isEnable       = MO.FDuiControl_isEnable;
   o.setEnable      = MO.FDuiControl_setEnable;
   o.enable         = MO.FDuiControl_enable;
   o.disable        = MO.FDuiControl_disable;
   // @method
   o.setMargin      = MO.FDuiControl_setMargin;
   o.refreshMargin  = MO.FDuiControl_refreshMargin;
   o.setPadding     = MO.FDuiControl_setPadding;
   o.refreshPadding = MO.FDuiControl_refreshPadding;
   // @method
   o.attachEvent    = MO.FDuiControl_attachEvent;
   o.linkEvent      = MO.FDuiControl_linkEvent;
   o.callEvent      = MO.FDuiControl_callEvent;
   // @method
   o.isBuild        = MO.FDuiControl_isBuild;
   o.build          = MO.FDuiControl_build;
   o.builded        = MO.FDuiControl_builded;
   o.refresh        = MO.FDuiControl_refresh;
   o.setPanel       = MO.FDuiControl_setPanel;
   // @method
   o.dispose        = MO.FDuiControl_dispose;
   return o;
}

//==========================================================
// <T>当该控件获得热点时的处理</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.FDuiControl_onEnter = function FDuiControl_onEnter(e){
   var o = this;
   MO.Console.find(MO.FDuiFocusConsole).enter(o);
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
MO.FDuiControl_onLeave = function FDuiControl_onLeave(e){
   var o = this;
   MO.Console.find(MO.FDuiFocusConsole).leave(o);
   if(o._hint){
      MO.RWindow.setStatus();
   }
}

//==========================================================
// <T>创建一个控件容器。</T>
// <P>默认为DIV页面元素。</P>
//
// @method
// @param p:event:MO.SUiDispatchEvent 事件处理
//==========================================================
MO.FDuiControl_onBuildPanel = function FDuiControl_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.RBuilder.createDiv(p, o.styleName('Panel'));
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiControl_onBuild = function FDuiControl_onBuild(p){
   var o = this;
   // 建立控件容器
   o.onBuildPanel(p);
   // 设置可见性
   if(o._statusVisible != o._visible){
      o.setVisible(o._visible);
   }
   // 设置容器样式
   var hPanel = o._hPanel;
   MO.Window.Html.linkSet(hPanel, 'control', o);
   // 关联容器事件
   o.attachEvent('onEnter', hPanel);
   o.attachEvent('onLeave', hPanel);
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
// <T>控件模式变更处理。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
// @return EEventStatus 处理状态
//==========================================================
MO.FDuiControl_oeMode = function FDuiControl_oeMode(event){
   var o = this;
   o._modeCd = event.modeCd;
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiControl_construct = function FDuiControl_construct(){
   var o = this;
   o.__base.FDuiComponent.construct.call(o);
   o.__base.MDuiSize.construct.call(o);
   o.__base.MUiMargin.construct.call(o);
   o.__base.MUiPadding.construct.call(o);
   o.__base.MDuiStyle.construct.call(o);
}

//==========================================================
// <T>获得指定类型的父控件。</T>
//
// @method
// @param c:class:Class 类
// @return FDuiControl 父控件
//==========================================================
MO.FDuiControl_topControl = function FDuiControl_topControl(c){
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
         if(!MO.Class.isClass(r._parent, FDuiControl)){
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
MO.FDuiControl_panel = function FDuiControl_panel(p){
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
MO.FDuiControl_isVisible = function FDuiControl_isVisible(){
   return this._statusVisible;
}

//==========================================================
// <T>设置控件的隐藏和显示。</T>
//
// @method
// @param p:visible:Boolean 是否显示
//==========================================================
MO.FDuiControl_setVisible = function FDuiControl_setVisible(p){
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
MO.FDuiControl_show = function FDuiControl_show(){
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
MO.FDuiControl_hide = function FDuiControl_hide(){
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
MO.FDuiControl_isEnable = function FDuiControl_isEnable(){
   return this._statusEnable;
}

//==========================================================
// <T>设置控件的可操作和禁止。</T>
//
// @method
// @param p:enable:Boolean 是否可操作
//==========================================================
MO.FDuiControl_setEnable = function FDuiControl_setEnable(p){
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
MO.FDuiControl_enable = function FDuiControl_enable(){
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
MO.FDuiControl_disable = function FDuiControl_disable(){
   var o = this;
   if(o._statusEnable){
      o.setEnable(false);
   }
}

//==========================================================
// <T>设置填充空白。</T>
//
// @method
// @param left:Integer 左空白
// @param top:Integer 上空白
// @param right:Integer 右空白
// @param bottom:Integer 下空白
//==========================================================
MO.FDuiControl_setMargin = function FDuiControl_setMargin(left, top, right, bottom){
   var o = this;
   var padding = o._padding;
   var hPanel = o.panel(MO.EPanel.Container);
   // 获得样式
   var hStyle = null;
   if(hPanel && !hPanel.__fragment){
      hStyle = hPanel.style;
   }
   // 设置左空白
   if(left != null){
      padding.left = left;
      if(hStyle){
         hStyle.marginLeft = (left == 0) ? null : left + 'px';
      }
   }
   // 设置上空白
   if(top != null){
      padding.top = top;
      if(hStyle){
         hStyle.marginTop = (top == 0) ? null : top + 'px';
      }
   }
   // 设置右空白
   if(right != null){
      padding.right= right;
      if(hStyle){
         hStyle.marginRight = (right == 0) ? null : right + 'px';
      }
   }
   // 设置下空白
   if(bottom != null){
      padding.bottom = bottom;
      if(hStyle){
         hStyle.marginBottom = (bottom == 0) ? null : bottom + 'px';
      }
   }
}

//==========================================================
// <T>刷新填充空白。</T>
//
// @method
//==========================================================
MO.FDuiControl_refreshMargin = function FDuiControl_refreshMargin(){
   var o = this;
   var p = o._margin;
   o.setMargin(p.left, p.top, p.right, p.bottom);
}

//==========================================================
// <T>设置填充空白。</T>
//
// @method
// @param left:Integer 左空白
// @param top:Integer 上空白
// @param right:Integer 右空白
// @param bottom:Integer 下空白
//==========================================================
MO.FDuiControl_setPadding = function FDuiControl_setPadding(left, top, right, bottom){
   var o = this;
   var padding = o._padding;
   var hPanel = o.panel(MO.EPanel.Container);
   // 获得样式
   var hStyle = null;
   if(hPanel && !hPanel.__fragment){
      hStyle = hPanel.style;
   }
   // 设置左空白
   if(left != null){
      padding.left = left;
      if(hStyle){
         hStyle.paddingLeft = (left == 0) ? null : left + 'px';
      }
   }
   // 设置上空白
   if(top != null){
      padding.top = top;
      if(hStyle){
         hStyle.paddingTop = (top == 0) ? null : top + 'px';
      }
   }
   // 设置右空白
   if(right != null){
      padding.right= right;
      if(hStyle){
         hStyle.paddingRight = (right == 0) ? null : right + 'px';
      }
   }
   // 设置下空白
   if(bottom != null){
      padding.bottom = bottom;
      if(hStyle){
         hStyle.paddingBottom = (bottom == 0) ? null : bottom + 'px';
      }
   }
}

//==========================================================
// <T>刷新填充空白。</T>
//
// @method
//==========================================================
MO.FDuiControl_refreshPadding = function FDuiControl_refreshPadding(){
   var o = this;
   var p = o._padding;
   o.setPadding(p.left, p.top, p.right, p.bottom);
}

//==========================================================
// <T>将一个页面元素和已经注册过的事件相关联。</T>
// <P>如果指定了立即函数，则发生事件时，会立即执行立即函数。
//    该立即函数的this指针指向当前控件实例。</P>
// <P>如果存在注册过的队列函数，则发生事件时，该事件被排到队列中等待执行。
//    执行时该函数的this指针指向当前控件实例。</P>
//
// @method
// @param name:String 注册过的事件名称
// @param hTag:HtmlTag 页面元素
// @param method:Function 立即函数
// @param capture:Boolean 捕捉
// @return TEvent 关联的事件对象
//==========================================================
MO.FDuiControl_attachEvent = function FDuiControl_attachEvent(name, hTag, method, capture){
   return MO.Dui.Control.attachEvent(this, name, hTag, method, capture);
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
// @param control:FDuiControl 控件
// @param name:String 注册过的事件名称
// @param hTag:HtmlTag 页面元素
// @param method:Function 立即函数
// @param capture:Boolean 是否捕捉
// @return TEvent 关联的事件对象
//==========================================================
MO.FDuiControl_linkEvent = function FDuiControl_linkEvent(control, name, hTag, method, capture){
   return MO.Dui.Control.linkEvent(this, control, name, hTag, method, capture);
}

//==========================================================
// <T>调用控件的关联事件。</T>
//
// @method
// @param name:String 事件名称
// @param source:FDuiControl 事件源
// @param event:TEvent 事件对象
//==========================================================
MO.FDuiControl_callEvent = function FDuiControl_callEvent(name, source, event){
   var o = this;
   var es = o._events;
   if(es){
      var ec = es.get(name);
      if(ec){
         ec.invoke(source, source, event);
      }
   }
}

//==========================================================
// <T>判断是否已经构建。</T>
//
// @method
// @return Boolean 是否构建
//==========================================================
MO.FDuiControl_isBuild = function FDuiControl_isBuild(){
   return this._statusBuild;
}

//==========================================================
// <T>构建处理。</T>
// <P>只允许构建一次，不允许重复构建。</P>
//
// @method
// @param parent:Object 父对象
//==========================================================
MO.FDuiControl_build = function FDuiControl_build(parent){
   var o = this;
   // 检查状态
   if(o._statusBuild){
      throw new MO.TError(o, 'Current control is already builded.');
   }
   // 获得文档对象
   var hDocument = null;
   if(MO.Class.isClass(parent, MO.FDuiControl)){
      hDocument = parent._hPanel.ownerDocument;
   }else if(parent.createElement){
      hDocument = parent;
   }else if(parent.ownerDocument && parent.ownerDocument.createElement){
      hDocument = parent.ownerDocument;
   }else if(parent.hDocument){
      hDocument = parent.hDocument;
   }else{
      throw new MO.TError("Parent is invalid. (parent={1})", parent);
   }
   // 构建处理
   var event = new MO.SEvent(o);
   event.hDocument = hDocument;
   o.onBuild(event);
   event.dispose();
   // 设置状态
   o._statusBuild = true;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:html:HtmlTag 页面元素
//==========================================================
MO.FDuiControl_builded = function FDuiControl_builded(p){
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
MO.FDuiControl_refresh = function FDuiControl_refresh(){
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
MO.FDuiControl_setPanel = function FDuiControl_setPanel(h){
   var o = this;
   o._hParent = h;
   h.appendChild(o._hPanel);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiControl_dispose = function FDuiControl_dispose(){
   var o = this;
   // 释放属性
   o._disable = null;
   o._hint = null;
   // 释放属性
   o._styleContainer = null;
   // 释放属性
   o._statusVisible = null;
   o._statusEnable = null;
   o._statusBuild = null;
   // 释放属性
   o._hParent = null;
   o._hPanel = MO.Window.Html.free(o._hPanel);
   // 释放处理
   o.__base.MDuiStyle.dispose.call(o);
   o.__base.MUiPadding.dispose.call(o);
   o.__base.MUiMargin.dispose.call(o);
   o.__base.MDuiSize.dispose.call(o);
   o.__base.MUiControl.dispose.call(o);
   o.__base.FDuiComponent.dispose.call(o);
}
