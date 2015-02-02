//==========================================================
// <T>树目录节点组件。</T>
// 模板:
//  hPanel<TR>
// ┌---------------------------------------------┬-------------┐
// │ hNodePanel<TD>                              │             │
// │┌-----------┐┌----------┐┌------------┐│             │
// ││hImage<IMG>││hIcon<IMG>││hLabel<SPAN>││(Other cells)│
// │└-----------┘└----------┘└------------┘│             │
// └---------------------------------------------┴-------------┘
// Label = label (tag) [ note ]
//
// @component
// @author maocy
// @version 150119
//==========================================================
function FUiTreeNode(o){
   o = RClass.inherits(this, o, FUiContainer, MDataProperties);
   //..........................................................
   // @property
   o._valid            = RClass.register(o, new APtyBoolean('_isValid'), true);
   o._typeName         = RClass.register(o, new APtyString('_typeName', 'type'));
   o._uuid             = RClass.register(o, new APtyString('_uuid'));
   o._icon             = RClass.register(o, new APtyString('_icon'));
   o._checked          = RClass.register(o, new APtyBoolean('_checked'), false);
   o._extended         = RClass.register(o, new APtyBoolean('_extended'), false);
   o._child            = RClass.register(o, new APtyBoolean('_child'), false);
   o._note             = RClass.register(o, new APtyString('_note'));
   o._tag              = RClass.register(o, new APtyString('_tag'));
   //..........................................................
   // @style
   o._styleNormal      = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
   o._styleHover       = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._styleSelect      = RClass.register(o, new AStyle('_styleSelect', 'Select'));
   o._styleImage       = RClass.register(o, new AStyle('_styleImage', 'Image'));
   o._styleIcon        = RClass.register(o, new AStyle('_styleIcon', 'Icon'));
   o._styleIconDisable = RClass.register(o, new AStyle('_styleIconDisable', 'IconDisable'));
   o._styleLabel       = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   o._styleCell        = RClass.register(o, new AStyle('_styleCell', 'Cell'));
   //..........................................................
   // @attribute
   o._tree             = null;
   o._level            = 0;
   o._attributes       = null;
   o._nodes            = null;
   // @attribute
   o._statusLinked     = false;
   o._statusDisplay    = true;
   o._statusSelected   = false;
   o._statusLoaded     = false;
   o._statusHover      = false;
   //..........................................................
   // @html
   o._hNodePanel       = null;
   o._hCheck           = null;
   o._hImage           = null;
   o._hIcon            = null;
   o._hLabel           = null;
   //..........................................................
   // @event
   o.onBuildPanel      = FUiTreeNode_onBuildPanel;
   o.onBuild           = FUiTreeNode_onBuild;
   // @event
   o.onNodeEnter       = RClass.register(o, new AEventMouseEnter('onNodeEnter'), FUiTreeNode_onNodeEnter);
   o.onNodeLeave       = RClass.register(o, new AEventMouseLeave('onNodeLeave'), FUiTreeNode_onNodeLeave);
   o.onNodeClick       = RClass.register(o, new AEventClick('onNodeClick'), FUiTreeNode_onNodeClick);
   //..........................................................
   // @method
   o.construct         = FUiTreeNode_construct;
   // @method
   o.type              = FUiTreeNode_type;
   o.typeName          = FUiTreeNode_typeName;
   o.setTypeName       = FUiTreeNode_setTypeName;
   o.setLabel          = FUiTreeNode_setLabel;
   o.level             = FUiTreeNode_level;
   o.setLevel          = FUiTreeNode_setLevel;
   o.check             = FUiTreeNode_check;
   o.setCheck          = FUiTreeNode_setCheck;
   o.setImage          = FUiTreeNode_setImage;
   o.setIcon           = FUiTreeNode_setIcon;
   o.get               = FUiTreeNode_get;
   o.set               = FUiTreeNode_set;
   // @method
   o.hasChild          = FUiTreeNode_hasChild;
   o.topNode           = FUiTreeNode_topNode;
   o.topNodeByType     = FUiTreeNode_topNodeByType;
   o.show              = FUiTreeNode_show;
   o.hide              = FUiTreeNode_hide;
   o.select            = FUiTreeNode_select;
   o.extend            = FUiTreeNode_extend;
   o.extendAll         = FUiTreeNode_extendAll;
   o.searchLast        = FUiTreeNode_searchLast;
   o.createChild       = FUiTreeNode_createChild;
   o.appendNode        = FUiTreeNode_appendNode;
   o.push              = FUiTreeNode_push;
   o.remove            = FUiTreeNode_remove;
   o.removeChildren    = FUiTreeNode_removeChildren;
   o.reset             = FUiTreeNode_reset;
   // @method
   o.click             = FUiTreeNode_click;
   // @method
   o.refreshStyle      = FUiTreeNode_refreshStyle;
   // @method
   o.propertyLoad      = FUiTreeNode_propertyLoad;
   o.propertySave      = FUiTreeNode_propertySave;
   o.loadConfig        = FUiTreeNode_loadConfig;




   //..........................................................
   // @method
   o.reload           = FUiTreeNode_reload;
   o.reloadParent     = FUiTreeNode_reloadParent;
   o.loadQuery        = FUiTreeNode_loadQuery;
   o.isFolder         = FUiTreeNode_isFolder;
   o.dispose          = FUiTreeNode_dispose;
   o.innerDump        = FUiTreeNode_innerDump;
   //..........................................................
   // @method
   o.findByName       = FUiTreeNode_findByName;
   o.findByUuid       = FUiTreeNode_findByUuid;
   o.checkChanged     = FUiTreeNode_checkChanged;
   o.pushChanged      = FUiTreeNode_pushChanged;
   o.getFullPath      = FUiTreeNode_getFullPath;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FUiTreeNode_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
}

