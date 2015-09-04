//==========================================================
// <T>控件的管理类。</T>
//
// @reference
// @author maocy
// @version 150120
//==========================================================
MO.RDuiControl = function RDuiControl(){
   var o = this;
   //..........................................................
   // @property
   o.PREFIX    = 'FDui';


   //..........................................................
   // @attribute
   o.inMoving  = false;
   o.inSizing  = false;
   o.inDesign  = false;
   // @attribute 存放所有的控件
   o.instances = new MO.TObjects();
   o.events    = new MO.TMap();
   o.controls  = new MO.TMap();
   return o;
}

//==========================================================
// <T>创建一个实例。</T>
//
// @method
// @param p:name:String 名称
// @return FComponent 控件
//==========================================================
MO.RDuiControl.prototype.newInstance = function RDuiControl_newInstance(p){
   var o = this;
   var r = null;
   if(p){
      var n = null
      var tn = null;
      if(p.constructor == String){
         // 字符串
         if(!RString.startsWith(p, o.PREFIX)){
            n = o.PREFIX + p;
         }
      }else if(p.constructor == MO.TXmlNode){
         // 配置节点
         n = p.get('type');
         if(MO.Lang.String.isEmpty(n)){
            n = p.name();
            if(!MO.Lang.String.startsWith(n, o.PREFIX)){
               n = o.PREFIX + n;
            }
         }else{
            tn = n;
         }
      }else{
         throw new TError(o, 'Unknown parameter. (name={p})', p);
      }
      // 创建实例
      r = MO.Class.create(n);
      if(tn){
         r.__typed = true;
      }
   }
   if(r == null){
      throw new MO.TError(o, 'Create instance failure. (name={p})', p);
   }
   return r;
}

//==========================================================
// <T>连接一个页面事件。</T>
//
// @method
// @param control:FDuiControl 控件对象
// @param name:String 事件名称
// @param hTag:HtmlTag 页面元素
// @param method:Function 处理函数
// @param capture:Boolean 是否捕捉
//==========================================================
MO.RDuiControl.prototype.attachEvent = function RDuiControl_attachEvent(control, name, hTag, method, capture){
   var o = this;
   var event = null;
   var callback = control[name];
   if(!MO.Method.isEmpty(callback) || method){
      // 获得注册过的事件对象
      var clazz = MO.Class.find(control.constructor);
      var annotation = clazz.annotation(MO.EAnnotation.Event, name);
      var linker = annotation.linker();
      // 复制当前注册事件
      event = annotation.create();
      event.annotation = annotation;
      event.source = control;
      event.hSource = hTag;
      // 设置立即回调事件
      event.ohProcess = method;
      // 设置队列回调事件
      event.onProcess = callback;
      // 存储事件
      event.process = MO.Dui.Event.onProcess;
      MO.Dui.Event.find(hTag).push(linker, event);
      // 关联事件处理到HTML元素上
      MO.Window.Html.linkSet(hTag, '_plink', control);
      annotation.bind(hTag, capture);
   }
   return event;
}

//==========================================================
// <T>连接一个页面事件。</T>
//
// @method
// @param targetControl:FDuiControl 目标控件
// @param sourceControl:FDuiControl 来源控件
// @param name:String 事件名称发的
// @param hTag:HtmlTag 页面元素
// @param method:Function 处理函数
// @param capture:Boolean 是否捕捉
//==========================================================
MO.RDuiControl.prototype.linkEvent = function RDuiControl_linkEvent(targetControl, sourceControl, name, hTag, method, capture){
   var o = this;
   var event = null;
   var callback = targetControl[name];
   if(!MO.Method.isEmpty(callback) || method){
      // 获得注册过的事件对象
      var clazz = MO.Class.find(targetControl.constructor);
      var annotation = clazz.annotation(MO.EAnnotation.Event, name);
      var linker = annotation.linker();
      // 复制当前注册事件
      var event = new annotation.constructor();
      event.annotation = annotation;
      event.source = targetControl;
      event.sender = sourceControl;
      event.hSource = hTag;
      // 设置立即回调事件
      event.ohProcess = method;
      // 设置队列回调事件
      event.onProcess = callback;
      event.process = MO.Dui.Event.onProcess;
      // 存储事件
      MO.Dui.Event.find(hTag).push(linker, event);
      // 关联事件处理到HTML元素上
      MO.Window.Html.linkSet(hTag, '_plink', targetControl);
      annotation.bind(hTag, capture);
   }
   return event;
}

