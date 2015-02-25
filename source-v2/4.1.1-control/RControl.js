//==========================================================
// <T>控件的管理类。</T>
//
// @reference
// @author maocy
// @version 150120
//==========================================================
var RControl = new function RControl(){
   var o = this;
   //..........................................................
   // @property
   o.PREFIX             = 'FUi';
   //..........................................................
   // @attribute
   //..........................................................
   // @method
   o.newInstance        = RControl_newInstance;
   o.attachEvent        = RControl_attachEvent;
   // @method
   o.innerCreate        = RControl_innerCreate;
   o.create             = RControl_create;
   o.innerbuild         = RControl_innerbuild;
   o.build              = RControl_build;


   //..........................................................
   // @attribute
   o.inMoving           = false;
   o.inSizing           = false;
   o.inDesign           = false;
   // @attribute TList 存放所有的控件
   o.instances          = new TList();
   o.events             = new TMap();
   o.controls           = new TMap();
   //..........................................................
   // @member
   o.linkEvent          = RControl_linkEvent;
   o.find               = RControl_find;
   o.fromNode           = RControl_fromNode;
   o.fromXml            = RControl_fromXml;
   o.toNode             = RControl_toNode;
   o.toXml              = RControl_toXml;
   o.store              = RControl_store;
   o.htmlControl        = RControl_htmlControl;
   o.psDesign           = RControl_psDesign;
   o.psMode             = RControl_psMode;
   o.isInfo             = RControl_isInfo;
   o.isGroup            = RControl_isGroup;
   return o;
}

//==========================================================
// <T>创建一个实例。</T>
//
// @method
// @param p:name:String 名称
// @return FComponent 控件
//==========================================================
function RControl_newInstance(p){
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
      }else if(p.constructor == TXmlNode){
         // 配置节点
         n = p.get('type');
         if(RString.isEmpty(n)){
            n = p.name();
            if(!RString.startsWith(n, o.PREFIX)){
               n = o.PREFIX + n;
            }
         }else{
            tn = n;
         }
      }else{
         throw new TError(o, 'Unknown parameter. (name={p})', p);
      }
      // 创建实例
      r = RClass.create(n);
      if(tn){
         r.__typed = true;
      }
   }
   if(r == null){
      throw new TError(o, 'Create instance failure. (name={p})', p);
   }
   return r;
}

//==========================================================
// <T>连接一个页面事件。</T>
//
// @method
// @param c:control:FUiControl 控件对象
// @param n:name:String 事件名称
// @param h:html:HtmlTag 页面元素
// @param m:method:Function 处理函数
// @param u:capture:Boolean 是否捕捉
//==========================================================
function RControl_attachEvent(c, n, h, m, u){
   var o = this;
   var e = null;
   var p = c[n];
   if(!RMethod.isEmpty(p) || m){
      // 获得注册过的事件对象
      var cz = RClass.find(c.constructor);
      var a = cz.annotation(EAnnotation.Event, n);
      // 复制当前注册事件
      e = a.create();
      e.annotation = a;
      e.source = c;
      e.hSource = h;
      // 设置立即回调事件
      e.ohProcess = m;
      // 设置队列回调事件
      e.onProcess = p;
      // 存储事件
      e.process = REvent.onProcess;
      REvent.find(h).push(a.linker(), e);
      // 关联事件处理到HTML元素上
      RHtml.linkSet(h, '_plink', c);
      a.bind(h, u);
   }
   return e;
}