//==========================================================
// <T>构建页面处理。</T>
//
// @method
// @param p:event:TEventProcess 事件
//==========================================================
function FUiTreeNode_onBuild(p){
   var o = this;
   var t = o._tree;
   var r = o.__base.FUiContainer.onBuild.call(o, p);
   // 建立底板
   var hp = o._hPanel;
   hp.style.border = '1 solid red';
   o.attachEvent('onNodeEnter', hp, o.onNodeEnter);
   o.attachEvent('onNodeLeave', hp, o.onNodeLeave);
   o.attachEvent('onNodeClick', hp);
   // 建立节点底版
   var hnp = o._hNodePanel = RBuilder.appendTableCell(hp, o.styleName('Normal'));
   hnp.noWrap = true;
   // 建立图片
   var hi = o._hImage = RBuilder.appendIcon(hnp, o.styleName('Image'), null, 16, 16);
   hi._linkType = 'image';
   o.setImage();
   // 建立图标
   var hi = o._hIcon = RBuilder.appendIcon(hnp, null, null, 16, 16)
   hi._linkType = 'icon';
   o.setIcon(o._icon);
   // 建立复选框
   if(t.dispChecked){
      var hc = o._hCheck = RBuilder.appendCheck(hnp);
      hc.width = 13;
      hc.height = 13;
      hc.style.borderWidth = 0;
      o.setCheck(o._checked);
      t.linkEvent(o, 'onNodeCheckClick', hc);
   }
   // 建立显示文本
   o._hLabel = RBuilder.appendText(hnp, o.styleName('Label'));
   o.setLabel(o._label);
   // 建立关联列
   var cs = t.columns;
   if(cs){
      var cc = cs.count();
      for(var n = 1; n < cc; n++){
         var c = cs.value(n);
         var hc = RBuilder.appendTableCell(hp, o.styleName('Cell'));
         hc.align='center';
         hc.noWrap = true;
         hc.innerText = RString.nvl(o.get(c.dataName));
         RHtml.visibleSet(hc, c.display);
      }
   }
}