//===========================================================
// <T>根据配置信息创建当前组件，并递归创建所有子节点。</T>
//
// @method
// @param pc:parent:FComponent 父组件
// @param px:config:TXmlNode 配置节点
// @param pa:attributes:Object 参数集合
// @return FDuiControl 控件对象
//===========================================================
MO.RDuiControl.prototype.innerCreate = function RDuiControl_innerCreate(pc, px, pa){
   var o = this;
   // 检查参数
   if((pc == null) || (px == null)){
      return;
   }
   // 加载属性
   if(MO.Class.isClass(pc, MO.MProperty)){
      pc.propertyLoad(px)
   }
   // 构建子节点
   if(MO.Class.isClass(pc, MO.MUiContainer) && px.hasNode()){
      var ns = px.nodes();
      var nc = ns.count();
      for(var i = 0; i < nc; i++){
         var n = ns.get(i);
         var c = pc.createChild(n, pa);
         if(c){
            o.innerCreate(c, n, pa);
            pc.push(c);
         }
      }
   }
}

//===========================================================
// <T>通过配置节点来生成对应的控件。</T>
// <P>如果传入控件为空，则根据配置信息创建控件。</P>
// <P>控件构造顺序：
//   <OL>
//     <L title='CreateChild'>通过父实例创建实例。</L>
//     <L title='Construct'>实例的构造处理。</L>
//     <L title='PropertyLoad'>加载配置信息。</L>
//     <L title='Push'>放入父实例中。</L>
//   </OL>
// </P>
//
// @method
// @param pc:control:FDuiControl 控件对象
// @param px:config:TXmlNode 配置节点
// @param pa:attributes:Object 属性集合
// @return FDuiControl 控件对象
//===========================================================
MO.RDuiControl.prototype.create = function RDuiControl_create(pc, px, pa){
   var o = this;
   // 获得控件
   var c = null;
   if(pc){
      c = pc;
   }else{
      c = MO.RDuiControl.newInstance(px.name());
   }
   // 内部创建
   o.innerCreate(c, px, pa);
   //if(MO.Class.isClass(x, TNode)){
   //   if(x){
   //      // 节点对象(TNode)的处理
   //      if(x.name == 'CellEdit'){
   //         RDuiControl.newInstance(FCellEdit);
   //      }else{
   //          o = MO.Class.createByName('F' + x.name);
   //          this.innerCreate(o, x, m);
   //      }
   //      o._emode = m;
   //      this.instances.push(o);
   //   }
   //}else{
   //   // 类对象(Class)的处理
   //   o = MO.Class.create(x);
   //   o._emode = m;
   //}
   // 实例存在的处理
   //if(o){
   //   // 初始化
   //   if(x.name != 'CellEdit'){
   //      o.psInitialize();
   //      // 构建对象
   //      o.psBuild();
   //      // 设置父容器对象
   //      o.setPanel(hPanel);
   //   }
   //}
   return c;
}