//===========================================================
// <T>根据配置信息创建当前组件，并递归创建所有子节点。</T>
//
// @method
// @param pc:parent:FComponent 父组件
// @param px:config:TXmlNode 配置节点
// @param pa:attributes:Object 参数集合
// @return FUiControl 控件对象
//===========================================================
function RControl_innerCreate(pc, px, pa){
   var o = this;
   // 检查参数
   if((pc == null) || (px == null)){
      return;
   }
   // 加载属性
   if(RClass.isClass(pc, MProperty)){
      pc.propertyLoad(px)
   }
   // 构建子节点
   if(RClass.isClass(pc, MContainer) && px.hasNode()){
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
// @param pc:control:FUiControl 控件对象
// @param px:config:TXmlNode 配置节点
// @param pa:attributes:Object 属性集合
// @return FUiControl 控件对象
//===========================================================
function RControl_create(pc, px, pa){
   var o = this;
   // 获得控件
   var c = null;
   if(pc){
      c = pc;
   }else{
      c = RControl.newInstance(px.name());
   }
   // 内部创建
   o.innerCreate(c, px, pa);
   //if(RClass.isClass(x, TNode)){
   //   if(x){
   //      // 节点对象(TNode)的处理
   //      if(x.name == 'CellEdit'){
   //         RControl.newInstance(FCellEdit);
   //      }else{
   //          o = RClass.createByName('F' + x.name);
   //          this.innerCreate(o, x, m);
   //      }
   //      o._emode = m;
   //      this.instances.push(o);
   //   }
   //}else{
   //   // 类对象(Class)的处理
   //   o = RClass.create(x);
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
// @param pc:control:FUiControl 控件对象
// @param px:config:TXmlNode 配置节点
// @param pa:attribute:Object 属性集合
//===========================================================
function RControl_innerbuild(pr, pc, px, pa, ph){
   var o = this;
   // 检查参数
   if((pc == null) || (px == null)){
      return;
   }
   // 加载属性集合
   if(RClass.isClass(pc, MProperty)){
      pc.propertyLoad(px);
   }
   var l = px.get('linker');
   if(l && pr){
      pr[l] = pc;
   }
   // 构建处理
   if(RClass.isClass(pc, FUiControl)){
      if(!pc.isBuild()){
         pc.build(ph);
      }else{
         pc.refresh();
      }
   }
   // 检查类型化
   if(pc.__typed){
      pr = pc;
   }
   // 建立子节点
   if(RClass.isClass(pc, MContainer) && px.hasNode()){
      var ns = px.nodes();
      var nc = ns.count();
      for(var i = 0; i < nc; i++){
         var n = ns.get(i);
         var c = pc.createChild(n);
         if(!c){
            throw new TError('Invalid create child.');
         }
         o.innerbuild(pr, c, n, pa, ph);
         pc.push(c);
      }
   }
   // 构建完成处理
   if(RClass.isClass(pc, FUiControl)){
      pc.builded(ph);
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
// @param c:control:FUiControl 控件对象
// @param x:config:TXmlNode 配置节点
// @param a:attribute:Object 属性集合
// @param h:panel:HtmlTag 页面元素
//===========================================================
function RControl_build(c, x, a, h){
   var o = this;
   // 创建控件对象
   if(!c){
      c = RControl.newInstance(x);
   }
   // 内部构造
   o.innerbuild(c, c, x, a, h);
   return c;
}












// ------------------------------------------------------------
// tc:targetControl:FUiControl
// sc:senderControl:FUiControl
// n:name:String 注册过的事件名称
// h:html:HTML 注册过的事件名称
// m:method:Function 即时处理函数
function RControl_linkEvent(tc, sc, n, h, m){
   var o = this;
   var p = tc[n];
   if(!RMethod.isEmpty(p) || m){
      // 获得注册过的事件对象
      var cz = RClass.find(c.constructor);
      var a = cz.annotation(EAnnotation.Event, n);
      // 复制当前注册事件
      var e = new a.constructor();
      e.name = a.name;
      e.source = tc;
      e.sender = sc;
      e.hSource = h;
      // 设置立即回调事件
      e.ohProcess = m;
      // 设置队列回调事件
      e.onProcess = p;
      e.process = REvent.onProcess;
      // 存储事件
      REvent.find(h).push(e.type, e);
      // 关联事件处理到HTML元素上
      h[e.handle] = REvent.ohEvent;
      RHtml.linkSet(h, '_plink', tc);
      return e;
   }
}
// ------------------------------------------------------------
function RControl_find(c){
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
function RControl_fromNode(x, h){
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
function RControl_fromXml(xml, hPanel, mode){
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
function RControl_toNode(){
}

//===========================================================
// <T>获得控件的配置字符串。</T>
//
// @method
// @return String 配置字符串
//===========================================================
function RControl_toXml(){
}

//===========================================================
// 表格列表类，
//
// @refencene
// @author maochunyang
// @version 1.0.1
//===========================================================
function RControl_store(o, type){
   var x = new TNode();
   x.name = RClass.name(o).substr(1);
   if(RClass.isClass(o, FContainer)){
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
function RControl_htmlControl(e, c){
   if(c){
      while(e){
         var o = RHtml.linkGet(e, 'control');
         if(o && RClass.isClass(o, c)){
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
function RControl_psDesign(action, mode, flag, params){
   var cs = this.instances;
   if(cs && cs.count){
      var l = cs.count;
      for(var n=0; n<l; n++){
         cs.get(n).psDesign(action, mode, flag, params);
      }
   }
}
// ------------------------------------------------------------
function RControl_psMode(action, mode, flag, params){
   var cs = this.instances;
   if(cs && cs.count){
      var l = cs.count;
      for(var n=0; n<l; n++){
         cs.get(n).psMode(action, mode, flag, params);
      }
   }
}

// ------------------------------------------------------------
function RControl_isInfo(v){
   return v ? (0 == v.indexOf('C#')) : false;
}

//------------------------------------------------------------
function RControl_isGroup(v){
   return v ? (0 == v.indexOf('G#')) : false;
}