//==========================================================
// <T>鼠标移进节点的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiTreeNode_onNodeEnter(e){
   var o = this;
   var t = o._tree;
   if(!t._focusNode || (t._focusNode && (t._focusNode != o))){
      o._statusHover = true;
      o.refreshStyle();
      t.lsnsEnter.process(t, o);
   }
}

//==========================================================
// <T>鼠标移出节点的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiTreeNode_onNodeLeave(e){
   var o = this;
   var t = o._tree;
   if(!t._focusNode || (t._focusNode && (t._focusNode != o))){
      o._statusHover = false;
      o.refreshStyle();
      t.lsnsLeave.process(t, o);
   }
}

//==========================================================
// <T>鼠标点击节点的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiTreeNode_onNodeClick(e){
   var o = this;
   var t = o._tree;
   var esn = e.hSender.tagName;
   // 处理复选框的情况
   if('INPUT' == esn){
      return;
   }
   // 检查点击的是展开图标还是节点图标
   var isImg = false;
   if('IMG' == esn){
      isImg = ('image' == e.hSender._linkType);
   }
   // 查询点击节点是否已获焦点对象的父节点
   var isParent = false;
   var find = t._focusNode;
   while(find){
      if(find == o){
         isParent = true;
         break;
      }
      find = find.parent;
   }
   // 设置焦点节点
   if(!isImg || (isImg && (isParent || !o._child))){
      t.selectNode(o, true);
   }
   // 判断是否需要加载节点
   if(!o._statusLoaded && o._child){
      o.extend(true);
      if(!isImg){
         t.lsnsClick.process(t, o);
      }
   }else{
      // 已经是加载过的节点
      if(o._child){
        if(o.isFolder()){
           o.extend(!o._extended);
        }else{
            if(isImg){
               o.extend(!o._extended);
            }else{
               o.extend(true);
            }
        }
      }
      if((isImg && isParent) || (isImg && !o._child) || !isImg){
         t.lsnsClick.process(t, o);
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FUiTreeNode_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   // 初始化变量
   o._attributes = new TAttributes();
}

//==========================================================
// <T>查找类型。</T>
//
// @method
// @return String 类型
//==========================================================
function FUiTreeNode_type(){
   var o = this;
   var t = o._tree;
   if(RString.isEmpty(o._typeName)){
      return null;
   }
   return t.findType(o._typeName);
}

//==========================================================
// <T>获取类型名称。</T>
//
// @method
// @return String 类型名称
//==========================================================
function FUiTreeNode_typeName(){
   return this._typeName;
}

//==========================================================
// <T>设置类型名称。</T>
//
// @method
// @param String 类型名称
//==========================================================
function FUiTreeNode_setTypeName(p){
   var o = this;
   o._typeName = p;
   o.setIcon();
}

//==========================================================
// <T>设置标签。</T>
//
// @method
// @param p:label:String 标签
//==========================================================
function FUiTreeNode_setLabel(p){
   var o = this;
   o.__base.FUiContainer.setLabel.call(o, p)
   // 设置显示内容
   var h = o._hLabel;
   if(h){
      var s = '';
      if(!RString.isEmpty(o._label)){
         s = '&nbsp;' + o._label;
         if(o._tag){
            s += '&nbsp;<FONT color=blue>(' + o._tag + ')</FONT>';
         }
         if(o._note){
            s += '&nbsp;<FONT color=green>[ ' + o._note + ' ]</FONT>';
         }
      }
      h.innerHTML = s;
   }
}

//==========================================================
// <T>获取层次。</T>
//
// @method
// @return Integer 层次
//==========================================================
function FUiTreeNode_level(){
   return this._level;
}

//==========================================================
// <T>设置层次。</T>
//
// @method
// @param p:level:Integer 层次
//==========================================================
function FUiTreeNode_setLevel(p){
   var o = this;
   // 设置属性
   o._level = p;
   // 设置页面
   var h = o._hNodePanel;
   if(h){
      h.style.paddingLeft = (o._tree._indent * p) + 'px';
   }
}

//==========================================================
// <T>获取节点选取。</T>
//
// @method
// @return Boolean 是否选取
//==========================================================
function FUiTreeNode_check(){
   return this._checked;
}

//==========================================================
// <T>设置选中。</T>
//
// @method
// @param p:check:Boolean 选中
//==========================================================
function FUiTreeNode_setCheck(p){
   var o = this;
   o._checked = p;
   if(!RString.isEmpty(o._attributes.get('checked'))){
     o._checked = RBoolean.isTrue(o._attributes.get('checked'));
     if(o._hCheck){
         o._hCheck._checked = o._checked;
     }
   }
}

//==========================================================
// <T>设置位图。</T>
//
// @method
//==========================================================
function FUiTreeNode_setImage(){
   var o = this;
   var t = o._tree;
   var h = o._hImage;
   if(h){
      var ni = o._child ? t._iconPlus : t._iconNode;
      h.src = RResource.iconPath(ni);
   }
}

//==========================================================
// <T>设置图标。</T>
//
// @method
// @param p:icon:String 图标
//==========================================================
function FUiTreeNode_setIcon(p){
   var o = this;
   // 设置属性
   o._icon = p;
   // 设置图标
   var h = o._hIcon;
   if(h){
      var ni = null;
      if(o._icon){
         ni = p;
      }else{
         var t = o.type();
         if(t){
            ni = t.icon();
         }
      }
      if(ni){
         RHtml.displaySet(h, true);
         h.style.width = 16;
         h.style.height = 16;
         h.className = o._valid ? o.styleName('Icon') : o.styleName('IconDisable');
         h.src = RResource.iconPath(ni);
      }else{
         RHtml.displaySet(h, false);
      }
   }
}

//==========================================================
// <T>获取节点属性。</T>
//
// @method
// @param n:name:String 属性名称
// @return String 属性内容
//==========================================================
function FUiTreeNode_get(n){
   return this._attributes.get(n);
}

//==========================================================
// <T>设置节点属性。</T>
//
// @method
// @param n:name:String 属性名称
// @param v:value:String 属性内容
//==========================================================
function FUiTreeNode_set(n, v){
   this._attributes.set(n, v);
}

//==========================================================
// <T>是否有子节点。</T>
// 
//
// @method
// @return Boolean 是否有子节点
//==========================================================
function FUiTreeNode_hasChild(){
   var o = this;
   if(o._child){
      var ns = o._nodes;
      if(ns){
         return !ns.isEmpty();
      }
   }
   return false;
}

//==========================================================
// <T>查询顶层节点。</T>
//
// @method
// @param x:config:TNode 数据节点
//==========================================================
function FUiTreeNode_topNode(){
   var r = this;
   while(r._parent){
      r = r._parent;
   }
   return r;
}

//==========================================================
// <T>查询指定类型的顶层节点。</T>
//
// @method
// @param t:type:String 类型名称
//==========================================================
function FUiTreeNode_topNodeByType(t){
   var r = this;
   while(r){
      if(r._typeName == t){
         return r;
      }
      r = r._parent;
   }
   return null;
}

//==========================================================
// <T>显示这个节点和他的子节点。</T>
//
// @method
//==========================================================
function FUiTreeNode_show(){
   var o = this;
   var t = o._tree;
   // 显示自己
   RHtml.visibleSet(o._hPanel, true);
   // 显示所有子节点
   var ns = o._nodes;
   if(ns){
      var c = ns.count();
      for(var i = 0; i < c; i++){
         var n = ns.get(i);
         // 判断是否要加到树目录
         if(!n._statusLinked){
            t.appendNode(n, o);
         }
         // 判断是否要显示
         if(n._statusDisplay){
            RHtml.visibleSet(n._hPanel, true);
            if(n._extended){
               n.show();
            }
         }
      }
   }
}

//==========================================================
// <T>隐藏这个节点和他所有子节点。</T>
//
// @method
//==========================================================
function FUiTreeNode_hide(){
   var o = this;
   var t = o._tree;
   if(o._hPanel){
      RHtml.visibleSet(o._hPanel, false);
   }
   var cs = o._components;
   if(cs){
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var cv = cs.value(i);
         if(cv){
            cv.hide();
         }
      }
   }
}

