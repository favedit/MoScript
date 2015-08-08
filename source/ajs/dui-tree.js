MO.EDuiTreeNodeGroup = new function EDuiTreeNodeGroup(){
   var o = this;
   o.Container = 'container';
   o.Item      = 'item';
   return o;
}
MO.FDuiTreeColumn = function FDuiTreeColumn(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._icon        = MO.Class.register(o, new MO.APtyString('_icon'));
   o._dataName    = MO.Class.register(o, new MO.APtyString('_dataName'));
   o._display     = MO.Class.register(o, new MO.APtyBoolean('_display'), MO.EBoolean.False);
   o._config      = MO.Class.register(o, new MO.APtyConfig('_config'));
   o.oeBuild      = MO.FDuiTreeColumn_oeBuild;
   o.onBuildPanel = MO.FDuiTreeColumn_onBuildPanel;
   return o;
}
MO.FDuiTreeColumn_oeBuild = function FDuiTreeColumn_oeBuild(event){
   var o = this;
   o.__base.FDuiControl.oeBuild.call(o, event);
   var hPanel = o._hPanel;
   hPanel.innerText = MO.Lang.String.nvl(o.label);
   hPanel.noWrap = true;
   if(!o.display){
      hPanel.style.display = 'block';
   }
   if(o.width){
      hPanel.width = o.width;
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiTreeColumn_onBuildPanel = function FDuiTreeColumn_onBuildPanel(){
   this.hPanel = MO.Window.Builder.create(null, 'TD');
}
MO.FDuiTreeLevel = function FDuiTreeLevel(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._id        = MO.Class.register(o, new MO.APtyString('_id'));
   o._color     = MO.Class.register(o, new MO.APtyString('_color'));
   o._backColor = MO.Class.register(o, new MO.APtyString('_backColor'));
   return o;
}
MO.FDuiTreeNode = function FDuiTreeNode(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MUiDataProperties);
   o._valid            = MO.Class.register(o, new MO.APtyBoolean('_valid', 'is_valid'), true);
   o._child            = MO.Class.register(o, new MO.APtyBoolean('_child', 'has_child'), false);
   o._typeGroup        = MO.Class.register(o, [new MO.APtyString('_typeGroup'), new MO.AGetSet('_typeGroup')]);
   o._typeCode         = MO.Class.register(o, [new MO.APtyString('_typeCode'), new MO.AGetter('_typeCode')]);
   o._code             = MO.Class.register(o, [new MO.APtyString('_code'), new MO.AGetSet('_code')]);
   o._icon             = MO.Class.register(o, new MO.APtyString('_icon'));
   o._checked          = MO.Class.register(o, new MO.APtyBoolean('_checked'), false);
   o._extended         = MO.Class.register(o, new MO.APtyBoolean('_extended'), false);
   o._note             = MO.Class.register(o, new MO.APtyString('_note'));
   o._attributes       = MO.Class.register(o, new MO.APtyAttributes('_attributes'));
   o._styleNormal      = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   o._styleHover       = MO.Class.register(o, new MO.AStyle('_styleHover'));
   o._styleSelect      = MO.Class.register(o, new MO.AStyle('_styleSelect'));
   o._styleImage       = MO.Class.register(o, new MO.AStyle('_styleImage'));
   o._styleIcon        = MO.Class.register(o, new MO.AStyle('_styleIcon'));
   o._styleIconDisable = MO.Class.register(o, new MO.AStyle('_styleIconDisable'));
   o._styleLabel       = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   o._styleCell        = MO.Class.register(o, new MO.AStyle('_styleCell'));
   o._tree             = MO.Class.register(o, new MO.AGetSet('_tree'));
   o._level            = MO.Class.register(o, new MO.AGetter('_level'), 0);
   o._nodes            = MO.Class.register(o, new MO.AGetter('_nodes'));
   o._cells            = MO.Class.register(o, new MO.AGetter('_cells'));
   o._statusLinked     = false;
   o._statusDisplay    = true;
   o._statusSelected   = false;
   o._statusLoaded     = false;
   o._statusHover      = false;
   o._hNodePanel       = null;
   o._hCheck           = null;
   o._hImage           = null;
   o._hIcon            = null;
   o._hLabel           = null;
   o.onBuildPanel      = MO.FDuiTreeNode_onBuildPanel;
   o.onBuild           = MO.FDuiTreeNode_onBuild;
   o.onNodeEnter       = MO.Class.register(o, new MO.AEventMouseEnter('onNodeEnter'), MO.FDuiTreeNode_onNodeEnter);
   o.onNodeLeave       = MO.Class.register(o, new MO.AEventMouseLeave('onNodeLeave'), MO.FDuiTreeNode_onNodeLeave);
   o.onNodeClick       = MO.Class.register(o, new MO.AEventClick('onNodeClick'), MO.FDuiTreeNode_onNodeClick);
   o.construct         = MO.FDuiTreeNode_construct;
   o.type              = MO.FDuiTreeNode_type;
   o.setTypeCode       = MO.FDuiTreeNode_setTypeCode;
   o.setLabel          = MO.FDuiTreeNode_setLabel;
   o.setNote           = MO.FDuiTreeNode_setNote;
   o.setLevel          = MO.FDuiTreeNode_setLevel;
   o.cell              = MO.FDuiTreeNode_cell;
   o.check             = MO.FDuiTreeNode_check;
   o.setCheck          = MO.FDuiTreeNode_setCheck;
   o.setImage          = MO.FDuiTreeNode_setImage;
   o.calculateImage    = MO.FDuiTreeNode_calculateImage;
   o.setIcon           = MO.FDuiTreeNode_setIcon;
   o.get               = MO.FDuiTreeNode_get;
   o.set               = MO.FDuiTreeNode_set;
   o.isFolder          = MO.FDuiTreeNode_isFolder;
   o.hasChild          = MO.FDuiTreeNode_hasChild;
   o.topNode           = MO.FDuiTreeNode_topNode;
   o.topNodeByType     = MO.FDuiTreeNode_topNodeByType;
   o.nodeCount         = MO.FDuiTreeNode_nodeCount;
   o.show              = MO.FDuiTreeNode_show;
   o.hide              = MO.FDuiTreeNode_hide;
   o.select            = MO.FDuiTreeNode_select;
   o.extend            = MO.FDuiTreeNode_extend;
   o.extendAll         = MO.FDuiTreeNode_extendAll;
   o.searchLast        = MO.FDuiTreeNode_searchLast;
   o.createChild       = MO.FDuiTreeNode_createChild;
   o.appendChild       = MO.FDuiTreeNode_appendChild;
   o.appendNode        = MO.FDuiTreeNode_appendNode;
   o.push              = MO.FDuiTreeNode_push;
   o.remove            = MO.FDuiTreeNode_remove;
   o.removeSelf        = MO.FDuiTreeNode_removeSelf;
   o.removeChildren    = MO.FDuiTreeNode_removeChildren;
   o.reset             = MO.FDuiTreeNode_reset;
   o.click             = MO.FDuiTreeNode_click;
   o.refreshStyle      = MO.FDuiTreeNode_refreshStyle;
   o.propertyLoad      = MO.FDuiTreeNode_propertyLoad;
   o.propertySave      = MO.FDuiTreeNode_propertySave;
   o.loadConfig        = MO.FDuiTreeNode_loadConfig;
   o.dispose           = MO.FDuiTreeNode_dispose;
   o.innerDump         = MO.FDuiTreeNode_innerDump;
   return o;
}
MO.FDuiTreeNode_onBuildPanel = function FDuiTreeNode_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTableRow(p, o.styleName('Panel'));
}
MO.FDuiTreeNode_onBuild = function FDuiTreeNode_onBuild(p){
   var o = this;
   var t = o._tree;
   var r = o.__base.FDuiContainer.onBuild.call(o, p);
   var hp = o._hPanel;
   o.attachEvent('onNodeEnter', hp, o.onNodeEnter);
   o.attachEvent('onNodeLeave', hp, o.onNodeLeave);
   o.attachEvent('onNodeClick', hp);
   var hnp = o._hNodePanel = MO.Window.Builder.appendTableCell(hp, o.styleName('Normal'));
   hnp.noWrap = true;
   var hi = o._hImage = MO.Window.Builder.appendIcon(hnp, o.styleName('Image'), null, 16, 16);
   hi._linkType = 'image';
   o.setImage();
   var hi = o._hIcon = MO.Window.Builder.appendIcon(hnp, null, null, 16, 16)
   hi._linkType = 'icon';
   o.setIcon(o._icon);
   if(t.dispChecked){
      var hc = o._hCheck = MO.Window.Builder.appendCheck(hnp);
      hc.width = 13;
      hc.height = 13;
      hc.style.borderWidth = 0;
      o.setCheck(o._checked);
      t.linkEvent(o, 'onNodeCheckClick', hc);
   }
   o._hLabel = MO.Window.Builder.appendText(hnp, o.styleName('Label'));
   o.setLabel(o._label);
   var cs = t._nodeColumns;
   if(cs){
      var cc = cs.count();
      for(var n = 0; n < cc; n++){
         var c = cs.value(n);
         var nc = MO.Class.create(MO.FDuiTreeNodeCell);
         nc._column = c;
         nc.build(p);
         o.push(nc);
      }
   }
}
MO.FDuiTreeNode_onNodeEnter = function FDuiTreeNode_onNodeEnter(e){
   var o = this;
   var t = o._tree;
   if(!t._focusNode || (t._focusNode && (t._focusNode != o))){
      o._statusHover = true;
      o.refreshStyle();
      t.lsnsEnter.process(t, o);
   }
}
MO.FDuiTreeNode_onNodeLeave = function FDuiTreeNode_onNodeLeave(event){
   var o = this;
   var tree = o._tree;
   if(!tree._focusNode || (tree._focusNode && (tree._focusNode != o))){
      o._statusHover = false;
      o.refreshStyle();
      tree.lsnsLeave.process(tree, o);
   }
}
MO.FDuiTreeNode_onNodeClick = function FDuiTreeNode_onNodeClick(event){
   var o = this;
   var tree = o._tree;
   var esn = event.hSender.tagName;
   if('INPUT' == esn){
      return;
   }
   var isImg = false;
   if('IMG' == esn){
      isImg = ('image' == event.hSender._linkType);
   }
   var isParent = false;
   var find = tree._focusNode;
   while(find){
      if(find == o){
         isParent = true;
         break;
      }
      find = find.parent;
   }
   if(!isImg || (isImg && (isParent || !o._child))){
      tree.selectNode(o, true);
   }
   if(!o._statusLoaded && o._child){
      o.extend(true);
      if(!isImg){
         tree.nodeClick(o);
      }
   }else{
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
MO.FDuiTreeNode_construct = function FDuiTreeNode_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
}
MO.FDuiTreeNode_type = function FDuiTreeNode_type(){
   var o = this;
   var t = o._tree;
   if(MO.Lang.String.isEmpty(o._typeCode)){
      return null;
   }
   return t.findType(o._typeCode);
}
MO.FDuiTreeNode_setTypeCode = function FDuiTreeNode_setTypeCode(value){
   var o = this;
   o._typeCode = value;
   o.setIcon();
}
MO.FDuiTreeNode_setLabel = function FDuiTreeNode_setLabel(p){
   var o = this;
   o.__base.FDuiContainer.setLabel.call(o, p)
   var h = o._hLabel;
   if(h){
      var s = '';
      if(!MO.Lang.String.isEmpty(o._label)){
         s = '&nbsp;' + o._label;
      }
      if(!MO.Lang.String.isEmpty(o._tag)){
         s += '&nbsp;<FONT color=blue>(' + o._tag + ')</FONT>';
      }
      if(!MO.Lang.String.isEmpty(o._note)){
         s += '&nbsp;<FONT color=green>[ ' + o._note + ' ]</FONT>';
      }
      h.innerHTML = s;
   }
}
MO.FDuiTreeNode_setNote = function FDuiTreeNode_setNote(p){
   var o = this;
   o._note = MO.Lang.String.empty(p);
   o.setLabel(o._label);
}
MO.FDuiTreeNode_setLevel = function FDuiTreeNode_setLevel(level){
   var o = this;
   o._level = level;
   var hPanel = o._hNodePanel;
   if(hPanel){
      hPanel.style.paddingLeft = (o._tree._indent * level) + 'px';
   }
}
MO.FDuiTreeNode_cell = function FDuiTreeNode_cell(p){
   return this._cells.get(p);
}
MO.FDuiTreeNode_check = function FDuiTreeNode_check(){
   return this._checked;
}
MO.FDuiTreeNode_setCheck = function FDuiTreeNode_setCheck(p){
   var o = this;
   o._checked = p;
   var attributes = o._attributes;
   if(attributes){
      var value = attributes.get('checked');
      if(!MO.Lang.String.isEmpty(value)){
        o._checked = MO.Lang.Boolean.isTrue(value);
        if(o._hCheck){
            o._hCheck._checked = o._checked;
        }
      }
   }
}
MO.FDuiTreeNode_setImage = function FDuiTreeNode_setImage(){
   var o = this;
   var tree = o._tree;
   var hImage = o._hImage;
   var icon = o._child ? tree._iconPlus : tree._iconNode;
   hImage.src = MO.RResource.iconPath(icon);
}
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
   hImage.src = MO.RResource.iconPath(icon);
}
MO.FDuiTreeNode_setIcon = function FDuiTreeNode_setIcon(p){
   var o = this;
   o._icon = p;
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
         MO.Window.Html.displaySet(h, true);
         h.style.width = 16;
         h.style.height = 16;
         h.className = o._valid ? o.styleName('Icon') : o.styleName('IconDisable');
         h.src = MO.RResource.iconPath(ni);
      }else{
         MO.Window.Html.displaySet(h, false);
      }
   }
}
MO.FDuiTreeNode_get = function FDuiTreeNode_get(n){
   return this._attributes.get(n);
}
MO.FDuiTreeNode_set = function FDuiTreeNode_set(n, v){
   this._attributes.set(n, v);
}
MO.FDuiTreeNode_isFolder = function FDuiTreeNode_isFolder(){
   var o = this;
   var type = o.type();
   if(type){
      var storage = type.storage()
      return storage == 'collections';
   }
   return false;
}
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
MO.FDuiTreeNode_topNode = function FDuiTreeNode_topNode(){
   var r = this;
   while(r._parent){
      if(MO.Class.isClass(r._parent, FDuiTreeNode)){
         r = r._parent;
      }else{
         break;
      }
   }
   return r;
}
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
MO.FDuiTreeNode_nodeCount = function FDuiTreeNode_nodeCount(){
   var o = this;
   var nodes = o._nodes
   if(nodes){
      return nodes.count();
   }
   return 0;
}
MO.FDuiTreeNode_show = function FDuiTreeNode_show(){
   var o = this;
   var tree = o._tree;
   MO.Window.Html.visibleSet(o._hPanel, true);
   var nodes = o._nodes;
   if(nodes){
      var count = nodes.count();
      for(var i = 0; i < count; i++){
         var node = nodes.at(i);
         if(!node._statusLinked){
            tree.appendNode(node, o);
         }
         if(node._statusDisplay){
            MO.Window.Html.visibleSet(node._hPanel, true);
            if(node._extended){
               node.show();
            }
         }
      }
   }
}
MO.FDuiTreeNode_hide = function FDuiTreeNode_hide(){
   var o = this;
   var t = o._tree;
   if(o._hPanel){
      MO.Window.Html.visibleSet(o._hPanel, false);
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
MO.FDuiTreeNode_select = function FDuiTreeNode_select(v){
   var o = this;
   o._statusSelected = v;
   if(v){
      o._statusHover = false;
   }
   o.refreshStyle();
}
MO.FDuiTreeNode_extend = function FDuiTreeNode_extend(p){
   var o = this;
   var t = o._tree;
   if(!o._statusLoaded && o._child){
      if(t.__loading){
         return;
      }
      t.loadNode(o);
   }else{
      if(o._hImage && !o.hasChild()){
         o._hImage.src = MO.RResource.iconPath(t._iconNode);
         return false;
      }
      o._extended = p;
      if(o._child && o._hImage){
         o._hImage.src = MO.RResource.iconPath(p ? t._iconMinus : t._iconPlus);
      }
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
   t.refresh();
}
MO.FDuiTreeNode_extendAll = function FDuiTreeNode_extendAll(p){
   var o = this;
   o.extend(p);
   var cs = o._components;
   if(cs){
      var cc = cs.count();
      for(var i = 0; i < cc; i++){
         var c = cs.value(i);
         c.extendAll(p);
      }
   }
}
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
MO.FDuiTreeNode_createChild = function FDuiTreeNode_createChild(x){
   var r = null;
   if(x.isName('Node') || x.isName('TreeNode')){
      r = MO.Class.create(FDuiTreeNode);
      r._tree = this._tree;
   }
   return r;
}
MO.FDuiTreeNode_appendChild = function FDuiTreeNode_appendChild(control){
   var o = this;
   if(MO.Class.isClass(control, MO.FDuiTreeNodeCell)){
      o._hPanel.appendChild(control._hPanel);
   }
}
MO.FDuiTreeNode_appendNode = function FDuiTreeNode_appendNode(p){
   var o = this;
   var t = o._tree;
   o.push(p);
   t.appendNode(p, o);
   o.extend(true);
}
MO.FDuiTreeNode_push = function FDuiTreeNode_push(component){
   var o = this;
   var tree = o._tree;
   o.__base.FDuiContainer.push.call(o, component);
   if(MO.Class.isClass(component, MO.FDuiTreeNode)){
      o._child = true;
      o._statusLoaded = true;
      var nodes = o._nodes;
      if(!nodes){
         nodes = o._nodes = new MO.TObjects();
      }
      component._tree = tree;
      component._parent = o;
      nodes.push(component);
      tree._allNodes.pushUnique(component);
   }
   if(MO.Class.isClass(component, MO.FDuiTreeNodeCell)){
      var cells = o._cells;
      if(!cells){
         cells = o._cells = new MO.TDictionary();
      }
      component._parent = o;
      component._tree = tree;
      component._node = o;
      cells.set(component._column._name, component);
   }
}
MO.FDuiTreeNode_remove = function FDuiTreeNode_remove(component){
   var o = this;
   if(MO.Class.isClass(component, FDuiTreeNode)){
      o._nodes.remove(component);
   }
   o.__base.FDuiContainer.remove.call(o, component);
}
MO.FDuiTreeNode_removeSelf = function FDuiTreeNode_removeSelf(){
   var o = this;
   var tree = o._tree;
   if(o._statusLinked){
      o.removeChildren();
      var parent = o._parent;
      if(MO.Class.isClass(parent, FDuiTreeNode)){
         parent.remove(o);
         parent.calculateImage();
      }
      tree.freeNode(o);
   }
}
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
MO.FDuiTreeNode_reset = function FDuiTreeNode_reset(){
   var o = this;
   o._typeCode = null;
   o._guid = null;
   o._valid = true;
   o._icon = null;
   o._tag = null;
   o._note = null;
   o._child = false;
   o._checked = false;
   o._extended = true;
   o._statusLinked = false;
   o._statusDisplay = true;
   o._statusHover = false;
   o._extended = false;
   o._statusSelected = false;
   o._statusLoaded = false;
   o._level = 0;
}
MO.FDuiTreeNode_click = function FDuiTreeNode_click(){
   var o = this;
   var tree = o._tree;
   tree.selectNode(o, true);
   tree.nodeClick(o);
}
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
MO.FDuiTreeNode_propertyLoad = function FDuiTreeNode_propertyLoad(x){
   var o = this;
   var t = o._tree;
   o.__base.FDuiContainer.propertyLoad.call(o, x);
   var attributes = o._attributes;
   if(attributes){
      attributes.append(x.attrs);
   }
   var ap = x.get('attributes')
   if(ap){
      o._attributes.unpack(ap);
   }
}
MO.FDuiTreeNode_propertySave = function FDuiTreeNode_propertySave(x){
   var o = this;
   o.__base.FDuiContainer.propertySave.call(o, x);
   var t = o.type();
   x.set('type_code', t._code);
   x.set('storage', t._storage);
}
MO.FDuiTreeNode_loadConfig = function FDuiTreeNode_loadConfig(x){
   var o = this;
   o.reset();
   o.propertyLoad(x);
   o.setLabel(o._label);
   o.setCheck(o._checked);
   o.setImage();
   o.setIcon(o._icon);
}
MO.FDuiTreeNode_dispose = function FDuiTreeNode_dispose(){
   var o = this;
   o._hNodePanel = null;
   o._hImage = null;
   o._hIcon = null;
   o._hCheck = null;
   o._hLabel = null;
   o.__base.FDuiContainer.dispose.call(o);
}
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
MO.FDuiTreeNode_reload = function FDuiTreeNode_reload(t){
   var o = this;
   if(t){
      o._tree.reload();
   }else{
      o._tree.reloadNode(o);
   }
}
MO.FDuiTreeNode_reloadParent = function FDuiTreeNode_reloadParent(){
   var o = this;
   if(o.parentNode){
      o._tree.reloadNode(o.parentNode);
   }else{
      o._tree.reload();
   }
}
MO.FDuiTreeNode_loadQuery = function FDuiTreeNode_loadQuery(x){
   var o = this;
   var sl = MO.Lang.String.nvl(x.get('label'), o._label);
   var sn = MO.Lang.String.nvl(x.get('note'), o._note);
   var text = '&nbsp;' + sl;
   if(!MO.Lang.String.isEmpty(sn)){
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
MO.FDuiTreeNode_pushChanged = function FDuiTreeNode_pushChanged(trd){
   var o = this;
    var d = new MO.TNode();
    d.attrs = o._attributes;
    if(d.attrs){
         d.attrs.set('checked', MO.Lang.Boolean.toString(o.check()));
    }
    trd.push(d);
   if(o.components && o.components.count > 0){
      var cc = o.components.count;
      for(var n = 0; n < cc; n++){
         var c = o.components.value(n);
         if(MO.Class.isClass(c, FDuiTreeNode)){
            c.pushChanged(trd);
         }
      }
   }
}
MO.FDuiTreeNode_checkChanged = function FDuiTreeNode_checkChanged(){
   var o = this;
   if(o._checked != o.check()){
      return true;
   }
   return false;
}
MO.FDuiTreeNode_getFullPath = function FDuiTreeNode_getFullPath(){
   var o = this;
   var path = '';
   if(o._label){
       path = o._label;
   }
    if(o.parent){
       var s = o.parent.getFullPath();
       if(!MO.Lang.String.isEmpty(s)){
           path = s + "/" + path;
       }
    }
    return path;
}
MO.FDuiTreeNodeCell = function FDuiTreeNodeCell(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._stylePanel           = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleCell            = MO.Class.register(o, new MO.AStyle('_styleCell', 'Cell'));
   o._tree                 = null;
   o._column               = null;
   o._level                = 0;
   o._node                 = null;
   o._listenersClick       = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   o._listenersDoubleClick = MO.Class.register(o, new MO.AListener('_listenersDoubleClick', MO.EEvent.DoubleClick));
   o._hImage               = null;
   o._hIcon                = null;
   o._hLabel               = null;
   o.onBuildPanel          = MO.FDuiTreeNodeCell_onBuildPanel;
   o.onBuild               = MO.FDuiTreeNodeCell_onBuild;
   o.onClick               = MO.Class.register(o, new MO.AEventClick('onClick'), MO.FDuiTreeNodeCell_onClick);
   o.onDoubleClick         = MO.Class.register(o, new MO.AEventDoubleClick('onDoubleClick'), MO.FDuiTreeNodeCell_onDoubleClick);
   o.construct             = MO.FDuiTreeNodeCell_construct;
   o.icon                  = MO.FDuiTreeNodeCell_icon;
   o.setIcon               = MO.FDuiTreeNodeCell_setIcon;
   o.get                   = MO.FDuiTreeNodeCell_get;
   o.set                   = MO.FDuiTreeNodeCell_set;
   return o;
}
MO.FDuiTreeNodeCell_onBuildPanel = function FDuiTreeNodeCell_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTableCell(p, o.styleName('Panel'));
}
MO.FDuiTreeNodeCell_onBuild = function FDuiTreeNodeCell_onBuild(p){
   var o = this;
   var t = o._tree;
   var r = o.__base.FDuiControl.onBuild.call(o, p);
   var h = o._hPanel;
   o.attachEvent('onClick', h);
   o.attachEvent('onDoubleClick', h);
}
MO.FDuiTreeNodeCell_onClick = function FDuiTreeNodeCell_onClick(event){
   var o = this;
   event.treeNode = o._node;
   event.treeColumn = o._column;
   event.treeNodeCell = o;
   o.processClickListener(p);
}
MO.FDuiTreeNodeCell_onDoubleClick = function FDuiTreeNodeCell_onDoubleClick(event){
   var o = this;
   event.treeNode = o._node;
   event.treeColumn = o._column;
   event.treeNodeCell = o;
   o.processDoubleClickListener(p);
}
MO.FDuiTreeNodeCell_construct = function FDuiTreeNodeCell_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
   o._attributes = new MO.TAttributes();
}
MO.FDuiTreeNodeCell_icon = function FDuiTreeNodeCell_icon(){
   return o._icon;
}
MO.FDuiTreeNodeCell_setIcon = function FDuiTreeNodeCell_setIcon(p){
   var o = this;
   var h = o._hIcon;
   if(!h){
      h = o._hIcon = MO.Window.Builder.appendIcon(o._hPanel, null, null, 16, 16)
   }
   h.src = MO.RResource.iconPath(p);
}
MO.FDuiTreeNodeCell_get = function FDuiTreeNodeCell_get(){
}
MO.FDuiTreeNodeCell_set = function FDuiTreeNodeCell_set(p){
}
MO.FDuiTreeNodeType = function FDuiTreeNodeType(o){
   o = MO.Class.inherits(this, o, MO.FDuiComponent);
   o._code       = MO.Class.register(o, [new MO.APtyString('_code'), new MO.AGetSet('_code')]);
   o._storage    = MO.Class.register(o, [new MO.APtyString('_storage'), new MO.AGetSet('_storage')]);
   o._icon       = MO.Class.register(o, [new MO.APtyString('_icon'), new MO.AGetSet('_icon')]);
   o._service    = MO.Class.register(o, [new MO.APtyString('_service'), new MO.AGetSet('_service')]);
   o._action     = MO.Class.register(o, [new MO.APtyString('_action'), new MO.AGetSet('_action')]);
   o._attributes = MO.Class.register(o, [new MO.APtyAttributes('_attributes'), MO.AGetter('_attributes')]);
   o.construct   = MO.FDuiTreeNodeType_construct;
   o.get         = MO.FDuiTreeNodeType_get;
   o.set         = MO.FDuiTreeNodeType_set;
   o.innerDump   = MO.FDuiTreeNodeType_innerDump;
   return o;
}
MO.FDuiTreeNodeType_construct = function FDuiTreeNodeType_construct(){
   var o = this;
   o.__base.FDuiComponent.construct.call(o);
}
MO.FDuiTreeNodeType_get = function FDuiTreeNodeType_get(name){
   var attributes = this._attributes;
   return attributes ? attributes.get(name) : null;
}
MO.FDuiTreeNodeType_set = function FDuiTreeNodeType_set(name, value){
   var attributes = this._attributes;
   if(attributes){
      attributes.set(name, value)
   }
}
MO.FDuiTreeNodeType_innerDump = function FDuiTreeNodeType_innerDump(info){
   var o = this;
   info.append(MO.Class.dump(o));
   info.append('[code=',  o._code);
   info.append(', icon=',  o._icon);
   info.append(', service=', o._service);
   info.append(', action=', o._action);
   info.append(']');
}
MO.FDuiTreeView = function FDuiTreeView(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._optionCheck        = MO.Class.register(o, new MO.APtyBoolean('_optionCheck'), false);
   o._indent             = MO.Class.register(o, new MO.APtyInteger('_indent'), 16);
   o._stylePanel         = MO.Class.register(o, new MO.AStyle('_stylePanel', 'Panel'));
   o._styleNodePanel     = MO.Class.register(o, new MO.AStyle('_styleNodePanel', 'NodePanel'));
   o._styleNodeForm      = MO.Class.register(o, new MO.AStyle('_styleNodeForm', 'NodeForm'));
   o._attributes         = null;
   o._nodeTypes          = null;
   o._nodeColumns        = null;
   o._nodeLevels         = null;
   o._nodes              = null;
   o._allNodes           = null;
   o._defaultNodeType    = null;
   o._focusNode          = null;
   o._loadingNode        = null;
   o._freeNodes          = null;
   o._iconPlus           = 'control.treeview.plus';
   o._iconMinus          = 'control.treeview.minus';
   o._iconNode           = 'control.treeview.node';
   o._iconLoading        = 'control.treeview.loading';
   o._hNodePanel         = null;
   o._hNodeForm          = null;
   o._hHeadLine          = null;
   o._hNodeRows          = null;
   o.lsnsEnter           = new MO.TListeners();
   o.lsnsLeave           = new MO.TListeners();
   o._listenersNodeClick = MO.Class.register(o, new MO.AListener('_listenersNodeClick', MO.EEvent.NodeClick));
   o.onBuildPanel        = MO.FDuiTreeView_onBuildPanel;
   o.onBuild             = MO.FDuiTreeView_onBuild;
   o.onNodeClick         = MO.FDuiTreeView_onNodeClick;
   o.onClick             = MO.Class.register(o, new MO.AEventClick('onClick'), MO.FDuiTreeView_onClick);
   o.onNodeCheckClick    = MO.Class.register(o, new MO.AEventClick('onNodeCheckClick'), MO.FDuiTreeView_onNodeCheckClick);
   o.construct           = MO.FDuiTreeView_construct;
   o.attributes          = MO.FDuiTreeView_attributes;
   o.nodeTypes           = MO.FDuiTreeView_nodeTypes;
   o.nodeColumns         = MO.FDuiTreeView_nodeColumns;
   o.nodeLevels          = MO.FDuiTreeView_nodeLevels;
   o.hasNode             = MO.FDuiTreeView_hasNode;
   o.focusNode           = MO.FDuiTreeView_focusNode;
   o.nodes               = MO.FDuiTreeView_nodes;
   o.findType            = MO.FDuiTreeView_findType;
   o.findByName          = MO.FDuiTreeView_findByName;
   o.findByGuid          = MO.FDuiTreeView_findByGuid;
   o.createChild         = MO.FDuiTreeView_createChild;
   o.createNode          = MO.FDuiTreeView_createNode;
   o.appendChild         = MO.FDuiTreeView_appendChild;
   o.appendNode          = MO.FDuiTreeView_appendNode;
   o.appendNodes         = MO.FDuiTreeView_appendNodes;
   o.selectNode          = MO.FDuiTreeView_selectNode;
   o.push                = MO.FDuiTreeView_push;
   o.removeNode          = MO.FDuiTreeView_removeNode;
   o.removeNodes         = MO.FDuiTreeView_removeNodes;
   o.freeNode            = MO.FDuiTreeView_freeNode;
   o.clearNodes          = MO.FDuiTreeView_clearNodes;
   o.nodeClick           = MO.FDuiTreeView_nodeClick;
   o.calculateHeight     = MO.FDuiTreeView_calculateHeight;
   o.fetchChangedChecks  = MO.FDuiTreeView_fetchChangedChecks;
   o.extendAuto          = MO.FDuiTreeView_extendAuto;
   o.extendAll           = MO.FDuiTreeView_extendAll;
   o.loadNode            = MO.Method.empty;
   o.refresh             = MO.FDuiTreeView_refresh;
   o.filterNode          = MO.FDuiTreeView_filterNode;
   o.clearAllNodes       = MO.FDuiTreeView_clearAllNodes;
   o.clear               = MO.FDuiTreeView_clear;
   o.dispose             = MO.FDuiTreeView_dispose;
   return o;
}
MO.FDuiTreeView_onBuildPanel = function FDuiTreeView_onBuildPanel(e){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(e.hDocument, o.styleName('Panel'));
}
MO.FDuiTreeView_onBuild = function FDuiTreeView_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event);
   var hPanel = o._hPanel;
   o.attachEvent('onClick', hPanel);
   var hr = MO.Window.Builder.appendTableRow(o._hPanel);
   var hc = MO.Window.Builder.appendTableCell(hr);
   var hnp = o._hNodePanel = MO.Window.Builder.appendDiv(hc, o.styleName('NodePanel'));
   var hnf = o._hNodeForm = MO.Window.Builder.appendTable(hnp, o.styleName('NodeForm'));
   hnf.width = '100%';
   o._hHeadLine = MO.Window.Builder.appendTableRow(hnf);
   o._hNodeRows = hnf.children[0];
   var node = o._loadingNode = MO.Class.create(MO.FDuiTreeNode);
   node._tree = o;
   node._label = MO.RContext.get('FDuiTreeView:loading');
   node._icon = o._iconLoading;
   node.build(event);
   var ns = o._nodes;
   if(!ns.isEmpty()){
      var nc = ns.count();
      for(var i = 0; i < nc; i++){
         o.appendNode(ns.get(i));
      }
   }
   o.extendAuto();
}
MO.FDuiTreeView_onNodeClick = function FDuiTreeView_onNodeClick(event){
   var o = this;
}
MO.FDuiTreeView_onClick = function FDuiTreeView_onClick(s, e){
   var o = this;
   if(s.hSender == o._hNodePanel){
      var node = o._focusNode;
      if(node){
         node.select(false);
         o._focusNode = null;
      }
   }
}
MO.FDuiTreeView_onNodeCheckClick = function FDuiTreeView_onNodeCheckClick(s, e){
   var o = this;
   if(s && MO.Class.isClass(s, FDuiTreeNode)){
      var f = s.check();
      var cs = s.controls;
      if(cs){
         for(var n = 0; n < cs.count; n++){
            var nd = cs.value(n);
            if(nd && MO.Class.isClass(nd, FDuiTreeNode)){
               nd.setCheck(f);
            }
         }
      }
      var p = s.parentNode;
      while(p){
         if(f){
            p.setCheck(f);
            p = p.parentNode;
         }else{
            var pcs = p.controls;
            var pcc = pcs.count;
            for(var n = 0; n < pcc; n++){
              var pnd = pcs.value(n);
               if(pnd && MO.Class.isClass(pnd, FDuiTreeNode)){
                  if(pnd.check()){
                     return;
                  }
               }
            }
            p.setCheck(false);
            p = p.parentNode;
         }
      }
   }
}
MO.FDuiTreeView_construct = function FDuiTreeView_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   o._attributes = new MO.TAttributes();
   o._nodeTypes = new MO.TDictionary();
   o._nodeColumns = new MO.TDictionary();
   o._nodeLevels = new MO.TDictionary();
   o._nodes = new MO.TObjects();
   o._allNodes = new MO.TObjects();
   o._freeNodes = new MO.TObjects();
   o._defaultNodeType = MO.Class.create(MO.FDuiTreeNodeType);
}
MO.FDuiTreeView_attributes = function FDuiTreeView_attributes(){
   return this._attributes;
}
MO.FDuiTreeView_nodeTypes = function FDuiTreeView_nodeTypes(){
   return this._nodeTypes;
}
MO.FDuiTreeView_nodeColumns = function FDuiTreeView_nodeColumns(){
   return this._nodeColumns;
}
MO.FDuiTreeView_nodeLevels = function FDuiTreeView_nodeLevels(){
   return this._nodeLevels;
}
MO.FDuiTreeView_hasNode = function FDuiTreeView_hasNode(){
   return this._rootNode.hasChild();
}
MO.FDuiTreeView_focusNode = function FDuiTreeView_focusNode(){
   return this._focusNode;
}
MO.FDuiTreeView_nodes = function FDuiTreeView_nodes(){
   return this._nodes;
}
MO.FDuiTreeView_findType = function FDuiTreeView_findType(p){
   return this._nodeTypes.get(p);
}
MO.FDuiTreeView_findByName = function FDuiTreeView_findByName(p){
   var o = this;
   var ns = o._allNodes;
   var c = ns.count();
   if(c){
      for(var i = 0; i < c; i++){
         var n = ns.get(i);
         if(n._name == p){
            return n;
         }
      }
   }
}
MO.FDuiTreeView_findByGuid = function FDuiTreeView_findByGuid(guid){
   var o = this;
   var nodes = o._allNodes;
   var count = nodes.count();
   if(count){
      for(var i = 0; i < count; i++){
         var node = nodes.getAt(i);
         if(node._guid == guid){
            return node;
         }
      }
   }
}
MO.FDuiTreeView_createChild = function FDuiTreeView_createChild(x){
   var o = this;
   var r = null;
   var n = x.name();
   switch(n){
      case 'TreeColumn':
         r = MO.Class.create(MO.FDuiTreeColumn);
         break;
      case 'TreeLevel':
         r = MO.Class.create(MO.FDuiTreeLevel);
         break;
      case 'TreeNodeType':
         r = MO.Class.create(MO.FDuiTreeNodeType);
         break;
      case 'TreeNode':
         r = MO.Class.create(MO.FDuiTreeNode);
         break;
      default:
         throw new MO.TError(o, 'Unknown child type. (config={1})', x.xml());
   }
   r._tree = o;
   return r;
}
MO.FDuiTreeView_appendChild = function FDuiTreeView_appendChild(child){
   var o = this;
}
MO.FDuiTreeView_createNode = function FDuiTreeView_createNode(){
   var o = this;
   var node = o._freeNodes.pop();
   if(!node){
      node = MO.Class.create(MO.FDuiTreeNode);
      node._tree = o;
      node.build(o._hPanel);
   }
   MO.Window.Html.visibleSet(node._hPanel, true);
   o._allNodes.push(node);
   return node;
}
MO.FDuiTreeView_appendNode = function FDuiTreeView_appendNode(node, parent){
   var o = this;
   if(node._statusLinked){
      return;
   }
   var hPanel = node._hPanel;
   if(parent){
      var nl = parent.searchLast();
      var nr = nl._hPanel.rowIndex;
      if(hPanel.parentElement){
         if(hPanel.rowIndex > nr){
            nr++;
         }
         MO.Window.Html.tableMoveRow(o._hNodeForm, hPanel.rowIndex, nr);
      }else{
         o._hNodeRows.appendChild(hPanel);
         MO.Window.Html.tableMoveRow(o._hNodeForm, hPanel.rowIndex, nr+1);
      }
      node.setLevel(parent._level + 1);
   }else{
      o._hNodeRows.appendChild(hPanel);
      node.setLevel(0);
   }
   node._statusLinked = true;
}
MO.FDuiTreeView_appendNodes = function FDuiTreeView_appendNodes(parent, config){
   parent = MO.RObject.nvl(parent, this.workNode, this.rootNode);
   if(config && config._nodes){
      var count = config._nodes.count;
      if(count > 0){
         parent.child = true;
         parent.loaded = true;
         for(var n = 0; n < count; n++){
            var nc = config._nodes.get(n);
            if(nc && (nc.isName('Node') || nc.isName('TreeNode'))){
               var tn = MO.Class.create(FDuiTreeNode);
               tn.parent = parent;
               tn._tree = this;
               tn.loadConfig(nc);
               if(nc._nodes){
                  tn.icon = 'ctl.FBrowser_Folder';
               }else{
                  tn.icon = 'ctl.FBrowser_Txt';
               }
               tn.build(0);
               tn.hide();
               if(nc._nodes){
                  this.tempAppendNodes(tn, nc);
               }
               parent.push(tn);
               this._allNodes.push(tn);
            }
         }
      }
   }
   this.rootNode.extend(true);
}
MO.FDuiTreeView_selectNode = function FDuiTreeView_selectNode(n, s){
   var o = this;
   var fn = o._focusNode;
   if(s){
      if(n){
         if(fn){
            if(fn == n){
               return;
            }
            if(n.isFolder()){
               fn.select(true);
            }else{
               fn.select(false);
            }
         }
         if(!n.isFolder()){
            n.select(true);
            o._focusNode = n;
         }
      }
   }else{
      if(n){
         n.select(false);
      }
      if(fn){
         fn.select(false);
      }
   }
}
MO.FDuiTreeView_push = function FDuiTreeView_push(control){
   var o = this;
   o.__base.FDuiContainer.push.call(o, control);
   control._tree = o;
   if(MO.Class.isClass(control, MO.FDuiTreeColumn)){
      o._nodeColumns.set(control.name(), control);
   }else if(MO.Class.isClass(control, MO.FDuiTreeLevel)){
      o._nodeLevels.set(control.id(), control);
   }else if(MO.Class.isClass(control, MO.FDuiTreeNodeType)){
      o._nodeTypes.set(control.code(), control);
   }else if(MO.Class.isClass(control, MO.FDuiTreeNode)){
      o._nodes.push(control);
      o._allNodes.push(control);
      o.appendNode(control);
   }
}
MO.FDuiTreeView_removeNode = function FDuiTreeView_removeNode(oNode){
   var o = this;
   if(oNode){
      var nodes = new Array();
      var oLoopNode = null;
      var nCount = this._allNodes.length;
      for(var n=0; n<nCount; n++){
         oLoopNode = this._allNodes[n];
         if(oLoopNode != oNode){
            nodes[nodes.length] = oLoopNode;
         }
      }
      o._allNodes = nodes;
      var oParent = oNode.parent;
      if(oParent){
         nodes = new Array();
         nCount = oParent._nodes.length;
         for(var n=0; n<nCount; n++){
            oLoopNode = oParent._nodes[n];
            if(oLoopNode != oNode){
               nodes[nodes.length] = oLoopNode;
            }
         }
         oParent._nodes = nodes;
         oNode.parent.childrenHTML.removeChild(oNode.ownerHTML);
      }
      if(oParent._nodes.length == 0){
         oParent.imageHTML.src = o.imgEmpty;
      }
      return true;
   }
   return false;
}
MO.FDuiTreeView_removeNodes = function FDuiTreeView_removeNodes(node){
   var o = this;
   node = MO.RObject.nvl(node, o.workNode, o.rootNode);
   if(node.hasChild()){
      node.removeChildren();
   }
   node.remove();
}
MO.FDuiTreeView_freeNode = function FDuiTreeView_freeNode(node){
   var o = this;
   if(node._statusLinked){
      node._statusLinked = false;
      o._hNodeRows.removeChild(node._hPanel);
      var cells = node.cells();
      if(cells){
         var cellCount = cells.count();
         for(var i = 0; i < cellCount; i++){
            var cell = cells.at(i);
            cell.clearAllListeners();
         }
      }
      o._allNodes.remove(node);
      o._freeNodes.push(node);
   }
}
MO.FDuiTreeView_clearNodes = function FDuiTreeView_clearNodes(node){
   var o = this;
   if(node){
      node.removeChildren();
   }
   var nodes = new Array();
   var oLoopNode = null;
   var nCount = o._allNodes.length;
   for(var n = 0; n < nCount; n++){
      oLoopNode = o._allNodes[n];
      if(oLoopNode.parent != oNode){
         nodes[nodes.length] = oLoopNode;
      }else{
      oNode.childrenHTML.removeChild(oLoopNode.ownerHTML);
      }
   }
   oNode.imageHTML.src = o.imgEmpty ;
   o._allNodes = nodes;
   return true;
}
MO.FDuiTreeView_nodeClick = function FDuiTreeView_nodeClick(node){
   var o = this;
   var event = new MO.SEvent();
   event.tree = o;
   event.node = node;
   o.onNodeClick(event);
   o.processNodeClickListener(event);
   event.dispose();
}
MO.FDuiTreeView_calculateHeight = function FDuiTreeView_calculateHeight(){
   var o = this;
   var ns = o._allNodes;
   var c = ns.count();
   for(var i = 0; i < c; i++){
      var n = ns.get(i);
      if(MO.RHtml.displayGet(n._hPanel)){
         c++;
      }
   }
   return c * 29;
}
MO.FDuiTreeView_fetchChangedChecks = function FDuiTreeView_fetchChangedChecks(){
   var o = this;
   var treeView = new MO.TNode('TreeView');
   treeView.set('name', o.name);
   var rnd = MO.RObject.nvl(o.rootNode, o);
   var cs = rnd.controls;
   for(var n = 0; n < cs.count; n++){
      var c = cs.value(n);
      c.pushChanged(treeView);
   }
   return treeView;
}
MO.FDuiTreeView_extendAuto = function FDuiTreeView_extendAuto(n){
   var o = this;
   var ns = n ? n._nodes : o._nodes;
   if(ns){
      var nc = ns.count;
      if(nc){
         for(var i = 0; i < nc; i++){
            var fn = ns.get(i);
            fn.extend(fn._extended);
            if(fn._extended){
               o.extendAuto(fn);
            }
         }
      }
   }
}
MO.FDuiTreeView_extendAll = function FDuiTreeView_extendAll(n, f){
   var o = this;
   var ns = n ? n._nodes : o._nodes;
   if(ns){
      var nc = ns.count();
      if(nc){
         for(var i = 0; i < nc; i++){
            var fn = ns.get(i);
            fn.extend(f);
            o.extendAll(fn, f);
         }
      }
   }
}
MO.FDuiTreeView_refresh = function FDuiTreeView_refresh(){
   var o = this;
   if(o.parentObj){
      o.parentObj.style.height = o.calculateHeight();
   }
}
MO.FDuiTreeView_filterNode = function FDuiTreeView_filterNode(pl, pa){
   var o = this;
   var nc = o._allNodes.count();
   var nl = null;
   var na = null;
   if(!pl){
      for(var i = 0; i < nc; i++){
         var n = o._allNodes.get(i);
         if(!n.isDelete){
            n.show(true);
         }
      }
   }else{
      label = label.toLowerCase();
      var arAttr = null;
      var nAttrCount = 0;
      if(pa){
         pa = pa.toLowerCase();
         arAttr = pa.split("|");
         nAttrCount = arAttr.length;
      }
      for(var i = 0; i < nc; i++){
         var n = o._allNodes.get(i);
         if(!n.isDelete){
            nl = n.label.toLowerCase();
            if(arAttr){
               na = n.linkAttr.toLowerCase();
               for(var s = 0; s < nAttrCount; s++){
                  if(na.indexOf(arAttr[s]) != -1){
                     n.show((nl.indexOf(label) != -1));
                     break;
                  }
               }
            }else{
               n.show((nl.indexOf(label) != -1));
            }
         }
      }
   }
}
MO.FDuiTreeView_clearAllNodes = function FDuiTreeView_clearAllNodes(){
   var o = this;
   var nodes = o._nodes;
   if(nodes){
      var count = nodes.count();
      for(var i = count - 1; i >= 0; i--){
         nodes.get(i).removeSelf();
      }
      nodes.clear();
   }
   o._allNodes.clear();
}
MO.FDuiTreeView_clear = function FDuiTreeView_clear(){
   var o = this;
   o.clearAllNodes();
}
MO.FDuiTreeView_dispose = function FDuiTreeView_dispose(){
   var o = this;
   o.__base.FDuiContainer.dispose.call(o);
   var ns = o._nodes;
   if(ns){
      ns.dispose();
      o._nodes = null;
   }
   var ns = o._allNodes;
   if(ns){
      ns.dispose();
      o._allNodes = null;
   }
   o._hNodePanel = null;
   o._hNodeForm = null;
   o._hHeadLine = null;
   return true;
}