//===========================================================
// <T>根据配置信息内部构件一个控件。</T>
//
// @method
// @param reference:FDuiControl 控件引用
// @param control:FDuiControl 控件对象
// @param xconfig:TXmlNode 配置节点
// @param attributes:Object 属性集合
// @param hTag:HtmlTag 页面元素
//===========================================================
MO.RDuiControl.prototype.innerbuild = function RDuiControl_innerbuild(reference, control, xconfig, attributes, hTag){
   var o = this;
   // 检查参数
   if((control == null) || (xconfig == null)){
      return;
   }
   // 加载属性集合
   if(MO.Class.isClass(control, MO.MProperty)){
      control.propertyLoad(xconfig);
   }
   var linker = xconfig.get('linker');
   if(linker && reference){
      reference[linker] = control;
   }
   // 构建处理
   if(MO.Class.isClass(control, MO.FDuiControl)){
      if(!control.isBuild()){
         control.build(hTag);
      }else{
         control.refresh();
      }
   }
   // 检查类型化
   if(control.__typed){
      reference = control;
   }
   // 建立子节点
   if(MO.Class.isClass(control, MO.MUiContainer) && xconfig.hasNode()){
      var xnodes = xconfig.nodes();
      var nodeCount = xnodes.count();
      for(var i = 0; i < nodeCount; i++){
         var xnode = xnodes.at(i);
         var child = control.createChild(xnode);
         if(!child){
            throw new MO.TError('Invalid create child.');
         }
         o.innerbuild(reference, child, xnode, attributes, hTag);
         control.push(child);
      }
   }
   // 构建完成处理
   if(MO.Class.isClass(control, MO.FDuiControl)){
      control.builded(hTag);
   }
}

//===========================================================
// <T>根据配置信息构件一个控件。</T>
// <P>控件构造顺序：
//   <OL>
//     <L title='CreateChild'>通过父实例创建实例。</L>
//     <L title='Construct'>实例的构造处理。</L>
//     <L title='PropertyLoad'>加载配置信息。</L>
//     <L title='Build'>构建页面处理。</L>
//     <L title='appendChild'>追加到父实例中。</L>
//     <L title='setPanel'>将当前控件放在地板上，成为可见控件</L>
//   </OL>
// </P>
//
// @method
// @param control:FDuiControl 控件对象
// @param xconfig:TXmlNode 配置节点
// @param attributes:Object 属性集合
// @param hPanel:HtmlTag 页面元素
//===========================================================
MO.RDuiControl.prototype.build = function RDuiControl_build(control, xconfig, attributes, hPanel){
   var o = this;
   // 创建控件对象
   if(!control){
      control = MO.Dui.Control.newInstance(xconfig);
   }
   // 内部构造
   o.innerbuild(control, control, xconfig, attributes, hPanel);
   return control;
}

//===========================================================
// <T>设置页面元素滚动样式。</T>
//
// @method
// @param hTag:HtmlTag 页面元素
// @param scrollCd:EUiScroll 滚动枚举
//===========================================================
MO.RDuiControl.prototype.setStyleScroll = function RDuiControl_setStyleScroll(hTag, scrollCd){
   var hStyle = hTag.style;
   switch(scrollCd){
      case MO.EUiScroll.None:
         hStyle.overflowX = '';
         hStyle.overflowY = '';
         break;
      case MO.EUiScroll.Horizontal:
         hStyle.overflowX = 'scroll';
         break;
      case MO.EUiScroll.HorizontalAuto:
         hStyle.overflowX = 'auto';
         break;
      case MO.EUiScroll.Vertical:
         hStyle.overflowY = 'scroll';
         break;
      case MO.EUiScroll.VerticalAuto:
         hStyle.overflowY = 'auto';
         break;
      case MO.EUiScroll.Both:
         hStyle.overflow = 'scroll';
         break;
      case MO.EUiScroll.BothAuto:
         hStyle.overflow = 'auto';
         break;
      default:
         throw new MO.TError(o, 'Unknown scroll type. (scroll_cd={1})', scrollCd);
   }
}









// ------------------------------------------------------------
MO.RDuiControl.prototype.find = function RDuiControl_find(c){
   var o = this;
   var r = null;
   if(c){
      if(c.constructor == Function){
         c = RMethod.name(c);
      }else if(c.constructor != String){
         RMsg.fatal(o, null, 'Param invlid (class={0})', c);
      }
      var cs = o.controls;
      var r = cs.get(c);
      if(!r){
         r = new TControl(c);
         cs.set(c, r);
      }
   }
   return r;
}