//==========================================================
// <T>选中当前节点。</T>
//
// @method
// @param v:value:Boolean 是否选中
//==========================================================
function FUiTreeNode_select(v){
   var o = this;
   o._statusSelected = v;
   if(v){
      o._statusHover = false;
   }
   o.refreshStyle();
}

//==========================================================
// <T>展开或隐藏子节点。</T>
//
// @method
// @param p:flag:Boolean 标志
//==========================================================
function FUiTreeNode_extend(p){
   var o = this;
   var t = o._tree;
   if(!o._statusLoaded && o._child){
      // 从服务器加载当前节点
      if(t.__loading){
         //return alert(RContext.get('FTreeView:waiting'));
         return;
      }
      // 加载节点
      t.loadNode(o);
   }else{
      // 设置图片
      if(o._hImage && !o.hasChild()){
         o._hImage.src = RResource.iconPath(t._iconNode);
         return false;
      }
      o._extended = p;
      if(o._child && o._hImage){
         o._hImage.src = RResource.iconPath(p ? t._iconMinus : t._iconPlus);
      }
      // 展开和隐藏节点
      var ns = o._nodes;
      if(p){
         o.show();
      }else if(ns){
         var nc = ns.count();
         for(var i = nc - 1; i >= 0; i--){
            ns.get(i).hide();
         }
      }
   }
   // 刷新处理
   t.refresh();
}

