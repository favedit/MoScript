with(MO){
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
   MO.FDuiTreeNode = function FDuiTreeNode(o){
      o = RClass.inherits(this, o, FDuiContainer, MUiDataProperties);
      //..........................................................
      // @property
      o._valid            = RClass.register(o, new APtyBoolean('_valid', 'is_valid'), true);
      o._child            = RClass.register(o, new APtyBoolean('_child', 'has_child'), false);
      o._typeGroup        = RClass.register(o, [new APtyString('_typeGroup'), new AGetSet('_typeGroup')]);
      o._typeCode         = RClass.register(o, [new APtyString('_typeCode'), new AGetter('_typeCode')]);
      o._code             = RClass.register(o, [new APtyString('_code'), new AGetSet('_code')]);
      o._icon             = RClass.register(o, new APtyString('_icon'));
      o._checked          = RClass.register(o, new APtyBoolean('_checked'), false);
      o._extended         = RClass.register(o, new APtyBoolean('_extended'), false);
      o._note             = RClass.register(o, new APtyString('_note'));
      o._attributes       = RClass.register(o, new APtyAttributes('_attributes'));
      //..........................................................
      // @style
      o._styleNormal      = RClass.register(o, new AStyle('_styleNormal'));
      o._styleHover       = RClass.register(o, new AStyle('_styleHover'));
      o._styleSelect      = RClass.register(o, new AStyle('_styleSelect'));
      o._styleImage       = RClass.register(o, new AStyle('_styleImage'));
      o._styleIcon        = RClass.register(o, new AStyle('_styleIcon'));
      o._styleIconDisable = RClass.register(o, new AStyle('_styleIconDisable'));
      o._styleLabel       = RClass.register(o, new AStyle('_styleLabel'));
      o._styleCell        = RClass.register(o, new AStyle('_styleCell'));
      //..........................................................
      // @attribute
      o._tree             = RClass.register(o, new AGetSet('_tree'));
      o._level            = RClass.register(o, new AGetter('_level'), 0);
      o._nodes            = RClass.register(o, new AGetter('_nodes'));
      o._cells            = RClass.register(o, new AGetter('_cells'));
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
      o.onBuildPanel      = FDuiTreeNode_onBuildPanel;
      o.onBuild           = FDuiTreeNode_onBuild;
      // @event
      o.onNodeEnter       = RClass.register(o, new AEventMouseEnter('onNodeEnter'), FDuiTreeNode_onNodeEnter);
      o.onNodeLeave       = RClass.register(o, new AEventMouseLeave('onNodeLeave'), FDuiTreeNode_onNodeLeave);
      o.onNodeClick       = RClass.register(o, new AEventClick('onNodeClick'), FDuiTreeNode_onNodeClick);
      //..........................................................
      // @method
      o.construct         = FDuiTreeNode_construct;
      // @method
      o.type              = FDuiTreeNode_type;
      o.setTypeCode       = FDuiTreeNode_setTypeCode;
      o.setLabel          = FDuiTreeNode_setLabel;
      o.setNote           = FDuiTreeNode_setNote;
      o.setLevel          = FDuiTreeNode_setLevel;
      o.cell              = FDuiTreeNode_cell;
      o.check             = FDuiTreeNode_check;
      o.setCheck          = FDuiTreeNode_setCheck;
      o.setImage          = FDuiTreeNode_setImage;
      o.calculateImage    = FDuiTreeNode_calculateImage;
      o.setIcon           = FDuiTreeNode_setIcon;
      o.get               = FDuiTreeNode_get;
      o.set               = FDuiTreeNode_set;
      // @method
      o.isFolder          = FDuiTreeNode_isFolder;
      o.hasChild          = FDuiTreeNode_hasChild;
      o.topNode           = FDuiTreeNode_topNode;
      o.topNodeByType     = FDuiTreeNode_topNodeByType;
      o.nodeCount         = FDuiTreeNode_nodeCount;
      o.show              = FDuiTreeNode_show;
      o.hide              = FDuiTreeNode_hide;
      o.select            = FDuiTreeNode_select;
      o.extend            = FDuiTreeNode_extend;
      o.extendAll         = FDuiTreeNode_extendAll;
      o.searchLast        = FDuiTreeNode_searchLast;
      o.createChild       = FDuiTreeNode_createChild;
      o.appendChild       = FDuiTreeNode_appendChild;
      o.appendNode        = FDuiTreeNode_appendNode;
      o.push              = FDuiTreeNode_push;
      o.remove            = FDuiTreeNode_remove;
      o.removeSelf        = FDuiTreeNode_removeSelf;
      o.removeChildren    = FDuiTreeNode_removeChildren;
      o.reset             = FDuiTreeNode_reset;
      // @method
      o.click             = FDuiTreeNode_click;
      // @method
      o.refreshStyle      = FDuiTreeNode_refreshStyle;
      // @method
      o.propertyLoad      = FDuiTreeNode_propertyLoad;
      o.propertySave      = FDuiTreeNode_propertySave;
      o.loadConfig        = FDuiTreeNode_loadConfig;
      // @method
      o.dispose           = FDuiTreeNode_dispose;
      o.innerDump         = FDuiTreeNode_innerDump;




      //..........................................................
      // @method
      //o.reload           = FDuiTreeNode_reload;
      //o.reloadParent     = FDuiTreeNode_reloadParent;
      //o.loadQuery        = FDuiTreeNode_loadQuery;
      //..........................................................
      // @method
      //o.findByName       = FDuiTreeNode_findByName;
      //o.findByUuid       = FDuiTreeNode_findByUuid;
      //o.checkChanged     = FDuiTreeNode_checkChanged;
      //o.pushChanged      = FDuiTreeNode_pushChanged;
      //o.getFullPath      = FDuiTreeNode_getFullPath;
      return o;
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDuiTreeNode_onBuildPanel = function FDuiTreeNode_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
   }

   //==========================================================
   // <T>构建页面处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件
   //==========================================================
   MO.FDuiTreeNode_onBuild = function FDuiTreeNode_onBuild(p){
      var o = this;
      var t = o._tree;
      var r = o.__base.FDuiContainer.onBuild.call(o, p);
      // 建立底板
      var hp = o._hPanel;
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
      var cs = t._nodeColumns;
      if(cs){
         var cc = cs.count();
         for(var n = 0; n < cc; n++){
            var c = cs.value(n);
            var nc = RClass.create(FDuiTreeNodeCell);
            nc._column = c;
            nc.build(p);
            o.push(nc);
         }
      }
   }

   //==========================================================
   // <T>鼠标移进节点的事件。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   MO.FDuiTreeNode_onNodeEnter = function FDuiTreeNode_onNodeEnter(e){
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
   // @param event:TEvent 事件对象
   //==========================================================
   MO.FDuiTreeNode_onNodeLeave = function FDuiTreeNode_onNodeLeave(event){
      var o = this;
      var tree = o._tree;
      if(!tree._focusNode || (tree._focusNode && (tree._focusNode != o))){
         o._statusHover = false;
         o.refreshStyle();
         tree.lsnsLeave.process(tree, o);
      }
   }

   //==========================================================
   // <T>鼠标点击节点的事件。</T>
   //
   // @method
   // @param event:TEvent 事件对象
   //==========================================================
   MO.FDuiTreeNode_onNodeClick = function FDuiTreeNode_onNodeClick(event){
      var o = this;
      var tree = o._tree;
      var esn = event.hSender.tagName;
      // 处理复选框的情况
      if('INPUT' == esn){
         return;
      }
      // 检查点击的是展开图标还是节点图标
      var isImg = false;
      if('IMG' == esn){
         isImg = ('image' == event.hSender._linkType);
      }
      // 查询点击节点是否已获焦点对象的父节点
      var isParent = false;
      var find = tree._focusNode;
      while(find){
         if(find == o){
            isParent = true;
            break;
         }
         find = find.parent;
      }
      // 设置焦点节点
      if(!isImg || (isImg && (isParent || !o._child))){
         tree.selectNode(o, true);
      }
      // 判断是否需要加载节点
      if(!o._statusLoaded && o._child){
         o.extend(true);
         if(!isImg){
            tree.nodeClick(o);
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
            tree.nodeClick(o);
         }
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDuiTreeNode_construct = function FDuiTreeNode_construct(){
      var o = this;
      o.__base.FDuiContainer.construct.call(o);
   }

   //==========================================================
   // <T>查找类型。</T>
   //
   // @method
   // @return String 类型
   //==========================================================
   MO.FDuiTreeNode_type = function FDuiTreeNode_type(){
      var o = this;
      var t = o._tree;
      if(RString.isEmpty(o._typeCode)){
         return null;
      }
      return t.findType(o._typeCode);
   }

   //==========================================================
   // <T>设置类型代码。</T>
   //
   // @method
   // @param value:String 类型代码
   //==========================================================
   MO.FDuiTreeNode_setTypeCode = function FDuiTreeNode_setTypeCode(value){
      var o = this;
      o._typeCode = value;
      o.setIcon();
   }

   //==========================================================
   // <T>设置标签。</T>
   //
   // @method
   // @param p:label:String 标签
   //==========================================================
   MO.FDuiTreeNode_setLabel = function FDuiTreeNode_setLabel(p){
      var o = this;
      o.__base.FDuiContainer.setLabel.call(o, p)
      // 设置显示内容
      var h = o._hLabel;
      if(h){
         var s = '';
         if(!RString.isEmpty(o._label)){
            s = '&nbsp;' + o._label;
         }
         if(!RString.isEmpty(o._tag)){
            s += '&nbsp;<FONT color=blue>(' + o._tag + ')</FONT>';
         }
         if(!RString.isEmpty(o._note)){
            s += '&nbsp;<FONT color=green>[ ' + o._note + ' ]</FONT>';
         }
         h.innerHTML = s;
      }
   }

   //==========================================================
   // <T>设置标签。</T>
   //
   // @method
   // @param p:note:String 标签
   //==========================================================
   MO.FDuiTreeNode_setNote = function FDuiTreeNode_setNote(p){
      var o = this;
      o._note = RString.empty(p);
      o.setLabel(o._label);
   }

   //==========================================================
   // <T>设置层次。</T>
   //
   // @method
   // @param level:Integer 层次
   //==========================================================
   MO.FDuiTreeNode_setLevel = function FDuiTreeNode_setLevel(level){
      var o = this;
      // 设置属性
      o._level = level;
      // 设置页面
      var hPanel = o._hNodePanel;
      if(hPanel){
         hPanel.style.paddingLeft = (o._tree._indent * level) + 'px';
      }
   }

   //==========================================================
   // <T>获取指定名称的格子。</T>
   //
   // @method
   // @param p:name:String 名称
   // @return FDuiTreeNodeCell 格子
   //==========================================================
   MO.FDuiTreeNode_cell = function FDuiTreeNode_cell(p){
      return this._cells.get(p);
   }

   //==========================================================
   // <T>获取节点选取。</T>
   //
   // @method
   // @return Boolean 是否选取
   //==========================================================
   MO.FDuiTreeNode_check = function FDuiTreeNode_check(){
      return this._checked;
   }

   //==========================================================
   // <T>设置选中。</T>
   //
   // @method
   // @param p:check:Boolean 选中
   //==========================================================
   MO.FDuiTreeNode_setCheck = function FDuiTreeNode_setCheck(p){
      var o = this;
      o._checked = p;
      // 属性集合控制
      var attributes = o._attributes;
      if(attributes){
         var value = attributes.get('checked');
         if(!RString.isEmpty(value)){
           o._checked = RBoolean.isTrue(value);
           if(o._hCheck){
               o._hCheck._checked = o._checked;
           }
         }
      }
   }

   //==========================================================
   // <T>设置位图。</T>
   //
   // @method
   //==========================================================
   MO.FDuiTreeNode_setImage = function FDuiTreeNode_setImage(){
      var o = this;
      var tree = o._tree;
      var hImage = o._hImage;
      var icon = o._child ? tree._iconPlus : tree._iconNode;
      hImage.src = RResource.iconPath(icon);
   }

   //==========================================================
   // <T>计算位图。</T>
   //
   // @method
   //==========================================================
   MO.FDuiTreeNode_calculateImage = function FDuiTreeNode_calculateImage(){
      var o = this;
      var tree = o._tree;
      var hImage = o._hImage;
      var icon = null;
      var count = o.nodeCount();
      if(count){
         icon = o._extended ? tree._iconMinus : tree._iconPlus;
      }else{
         icon = tree._iconNode;
      }
      hImage.src = RResource.iconPath(icon);
   }

   //==========================================================
   // <T>设置图标。</T>
   //
   // @method
   // @param p:icon:String 图标
   //==========================================================
   MO.FDuiTreeNode_setIcon = function FDuiTreeNode_setIcon(p){
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
   MO.FDuiTreeNode_get = function FDuiTreeNode_get(n){
      return this._attributes.get(n);
   }

   //==========================================================
   // <T>设置节点属性。</T>
   //
   // @method
   // @param n:name:String 属性名称
   // @param v:value:String 属性内容
   //==========================================================
   MO.FDuiTreeNode_set = function FDuiTreeNode_set(n, v){
      this._attributes.set(n, v);
   }

   //==========================================================
   // <T>是否是目录。</T>
   // 
   // @method
   // @return Boolean 是否有子节点
   //==========================================================
   MO.FDuiTreeNode_isFolder = function FDuiTreeNode_isFolder(){
      var o = this;
      var t = o.type();
      return t.storage() == 'collections';
   }

   //==========================================================
   // <T>是否有子节点。</T>
   // 
   //
   // @method
   // @return Boolean 是否有子节点
   //==========================================================
   MO.FDuiTreeNode_hasChild = function FDuiTreeNode_hasChild(){
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
   MO.FDuiTreeNode_topNode = function FDuiTreeNode_topNode(){
      var r = this;
      while(r._parent){
         if(RClass.isClass(r._parent, FDuiTreeNode)){
            r = r._parent;
         }else{
            break;
         }
      }
      return r;
   }

   //==========================================================
   // <T>查询指定类型的顶层节点。</T>
   //
   // @method
   // @param t:type:String 类型名称
   //==========================================================
   MO.FDuiTreeNode_topNodeByType = function FDuiTreeNode_topNodeByType(t){
      var r = this;
      while(r){
         if(r._typeCode == t){
            return r;
         }
         r = r._parent;
      }
      return null;
   }

   //==========================================================
   // <T>获得节点数量。</T>
   //
   // @method
   // @return Integer 节点数量
   //==========================================================
   MO.FDuiTreeNode_nodeCount = function FDuiTreeNode_nodeCount(){
      var o = this;
      var nodes = o._nodes
      if(nodes){
         return nodes.count();
      }
      return 0;
   }

   //==========================================================
   // <T>显示这个节点和他的子节点。</T>
   //
   // @method
   //==========================================================
   MO.FDuiTreeNode_show = function FDuiTreeNode_show(){
      var o = this;
      var tree = o._tree;
      // 显示自己
      RHtml.visibleSet(o._hPanel, true);
      // 显示所有子节点
      var nodes = o._nodes;
      if(nodes){
         var count = nodes.count();
         for(var i = 0; i < count; i++){
            var node = nodes.at(i);
            // 判断是否要加到树目录
            if(!node._statusLinked){
               tree.appendNode(node, o);
            }
            // 判断是否要显示
            if(node._statusDisplay){
               RHtml.visibleSet(node._hPanel, true);
               if(node._extended){
                  node.show();
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
   MO.FDuiTreeNode_hide = function FDuiTreeNode_hide(){
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
   MO.FDuiTreeNode_select = function FDuiTreeNode_select(v){
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
   MO.FDuiTreeNode_extend = function FDuiTreeNode_extend(p){
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
   MO.FDuiTreeNode_extendAll = function FDuiTreeNode_extendAll(p){
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
   // @return FDuiTreeNode 子节点
   //==========================================================
   MO.FDuiTreeNode_searchLast = function FDuiTreeNode_searchLast(){
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
   MO.FDuiTreeNode_createChild = function FDuiTreeNode_createChild(x){
      var r = null;
      if(x.isName('Node') || x.isName('TreeNode')){
         r = RClass.create(FDuiTreeNode);
         r._tree = this._tree;
      }
      return r;
   }

   //==========================================================
   // <T>追加一个字控件。</T>
   //
   // @method
   // @param p:control:FDuiControl 控件
   //==========================================================
   MO.FDuiTreeNode_appendChild = function FDuiTreeNode_appendChild(p){
      var o = this;
      if(RClass.isClass(p, FDuiTreeNodeCell)){
         o._hPanel.appendChild(p._hPanel);
      }
   }

   //==========================================================
   // <T>追加一个子目录节点。</T>
   //
   // @method
   // @param p:ndoe:TTreeNode 目录节点
   //==========================================================
   MO.FDuiTreeNode_appendNode = function FDuiTreeNode_appendNode(p){
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
   // @param component:FComponent 组件对象
   //==========================================================
   MO.FDuiTreeNode_push = function FDuiTreeNode_push(component){
      var o = this;
      var tree = o._tree;
      o.__base.FDuiContainer.push.call(o, component);
      // 增加一个树节点
      if(RClass.isClass(component, FDuiTreeNode)){
         o._child = true;
         o._statusLoaded = true;
         // 增加子节点
         var nodes = o._nodes;
         if(!nodes){
            nodes = o._nodes = new TObjects();
         }
         component._tree = tree;
         component._parent = o;
         nodes.push(component);
         tree._allNodes.pushUnique(component);
      }
      // 增加一个节点格子
      if(RClass.isClass(component, FDuiTreeNodeCell)){
         var cells = o._cells;
         if(!cells){
            cells = o._cells = new TDictionary();
         }
         component._parent = o;
         component._tree = tree;
         component._node = o;
         cells.set(component._column._name, component);
      }
   }


   //==========================================================
   // <T>移除指定子控件。</T>
   //
   // @method
   // @param component:FComponent 组件对象
   //==========================================================
   MO.FDuiTreeNode_remove = function FDuiTreeNode_remove(component){
      var o = this;
      // 检查类型
      if(RClass.isClass(component, FDuiTreeNode)){
         o._nodes.remove(component);
      }
      // 父处理
      o.__base.FDuiContainer.remove.call(o, component);
   }

   //==========================================================
   // <T>删除当前节点。</T>
   //
   // @method
   //==========================================================
   MO.FDuiTreeNode_removeSelf = function FDuiTreeNode_removeSelf(){
      var o = this;
      var tree = o._tree;
      if(o._statusLinked){
         // 删除所有子节点
         o.removeChildren();
         // 父节点刷新
         var parent = o._parent;
         if(RClass.isClass(parent, FDuiTreeNode)){
            parent.remove(o);
            parent.calculateImage();
         }
         // 删除自己
         tree.freeNode(o);
      }
   }

   //==========================================================
   // <T>删除当前节点和所有子节点。</T>
   //
   // @method
   //==========================================================
   MO.FDuiTreeNode_removeChildren = function FDuiTreeNode_removeChildren(){
      var nodes = this._nodes;
      if(nodes){
         var count = nodes.count();
         for(var i = count - 1; i >= 0; i--){
            var node = nodes.get(i);
            if(node){
               node.removeSelf();
            }
         }
         nodes.clear();
      }
   }

   //==========================================================
   // <T>重置数据。</T>
   //
   // @method
   //==========================================================
   MO.FDuiTreeNode_reset = function FDuiTreeNode_reset(){
      var o = this;
      // 获取属性
      o._typeCode = null;
      o._guid = null;
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
   MO.FDuiTreeNode_click = function FDuiTreeNode_click(){
      var o = this;
      var tree = o._tree;
      tree.selectNode(o, true);
      tree.nodeClick(o);
   }

   //==========================================================
   // <T>刷新节点的样式。</T>
   //
   // @method
   //==========================================================
   MO.FDuiTreeNode_refreshStyle = function FDuiTreeNode_refreshStyle(){
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
   MO.FDuiTreeNode_propertyLoad = function FDuiTreeNode_propertyLoad(x){
      var o = this;
      var t = o._tree;
      o.__base.FDuiContainer.propertyLoad.call(o, x);
      // 加载属性
      var attributes = o._attributes;
      if(attributes){
         attributes.append(x.attrs);
      }
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
   MO.FDuiTreeNode_propertySave = function FDuiTreeNode_propertySave(x){
      var o = this;
      o.__base.FDuiContainer.propertySave.call(o, x);
      // Property
      var t = o.type();
      x.set('type_code', t._code);
      x.set('storage', t._storage);
      //x.set('attributes', o._attributes.pack());
   }

   //==========================================================
   // <T>从数据节点中加载数据内容。</T>
   //
   // @method
   // @param x:config:TXmlNode 数据节点
   //==========================================================
   MO.FDuiTreeNode_loadConfig = function FDuiTreeNode_loadConfig(x){
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
   // <T>释放对象。</T>
   //
   // @method
   //==========================================================
   MO.FDuiTreeNode_dispose = function FDuiTreeNode_dispose(){
      var o = this;
      o._hNodePanel = null;
      o._hImage = null;
      o._hIcon = null;
      o._hCheck = null;
      o._hLabel = null;
      o.__base.FDuiContainer.dispose.call(o);
   }

   //==========================================================
   // <T>获得运行时内部信息。</T>
   //
   // @method
   // @param s:dump:TString 调试内容
   //==========================================================
   MO.FDuiTreeNode_innerDump = function FDuiTreeNode_innerDump(s){
      var o = this;
      s.append(RClass.name(o));
      s.append('[level=',  o._level);
      if(o._typeCode){
         s.append(' type=',  o._typeCode.name);
      }
      s.append(', icon=',  o._icon);
      s.append(', caption=', o._label);
      s.append(', child=', o._child);
      s.append(']');
   }




























   //==========================================================
   // <T>重新加载节点。</T>
   //
   // @method
   // @param t:top:Boolean 是否顶层节点
   //==========================================================
   MO.FDuiTreeNode_reload = function FDuiTreeNode_reload(t){
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
   MO.FDuiTreeNode_reloadParent = function FDuiTreeNode_reloadParent(){
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
   MO.FDuiTreeNode_loadQuery = function FDuiTreeNode_loadQuery(x){
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

   MO.FDuiTreeNode_findByName = function FDuiTreeNode_findByName(n){
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
   // @return FDuiTreeNode 节点对象
   //==========================================================
   MO.FDuiTreeNode_findByUuid = function FDuiTreeNode_findByUuid(u){
      var o = this;
      if(o._guid == u){
         return o;
      }
      var cs = o.components;
      if(cs){
         for(var n=0; n<cs.count; n++){
            var c = cs.value(n);
            if(c){
               if(c._guid == u){
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
   MO.FDuiTreeNode_pushChanged = function FDuiTreeNode_pushChanged(trd){
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
            if(RClass.isClass(c, FDuiTreeNode)){
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
   // @return FDuiTreeNode 节点对象
   //==========================================================
   MO.FDuiTreeNode_checkChanged = function FDuiTreeNode_checkChanged(){
      var o = this;
      if(o._checked != o.check()){
         return true;
      }
      return false;
   }

   //---------------------------------------------------
   MO.FDuiTreeNode_getFullPath = function FDuiTreeNode_getFullPath(){
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
}