//===========================================================
// 通过加载XML TNode节点来生成对应的控件
//
// @method
// @param config:config:TNode  从页面中的XML解析而成的TNode类型的节点
// @param hPanel:hPanel:HTML   生成控件后要放置的位置
// @return Object 控件对象
//===========================================================
MO.RDuiControl.prototype.fromNode = function RDuiControl_fromNode(x, h){
   if(x){
      return this.create(x, h);
   }
}

//===========================================================
// <T>从页面中加载XML生成对象。</T>
//
// @method
// @param xml:xml:XML  从页面中的XML
// @param hPanel:hPanel:HTML   生成控件后要放置的位置
// @return Object 控件对象
//===========================================================
MO.RDuiControl.prototype.fromXml = function RDuiControl_fromXml(xml, hPanel, mode){
   var c = null;
   var x = RXml.makeNode(xml);
   if(x){
      c = this.create(x, hPanel, mode);
   }
   return c;
}

//===========================================================
// <T>获得控件的配置节点。</T>
//
// @method
// @return TNode 配置节点
//===========================================================
MO.RDuiControl.prototype.toNode = function RDuiControl_toNode(){
}

//===========================================================
// <T>获得控件的配置字符串。</T>
//
// @method
// @return String 配置字符串
//===========================================================
MO.RDuiControl.prototype.toXml = function RDuiControl_toXml(){
}

//===========================================================
// 表格列表类，
//
// @refencene
// @author maochunyang
// @version 1.0.1
//===========================================================
MO.RDuiControl.prototype.store = function RDuiControl_store(o, type){
   var x = new TNode();
   x.name = MO.Class.name(o).substr(1);
   if(MO.Class.isClass(o, FContainer)){
      o.storeConfig(x);
   }else{
      o.saveConfig(x);
   }
   return x;
}

//===========================================================
// 表格列表类，
//
// @refencene
// @author maochunyang
// @version 1.0.1
//===========================================================
// element, class
MO.RDuiControl.prototype.htmlControl = function RDuiControl_htmlControl(e, c){
   if(c){
      while(e){
         var o = RHtml.linkGet(e, 'control');
         if(o && MO.Class.isClass(o, c)){
            return o;
         }
         e = e.parentElement;
      }
   }else{
      while(e){
         var o = RHtml.linkGet(e, 'control');
         if(o){
            return o;
         }
         e = e.parentElement;
      }
   }
   return null;
}

//===========================================================
// 表格列表类，
//
// @refencene
// @author maochunyang
// @version 1.0.1
//===========================================================
// action
MO.RDuiControl.prototype.psDesign = function RDuiControl_psDesign(action, mode, flag, params){
   var cs = this.instances;
   if(cs && cs.count){
      var l = cs.count;
      for(var n=0; n<l; n++){
         cs.get(n).psDesign(action, mode, flag, params);
      }
   }
}
// ------------------------------------------------------------
MO.RDuiControl.prototype.psMode = function RDuiControl_psMode(action, mode, flag, params){
   var cs = this.instances;
   if(cs && cs.count){
      var l = cs.count;
      for(var n=0; n<l; n++){
         cs.get(n).psMode(action, mode, flag, params);
      }
   }
}

// ------------------------------------------------------------
MO.RDuiControl.prototype.isInfo = function RDuiControl_isInfo(v){
   return v ? (0 == v.indexOf('C#')) : false;
}

//------------------------------------------------------------
MO.RDuiControl.prototype.isGroup = function RDuiControl_isGroup(v){
   return v ? (0 == v.indexOf('G#')) : false;
}
//..........................................................
// 实例化内容
//MO.RDuiControl = new MO.RDuiControl();
MO.Dui.Control = new MO.RDuiControl();