//==========================================================
// <T>展开或隐藏所有子节点。</T>
//
// @method
// @param p:flag:Boolean 标志
//==========================================================
function FUiTreeNode_extendAll(p){
   var o = this;
   // 当前节点
   o.extend(p);
   // 子节点
   var cs = o._components;
   if(cs){
      var cc = cs.count();
      for(var i = 0; i < cc; i++){
         var c = cs.value(i);
         c.extendAll(p);
      }
   }
}

//==========================================================
// <T>搜索当前节点下最后一个子节点。</T>
//
// @method
// @return FUiTreeNode 子节点
//==========================================================
function FUiTreeNode_searchLast(){
   var o = this;
   var s = o._nodes;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         var n = s.get(i)
         if(n._statusLinked){
            return n.searchLast();
         }
      }
   }
   return o;
}

//==========================================================
// <T>创建子节点。</T>
//
// @method
// @param x:config:TNode 配置节点
//==========================================================
function FUiTreeNode_createChild(x){
   var r = null;
   if(x.isName('Node') || x.isName('TreeNode')){
      r = RClass.create(FUiTreeNode);
      r._tree = this._tree;
   }
   return r;
}

//==========================================================
// <T>追加一个子目录节点。</T>
//
// @method
// @param p:ndoe:TTreeNode 目录节点
//==========================================================
function FUiTreeNode_appendNode(p){
   var o = this;
   var t = o._tree;
   o.push(p);
   t.appendNode(p, o);
   o.extend(true);
}

//==========================================================
// <T>把一个树节点追加到当前节点内。</T>
//
// @method
// @param c:component:FComponent 组件对象
//==========================================================
function FUiTreeNode_push(c){
   var o = this;
   var t = o._tree;
   o.__base.FUiContainer.push.call(o, c);
   // 增加一个树节点
   if(RClass.isClass(c, FUiTreeNode)){
      o._child = true;
      o._statusLoaded = true;
      // 增加子节点
      var ns = o._nodes;
      if(!ns){
         ns = o._nodes = new TObjects();
      }
      c._tree = t;
      c._parent = o;
      ns.push(c);
      t._allNodes.pushUnique(c);
   }
}

//==========================================================
// <T>删除当前节点。</T>
//
// @method
//==========================================================
function FUiTreeNode_remove(){
   var o = this;
   var t = o._tree;
   if(o._statusLinked){
      // 删除所有子节点
      o.removeChildren();
      // 删除自己
      t.freeNode(o);
   }
}

//==========================================================
// <T>删除当前节点和所有子节点。</T>
//
// @method
//==========================================================
function FUiTreeNode_removeChildren(){
   var ns = this._nodes;
   if(ns){
      var c = ns.count();
      for(var i = c - 1; i >= 0; i--){
         var n = ns.get(i);
         if(n){
            n.remove();
         }
      }
      ns.clear();
   }
}

//==========================================================
// <T>重置数据。</T>
//
// @method
//==========================================================
function FUiTreeNode_reset(){
   var o = this;
   // 获取属性
   o._typeName = null;
   o._uuid = null;
   o._valid = true;
   o._icon = null;
   o._tag = null;
   o._note = null;
   o._child = false;
   o._checked = false;
   o._extended = true;
   // 还原状态
   o._statusLinked = false;
   o._statusDisplay = true;
   o._statusHover = false;
   o._extended = false;
   o._statusSelected = false;
   o._statusLoaded = false;
   o._level = 0;
}

//==========================================================
// <T>点击当前节点。</T>
//
// @method
//==========================================================
function FUiTreeNode_click(){
   var o = this;
   var t = o._tree;
   t.selectNode(o, true);
   t.lsnsClick.process(t, o);
}

//==========================================================
// <T>刷新节点的样式。</T>
//
// @method
//==========================================================
function FUiTreeNode_refreshStyle(){
   var o = this;
   var cs = o._hPanel.cells;
   var c = cs.length;
   if(o._statusSelected){
      for(var i = 0; i < c; i++){
         cs[i].className = o.styleName('Select');
      }
   }else{
      if(o._statusHover){
         for(var i = 0; i < c; i++){
            cs[i].className = o.styleName('Hover');
         }
      }else{
         for(var i = 0; i < c; i++){
            cs[i].className = o.styleName('Normal');
         }
      }
   }
}

//==========================================================
// <T>从数据节点中加载数据内容。</T>
//
// @method
// @param x:config:TNode 数据节点
//==========================================================
function FUiTreeNode_propertyLoad(x){
   var o = this;
   var t = o._tree;
   o.__base.FUiContainer.propertyLoad.call(o, x);
   //o._typeName = RObject.nvl(t._typeNames.get(x.get('type')), this._tree._typeName);
   o._attributes.append(x.attrs);
   var ap = x.get('attributes')
   if(ap){
      o._attributes.unpack(ap);
   }
}

//==========================================================
// <T>存储数据内容到数据节点中。</T>
//
// @method
// @param x:config:TNode 数据节点
//==========================================================
function FUiTreeNode_propertySave(x){
   var o = this;
   o.__base.FUiContainer.propertySave.call(o, x);
   // Property
   x.set('type_name', o._typeName);
   x.set('attributes', o._attributes.pack());
}

//==========================================================
// <T>从数据节点中加载数据内容。</T>
//
// @method
// @param x:config:TXmlNode 数据节点
//==========================================================
function FUiTreeNode_loadConfig(x){
   var o = this;
   // 重置数据
   o.reset();
   // 加载属性
   o.propertyLoad(x);
   // 设置内容
   o.setLabel(o._label);
   o.setCheck(o._checked);
   o.setImage();
   o.setIcon(o._icon);
}















//==========================================================
// <T>重新加载节点。</T>
//
// @method
// @param t:top:Boolean 是否顶层节点
//==========================================================
function FUiTreeNode_reload(t){
   var o = this;
   if(t){
      o._tree.reload();
   }else{
      o._tree.reloadNode(o);
   }
}

//==========================================================
// <T>重新加载父节点。</T>
//
// @method
//==========================================================
function FUiTreeNode_reloadParent(){
   var o = this;
   if(o.parentNode){
      o._tree.reloadNode(o.parentNode);
   }else{
      o._tree.reload();
   }
}

//==========================================================
// <T>加载一个查询节点。</T>
//
// @method
// @param x:node:TNode 设置节点
//==========================================================
function FUiTreeNode_loadQuery(x){
   var o = this;
   var sl = RString.nvl(x.get('label'), o._label);
   var sn = RString.nvl(x.get('note'), o._note);
   var text = '&nbsp;' + sl;
   if(!RString.isEmpty(sn)){
      text += '&nbsp;<FONT color=green>[ ' + sn + ' ]</FONT>';
   }
   o._hLabel.innerHTML = text;
   if(x.contains('visible')){
      o._statusDisplay = RBool.isTrue(x.get('visible'));
      o.setVisible(o._statusDisplay);
   }
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FUiTreeNode_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
   o._hNodePanel = null;
   o._hImage = null;
   o._hIcon = null;
   o._hCheck = null;
   o._hLabel = null;
}

//==========================================================
// <T>获得运行时内部信息。</T>
//
// @method
// @param s:dump:TString 调试内容
//==========================================================
function FUiTreeNode_innerDump(s){
   var o = this;
   s.append(RClass._typeNameOf(o));
   s.append('[level=',  o._level);
   if(o._typeName){
      s.append(' type=',  o._typeName.name);
   }
   s.append(', icon=',  o._icon);
   s.append(', caption=', o._label);
   s.append(', child=', o._child);
   s.append(']');
}

































function FUiTreeNode_findByName(n){
   var o = this;
   if(o.name == n){
      return o;
   }
   var cs = o.components;
   if(cs){
      var cc = cs.count;
      for(var i=0; i<cc; i++){
         var c = cs.value(i);
         if(c){
            if(c.name == n){
               return c;
            }
            if(c.components){
               var f = c.findByName(n);
               if(f){
                  return f;
               }
            }
         }
      }
   }
   return null;
}

//==========================================================
// 到节点的子节点里找找一个节点
//
// @method
// @param u:uuid:String 节点的XML表示字符串
// @return FUiTreeNode 节点对象
//==========================================================
function FUiTreeNode_findByUuid(u){
   var o = this;
   if(o._uuid == u){
      return o;
   }
   var cs = o.components;
   if(cs){
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(c){
            if(c._uuid == u){
               return c;
            }
            if(c.components){
               var f = c.findByUuid(u);
               if(f){
                  return f;
               }
            }
         }
      }
   }
   return null;
}



//==========================================================
// 把改变过的节点存放到树的节点里
//
// @method
//==========================================================
function FUiTreeNode_pushChanged(trd){
   var o = this;
   //if(o.checkChanged()){
    var d = new TNode();
    d.attrs = o._attributes;
    if(d.attrs){
         d.attrs.set('checked', RBoolean.toString(o.check()));
    }
    trd.push(d);
   //}
   if(o.components && o.components.count > 0){
      var cc = o.components.count;
      for(var n = 0; n < cc; n++){
         var c = o.components.value(n);
         if(RClass.isClass(c, FUiTreeNode)){
            c.pushChanged(trd);
         }
      }
   }
}

//==========================================================
// 到节点的子节点里找找一个节点
//
// @method
// @param u:uuid:String 节点的XML表示字符串
// @return FUiTreeNode 节点对象
//==========================================================
function FUiTreeNode_checkChanged(){
   var o = this;
   if(o._checked != o.check()){
      return true;
   }
   return false;
}

//---------------------------------------------------
function FUiTreeNode_getFullPath(){
   var o = this;
   var path = '';
   if(o._label){
       path = o._label;
   }
    if(o.parent){
       var s = o.parent.getFullPath();
       if(!RString.isEmpty(s)){
           path = s + "/" + path;
       }
    }
    return path;
}

//---------------------------------------------------
function FUiTreeNode_isFolder(){
   if(this._typeName){
       return (this._typeName._typeNameName == 'collections') ? true : false;
   }
}
