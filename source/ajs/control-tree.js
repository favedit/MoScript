MO.EUiTreeNodeGroup = new function EUiTreeNodeGroup(){
   var o = this;
   o.Container = 'container';
   o.Item      = 'item';
   return o;
}
with(MO){
   MO.FUiTreeColumn = function FUiTreeColumn(o){
      o = RClass.inherits(this, o, FDuiControl);
      o._icon        = RClass.register(o, new APtyString('_icon'));
      o._dataName    = RClass.register(o, new APtyString('_dataName'));
      o._display     = RClass.register(o, new APtyBoolean('_display'), EBoolean.False);
      o._config      = RClass.register(o, new APtyConfig('_config'));
      o.oeBuild      = FUiTreeColumn_oeBuild;
      o.onBuildPanel = FUiTreeColumn_onBuildPanel;
      return o;
   }
   MO.FUiTreeColumn_oeBuild = function FUiTreeColumn_oeBuild(event){
      var o = this;
      var r = o.__base.FDuiControl.oeBuild.call(o, event);
      var h = o.hPanel;
      h.innerText = RString.nvl(o.label);
      h.noWrap = true;
      if(!o.display){
         h.style.display = 'block';
      }
      if(o.width){
         h.width = o.width;
      }
      return EEventStatus.Stop;
   }
   MO.FUiTreeColumn_onBuildPanel = function FUiTreeColumn_onBuildPanel(){
      this.hPanel = RBuilder.create(null, 'TD');
   }
}
with(MO){
   MO.FUiTreeLevel = function FUiTreeLevel(o){
      o = RClass.inherits(this, o, FDuiControl);
      o._id        = RClass.register(o, new APtyString('_id'));
      o._color     = RClass.register(o, new APtyString('_color'));
      o._backColor = RClass.register(o, new APtyString('_backColor'));
      return o;
   }
}
with(MO){
   MO.FUiTreeNode = function FUiTreeNode(o){
      o = RClass.inherits(this, o, FDuiContainer, MUiDataProperties);
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
      o._styleNormal      = RClass.register(o, new AStyle('_styleNormal'));
      o._styleHover       = RClass.register(o, new AStyle('_styleHover'));
      o._styleSelect      = RClass.register(o, new AStyle('_styleSelect'));
      o._styleImage       = RClass.register(o, new AStyle('_styleImage'));
      o._styleIcon        = RClass.register(o, new AStyle('_styleIcon'));
      o._styleIconDisable = RClass.register(o, new AStyle('_styleIconDisable'));
      o._styleLabel       = RClass.register(o, new AStyle('_styleLabel'));
      o._styleCell        = RClass.register(o, new AStyle('_styleCell'));
      o._tree             = RClass.register(o, new AGetSet('_tree'));
      o._level            = RClass.register(o, new AGetter('_level'), 0);
      o._nodes            = RClass.register(o, new AGetter('_nodes'));
      o._cells            = RClass.register(o, new AGetter('_cells'));
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
      o.onBuildPanel      = FUiTreeNode_onBuildPanel;
      o.onBuild           = FUiTreeNode_onBuild;
      o.onNodeEnter       = RClass.register(o, new AEventMouseEnter('onNodeEnter'), FUiTreeNode_onNodeEnter);
      o.onNodeLeave       = RClass.register(o, new AEventMouseLeave('onNodeLeave'), FUiTreeNode_onNodeLeave);
      o.onNodeClick       = RClass.register(o, new AEventClick('onNodeClick'), FUiTreeNode_onNodeClick);
      o.construct         = FUiTreeNode_construct;
      o.type              = FUiTreeNode_type;
      o.setTypeCode       = FUiTreeNode_setTypeCode;
      o.setLabel          = FUiTreeNode_setLabel;
      o.setNote           = FUiTreeNode_setNote;
      o.setLevel          = FUiTreeNode_setLevel;
      o.cell              = FUiTreeNode_cell;
      o.check             = FUiTreeNode_check;
      o.setCheck          = FUiTreeNode_setCheck;
      o.setImage          = FUiTreeNode_setImage;
      o.calculateImage    = FUiTreeNode_calculateImage;
      o.setIcon           = FUiTreeNode_setIcon;
      o.get               = FUiTreeNode_get;
      o.set               = FUiTreeNode_set;
      o.isFolder          = FUiTreeNode_isFolder;
      o.hasChild          = FUiTreeNode_hasChild;
      o.topNode           = FUiTreeNode_topNode;
      o.topNodeByType     = FUiTreeNode_topNodeByType;
      o.nodeCount         = FUiTreeNode_nodeCount;
      o.show              = FUiTreeNode_show;
      o.hide              = FUiTreeNode_hide;
      o.select            = FUiTreeNode_select;
      o.extend            = FUiTreeNode_extend;
      o.extendAll         = FUiTreeNode_extendAll;
      o.searchLast        = FUiTreeNode_searchLast;
      o.createChild       = FUiTreeNode_createChild;
      o.appendChild       = FUiTreeNode_appendChild;
      o.appendNode        = FUiTreeNode_appendNode;
      o.push              = FUiTreeNode_push;
      o.remove            = FUiTreeNode_remove;
      o.removeSelf        = FUiTreeNode_removeSelf;
      o.removeChildren    = FUiTreeNode_removeChildren;
      o.reset             = FUiTreeNode_reset;
      o.click             = FUiTreeNode_click;
      o.refreshStyle      = FUiTreeNode_refreshStyle;
      o.propertyLoad      = FUiTreeNode_propertyLoad;
      o.propertySave      = FUiTreeNode_propertySave;
      o.loadConfig        = FUiTreeNode_loadConfig;
      o.dispose           = FUiTreeNode_dispose;
      o.innerDump         = FUiTreeNode_innerDump;
      return o;
   }
   MO.FUiTreeNode_onBuildPanel = function FUiTreeNode_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
   }
   MO.FUiTreeNode_onBuild = function FUiTreeNode_onBuild(p){
      var o = this;
      var t = o._tree;
      var r = o.__base.FDuiContainer.onBuild.call(o, p);
      var hp = o._hPanel;
      o.attachEvent('onNodeEnter', hp, o.onNodeEnter);
      o.attachEvent('onNodeLeave', hp, o.onNodeLeave);
      o.attachEvent('onNodeClick', hp);
      var hnp = o._hNodePanel = RBuilder.appendTableCell(hp, o.styleName('Normal'));
      hnp.noWrap = true;
      var hi = o._hImage = RBuilder.appendIcon(hnp, o.styleName('Image'), null, 16, 16);
      hi._linkType = 'image';
      o.setImage();
      var hi = o._hIcon = RBuilder.appendIcon(hnp, null, null, 16, 16)
      hi._linkType = 'icon';
      o.setIcon(o._icon);
      if(t.dispChecked){
         var hc = o._hCheck = RBuilder.appendCheck(hnp);
         hc.width = 13;
         hc.height = 13;
         hc.style.borderWidth = 0;
         o.setCheck(o._checked);
         t.linkEvent(o, 'onNodeCheckClick', hc);
      }
      o._hLabel = RBuilder.appendText(hnp, o.styleName('Label'));
      o.setLabel(o._label);
      var cs = t._nodeColumns;
      if(cs){
         var cc = cs.count();
         for(var n = 0; n < cc; n++){
            var c = cs.value(n);
            var nc = RClass.create(FUiTreeNodeCell);
            nc._column = c;
            nc.build(p);
            o.push(nc);
         }
      }
   }
   MO.FUiTreeNode_onNodeEnter = function FUiTreeNode_onNodeEnter(e){
      var o = this;
      var t = o._tree;
      if(!t._focusNode || (t._focusNode && (t._focusNode != o))){
         o._statusHover = true;
         o.refreshStyle();
         t.lsnsEnter.process(t, o);
      }
   }
   MO.FUiTreeNode_onNodeLeave = function FUiTreeNode_onNodeLeave(event){
      var o = this;
      var tree = o._tree;
      if(!tree._focusNode || (tree._focusNode && (tree._focusNode != o))){
         o._statusHover = false;
         o.refreshStyle();
         tree.lsnsLeave.process(tree, o);
      }
   }
   MO.FUiTreeNode_onNodeClick = function FUiTreeNode_onNodeClick(event){
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
   MO.FUiTreeNode_construct = function FUiTreeNode_construct(){
      var o = this;
      o.__base.FDuiContainer.construct.call(o);
   }
   MO.FUiTreeNode_type = function FUiTreeNode_type(){
      var o = this;
      var t = o._tree;
      if(RString.isEmpty(o._typeCode)){
         return null;
      }
      return t.findType(o._typeCode);
   }
   MO.FUiTreeNode_setTypeCode = function FUiTreeNode_setTypeCode(value){
      var o = this;
      o._typeCode = value;
      o.setIcon();
   }
   MO.FUiTreeNode_setLabel = function FUiTreeNode_setLabel(p){
      var o = this;
      o.__base.FDuiContainer.setLabel.call(o, p)
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
   MO.FUiTreeNode_setNote = function FUiTreeNode_setNote(p){
      var o = this;
      o._note = RString.empty(p);
      o.setLabel(o._label);
   }
   MO.FUiTreeNode_setLevel = function FUiTreeNode_setLevel(level){
      var o = this;
      o._level = level;
      var hPanel = o._hNodePanel;
      if(hPanel){
         hPanel.style.paddingLeft = (o._tree._indent * level) + 'px';
      }
   }
   MO.FUiTreeNode_cell = function FUiTreeNode_cell(p){
      return this._cells.get(p);
   }
   MO.FUiTreeNode_check = function FUiTreeNode_check(){
      return this._checked;
   }
   MO.FUiTreeNode_setCheck = function FUiTreeNode_setCheck(p){
      var o = this;
      o._checked = p;
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
   MO.FUiTreeNode_setImage = function FUiTreeNode_setImage(){
      var o = this;
      var tree = o._tree;
      var hImage = o._hImage;
      var icon = o._child ? tree._iconPlus : tree._iconNode;
      hImage.src = RResource.iconPath(icon);
   }
   MO.FUiTreeNode_calculateImage = function FUiTreeNode_calculateImage(){
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
   MO.FUiTreeNode_setIcon = function FUiTreeNode_setIcon(p){
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
   MO.FUiTreeNode_get = function FUiTreeNode_get(n){
      return this._attributes.get(n);
   }
   MO.FUiTreeNode_set = function FUiTreeNode_set(n, v){
      this._attributes.set(n, v);
   }
   MO.FUiTreeNode_isFolder = function FUiTreeNode_isFolder(){
      var o = this;
      var t = o.type();
      return t.storage() == 'collections';
   }
   MO.FUiTreeNode_hasChild = function FUiTreeNode_hasChild(){
      var o = this;
      if(o._child){
         var ns = o._nodes;
         if(ns){
            return !ns.isEmpty();
         }
      }
      return false;
   }
   MO.FUiTreeNode_topNode = function FUiTreeNode_topNode(){
      var r = this;
      while(r._parent){
         if(RClass.isClass(r._parent, FUiTreeNode)){
            r = r._parent;
         }else{
            break;
         }
      }
      return r;
   }
   MO.FUiTreeNode_topNodeByType = function FUiTreeNode_topNodeByType(t){
      var r = this;
      while(r){
         if(r._typeCode == t){
            return r;
         }
         r = r._parent;
      }
      return null;
   }
   MO.FUiTreeNode_nodeCount = function FUiTreeNode_nodeCount(){
      var o = this;
      var nodes = o._nodes
      if(nodes){
         return nodes.count();
      }
      return 0;
   }
   MO.FUiTreeNode_show = function FUiTreeNode_show(){
      var o = this;
      var tree = o._tree;
      RHtml.visibleSet(o._hPanel, true);
      var nodes = o._nodes;
      if(nodes){
         var count = nodes.count();
         for(var i = 0; i < count; i++){
            var node = nodes.at(i);
            if(!node._statusLinked){
               tree.appendNode(node, o);
            }
            if(node._statusDisplay){
               RHtml.visibleSet(node._hPanel, true);
               if(node._extended){
                  node.show();
               }
            }
         }
      }
   }
   MO.FUiTreeNode_hide = function FUiTreeNode_hide(){
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
   MO.FUiTreeNode_select = function FUiTreeNode_select(v){
      var o = this;
      o._statusSelected = v;
      if(v){
         o._statusHover = false;
      }
      o.refreshStyle();
   }
   MO.FUiTreeNode_extend = function FUiTreeNode_extend(p){
      var o = this;
      var t = o._tree;
      if(!o._statusLoaded && o._child){
         if(t.__loading){
            return;
         }
         t.loadNode(o);
      }else{
         if(o._hImage && !o.hasChild()){
            o._hImage.src = RResource.iconPath(t._iconNode);
            return false;
         }
         o._extended = p;
         if(o._child && o._hImage){
            o._hImage.src = RResource.iconPath(p ? t._iconMinus : t._iconPlus);
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
   MO.FUiTreeNode_extendAll = function FUiTreeNode_extendAll(p){
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
   MO.FUiTreeNode_searchLast = function FUiTreeNode_searchLast(){
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
   MO.FUiTreeNode_createChild = function FUiTreeNode_createChild(x){
      var r = null;
      if(x.isName('Node') || x.isName('TreeNode')){
         r = RClass.create(FUiTreeNode);
         r._tree = this._tree;
      }
      return r;
   }
   MO.FUiTreeNode_appendChild = function FUiTreeNode_appendChild(p){
      var o = this;
      if(RClass.isClass(p, FUiTreeNodeCell)){
         o._hPanel.appendChild(p._hPanel);
      }
   }
   MO.FUiTreeNode_appendNode = function FUiTreeNode_appendNode(p){
      var o = this;
      var t = o._tree;
      o.push(p);
      t.appendNode(p, o);
      o.extend(true);
   }
   MO.FUiTreeNode_push = function FUiTreeNode_push(component){
      var o = this;
      var tree = o._tree;
      o.__base.FDuiContainer.push.call(o, component);
      if(RClass.isClass(component, FUiTreeNode)){
         o._child = true;
         o._statusLoaded = true;
         var nodes = o._nodes;
         if(!nodes){
            nodes = o._nodes = new TObjects();
         }
         component._tree = tree;
         component._parent = o;
         nodes.push(component);
         tree._allNodes.pushUnique(component);
      }
      if(RClass.isClass(component, FUiTreeNodeCell)){
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
   MO.FUiTreeNode_remove = function FUiTreeNode_remove(component){
      var o = this;
      if(RClass.isClass(component, FUiTreeNode)){
         o._nodes.remove(component);
      }
      o.__base.FDuiContainer.remove.call(o, component);
   }
   MO.FUiTreeNode_removeSelf = function FUiTreeNode_removeSelf(){
      var o = this;
      var tree = o._tree;
      if(o._statusLinked){
         o.removeChildren();
         var parent = o._parent;
         if(RClass.isClass(parent, FUiTreeNode)){
            parent.remove(o);
            parent.calculateImage();
         }
         tree.freeNode(o);
      }
   }
   MO.FUiTreeNode_removeChildren = function FUiTreeNode_removeChildren(){
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
   MO.FUiTreeNode_reset = function FUiTreeNode_reset(){
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
   MO.FUiTreeNode_click = function FUiTreeNode_click(){
      var o = this;
      var tree = o._tree;
      tree.selectNode(o, true);
      tree.nodeClick(o);
   }
   MO.FUiTreeNode_refreshStyle = function FUiTreeNode_refreshStyle(){
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
   MO.FUiTreeNode_propertyLoad = function FUiTreeNode_propertyLoad(x){
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
   MO.FUiTreeNode_propertySave = function FUiTreeNode_propertySave(x){
      var o = this;
      o.__base.FDuiContainer.propertySave.call(o, x);
      var t = o.type();
      x.set('type_code', t._code);
      x.set('storage', t._storage);
   }
   MO.FUiTreeNode_loadConfig = function FUiTreeNode_loadConfig(x){
      var o = this;
      o.reset();
      o.propertyLoad(x);
      o.setLabel(o._label);
      o.setCheck(o._checked);
      o.setImage();
      o.setIcon(o._icon);
   }
   MO.FUiTreeNode_dispose = function FUiTreeNode_dispose(){
      var o = this;
      o._hNodePanel = null;
      o._hImage = null;
      o._hIcon = null;
      o._hCheck = null;
      o._hLabel = null;
      o.__base.FDuiContainer.dispose.call(o);
   }
   MO.FUiTreeNode_innerDump = function FUiTreeNode_innerDump(s){
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
   MO.FUiTreeNode_reload = function FUiTreeNode_reload(t){
      var o = this;
      if(t){
         o._tree.reload();
      }else{
         o._tree.reloadNode(o);
      }
   }
   MO.FUiTreeNode_reloadParent = function FUiTreeNode_reloadParent(){
      var o = this;
      if(o.parentNode){
         o._tree.reloadNode(o.parentNode);
      }else{
         o._tree.reload();
      }
   }
   MO.FUiTreeNode_loadQuery = function FUiTreeNode_loadQuery(x){
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
   MO.FUiTreeNode_findByName = function FUiTreeNode_findByName(n){
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
   MO.FUiTreeNode_findByUuid = function FUiTreeNode_findByUuid(u){
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
   MO.FUiTreeNode_pushChanged = function FUiTreeNode_pushChanged(trd){
      var o = this;
       var d = new TNode();
       d.attrs = o._attributes;
       if(d.attrs){
            d.attrs.set('checked', RBoolean.toString(o.check()));
       }
       trd.push(d);
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
   MO.FUiTreeNode_checkChanged = function FUiTreeNode_checkChanged(){
      var o = this;
      if(o._checked != o.check()){
         return true;
      }
      return false;
   }
   MO.FUiTreeNode_getFullPath = function FUiTreeNode_getFullPath(){
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
with(MO){
   MO.FUiTreeNodeCell = function FUiTreeNodeCell(o){
      o = RClass.inherits(this, o, FDuiControl, MListenerClick, MListenerDoubleClick);
      o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
      o._styleCell        = RClass.register(o, new AStyle('_styleCell', 'Cell'));
      o._tree             = null;
      o._column           = null;
      o._level            = 0;
      o._node             = null;
      o._hImage           = null;
      o._hIcon            = null;
      o._hLabel           = null;
      o.onBuildPanel      = FUiTreeNodeCell_onBuildPanel;
      o.onBuild           = FUiTreeNodeCell_onBuild;
      o.onClick           = RClass.register(o, new AEventClick('onClick'), FUiTreeNodeCell_onClick);
      o.onDoubleClick     = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FUiTreeNodeCell_onDoubleClick);
      o.construct         = FUiTreeNodeCell_construct;
      o.icon              = FUiTreeNodeCell_icon;
      o.setIcon           = FUiTreeNodeCell_setIcon;
      o.get               = FUiTreeNodeCell_get;
      o.set               = FUiTreeNodeCell_set;
      return o;
   }
   MO.FUiTreeNodeCell_onBuildPanel = function FUiTreeNodeCell_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTableCell(p, o.styleName('Panel'));
   }
   MO.FUiTreeNodeCell_onBuild = function FUiTreeNodeCell_onBuild(p){
      var o = this;
      var t = o._tree;
      var r = o.__base.FDuiControl.onBuild.call(o, p);
      var h = o._hPanel;
      o.attachEvent('onClick', h);
      o.attachEvent('onDoubleClick', h);
   }
   MO.FUiTreeNodeCell_onClick = function FUiTreeNodeCell_onClick(p){
      var o = this;
      p.treeNode = o._node;
      p.treeColumn = o._column;
      p.treeNodeCell = o;
      o.processClickListener(p);
   }
   MO.FUiTreeNodeCell_onDoubleClick = function FUiTreeNodeCell_onDoubleClick(p){
      var o = this;
      p.treeNode = o._node;
      p.treeColumn = o._column;
      p.treeNodeCell = o;
      o.processDoubleClickListener(p);
   }
   MO.FUiTreeNodeCell_construct = function FUiTreeNodeCell_construct(){
      var o = this;
      o.__base.FDuiControl.construct.call(o);
      o._attributes = new TAttributes();
   }
   MO.FUiTreeNodeCell_icon = function FUiTreeNodeCell_icon(){
      return o._icon;
   }
   MO.FUiTreeNodeCell_setIcon = function FUiTreeNodeCell_setIcon(p){
      var o = this;
      var h = o._hIcon;
      if(!h){
         h = o._hIcon = RBuilder.appendIcon(o._hPanel, null, null, 16, 16)
      }
      h.src = RResource.iconPath(p);
   }
   MO.FUiTreeNodeCell_get = function FUiTreeNodeCell_get(){
   }
   MO.FUiTreeNodeCell_set = function FUiTreeNodeCell_set(p){
   }
}
with(MO){
   MO.FUiTreeNodeType = function FUiTreeNodeType(o){
      o = RClass.inherits(this, o, FDuiComponent);
      o._code       = RClass.register(o, [new APtyString('_code'), new AGetSet('_code')]);
      o._storage    = RClass.register(o, [new APtyString('_storage'), new AGetSet('_storage')]);
      o._icon       = RClass.register(o, [new APtyString('_icon'), new AGetSet('_icon')]);
      o._service    = RClass.register(o, [new APtyString('_service'), new AGetSet('_service')]);
      o._action     = RClass.register(o, [new APtyString('_action'), new AGetSet('_action')]);
      o._attributes = RClass.register(o, [new APtyAttributes('_attributes'), AGetter('_attributes')]);
      o.construct   = FUiTreeNodeType_construct;
      o.get         = FUiTreeNodeType_get;
      o.set         = FUiTreeNodeType_set;
      o.innerDump   = FUiTreeNodeType_innerDump;
      return o;
   }
   MO.FUiTreeNodeType_construct = function FUiTreeNodeType_construct(){
      var o = this;
      o.__base.FDuiComponent.construct.call(o);
   }
   MO.FUiTreeNodeType_get = function FUiTreeNodeType_get(name){
      var attributes = this._attributes;
      return attributes ? attributes.get(name) : null;
   }
   MO.FUiTreeNodeType_set = function FUiTreeNodeType_set(name, value){
      var attributes = this._attributes;
      if(attributes){
         attributes.set(name, value)
      }
   }
   MO.FUiTreeNodeType_innerDump = function FUiTreeNodeType_innerDump(s){
      var o = this;
      s.append(RClass.dump(o));
      s.append('[code=',  o._code);
      s.append(', icon=',  o._icon);
      s.append(', service=', o._service);
      s.append(', action=', o._action);
      s.append(']');
   }
}
with(MO){
   MO.FUiTreeView = function FUiTreeView(o){
      o = RClass.inherits(this, o, FDuiContainer);
      o._optionCheck        = RClass.register(o, new APtyBoolean('_optionCheck'), false);
      o._indent             = RClass.register(o, new APtyInteger('_indent'), 16);
      o._stylePanel         = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
      o._styleNodePanel     = RClass.register(o, new AStyle('_styleNodePanel', 'NodePanel'));
      o._styleNodeForm      = RClass.register(o, new AStyle('_styleNodeForm', 'NodeForm'));
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
      o.lsnsEnter           = new TListeners();
      o.lsnsLeave           = new TListeners();
      o._listenersNodeClick = RClass.register(o, new AListener('_listenersNodeClick', EEvent.NodeClick));
      o.onBuildPanel        = FUiTreeView_onBuildPanel;
      o.onBuild             = FUiTreeView_onBuild;
      o.onNodeClick         = FUiTreeView_onNodeClick;
      o.onClick             = RClass.register(o, new AEventClick('onClick'), FUiTreeView_onClick);
      o.onNodeCheckClick    = RClass.register(o, new AEventClick('onNodeCheckClick'), FUiTreeView_onNodeCheckClick);
      o.construct           = FUiTreeView_construct;
      o.attributes          = FUiTreeView_attributes;
      o.nodeTypes           = FUiTreeView_nodeTypes;
      o.nodeColumns         = FUiTreeView_nodeColumns;
      o.nodeLevels          = FUiTreeView_nodeLevels;
      o.hasNode             = FUiTreeView_hasNode;
      o.focusNode           = FUiTreeView_focusNode;
      o.nodes               = FUiTreeView_nodes;
      o.findType            = FUiTreeView_findType;
      o.findByName          = FUiTreeView_findByName;
      o.findByGuid          = FUiTreeView_findByGuid;
      o.createChild         = FUiTreeView_createChild;
      o.createNode          = FUiTreeView_createNode;
      o.appendChild         = FUiTreeView_appendChild;
      o.appendNode          = FUiTreeView_appendNode;
      o.appendNodes         = FUiTreeView_appendNodes;
      o.selectNode          = FUiTreeView_selectNode;
      o.push                = FUiTreeView_push;
      o.removeNode          = FUiTreeView_removeNode;
      o.removeNodes         = FUiTreeView_removeNodes;
      o.freeNode            = FUiTreeView_freeNode;
      o.clearNodes          = FUiTreeView_clearNodes;
      o.nodeClick           = FUiTreeView_nodeClick;
      o.calculateHeight     = FUiTreeView_calculateHeight;
      o.fetchChangedChecks  = FUiTreeView_fetchChangedChecks;
      o.extendAuto          = FUiTreeView_extendAuto;
      o.extendAll           = FUiTreeView_extendAll;
      o.loadNode            = RMethod.empty;
      o.refresh             = FUiTreeView_refresh;
      o.filterNode          = FUiTreeView_filterNode;
      o.clearAllNodes       = FUiTreeView_clearAllNodes;
      o.clear               = FUiTreeView_clear;
      o.dispose             = FUiTreeView_dispose;
      return o;
   }
   MO.FUiTreeView_onBuildPanel = function FUiTreeView_onBuildPanel(e){
      var o = this;
      o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
   }
   MO.FUiTreeView_onBuild = function FUiTreeView_onBuild(event){
      var o = this;
      o.__base.FDuiContainer.onBuild.call(o, event);
      var hPanel = o._hPanel;
      o.attachEvent('onClick', hPanel);
      var hr = RBuilder.appendTableRow(o._hPanel);
      var hc = RBuilder.appendTableCell(hr);
      var hnp = o._hNodePanel = RBuilder.appendDiv(hc, o.styleName('NodePanel'));
      var hnf = o._hNodeForm = RBuilder.appendTable(hnp, o.styleName('NodeForm'));
      hnf.width = '100%';
      o._hHeadLine = RBuilder.appendTableRow(hnf);
      o._hNodeRows = hnf.children[0];
      var node = o._loadingNode = RClass.create(FUiTreeNode);
      node._tree = o;
      node._label = RContext.get('FUiTreeView:loading');
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
   MO.FUiTreeView_onNodeClick = function FUiTreeView_onNodeClick(event){
      var o = this;
   }
   MO.FUiTreeView_onClick = function FUiTreeView_onClick(s, e){
      var o = this;
      if(s.hSender == o._hNodePanel){
         var node = o._focusNode;
         if(node){
            node.select(false);
            o._focusNode = null;
         }
      }
   }
   MO.FUiTreeView_onNodeCheckClick = function FUiTreeView_onNodeCheckClick(s, e){
      var o = this;
      if(s && RClass.isClass(s, FUiTreeNode)){
         var f = s.check();
         var cs = s.controls;
         if(cs){
            for(var n = 0; n < cs.count; n++){
               var nd = cs.value(n);
               if(nd && RClass.isClass(nd, FUiTreeNode)){
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
                  if(pnd && RClass.isClass(pnd, FUiTreeNode)){
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
   MO.FUiTreeView_construct = function FUiTreeView_construct(){
      var o = this;
      o.__base.FDuiContainer.construct.call(o);
      o._attributes = new TAttributes();
      o._nodeTypes = new TDictionary();
      o._nodeColumns = new TDictionary();
      o._nodeLevels = new TDictionary();
      o._nodes = new TObjects();
      o._allNodes = new TObjects();
      o._freeNodes = new TObjects();
      o._defaultNodeType = RClass.create(FUiTreeNodeType);
   }
   MO.FUiTreeView_attributes = function FUiTreeView_attributes(){
      return this._attributes;
   }
   MO.FUiTreeView_nodeTypes = function FUiTreeView_nodeTypes(){
      return this._nodeTypes;
   }
   MO.FUiTreeView_nodeColumns = function FUiTreeView_nodeColumns(){
      return this._nodeColumns;
   }
   MO.FUiTreeView_nodeLevels = function FUiTreeView_nodeLevels(){
      return this._nodeLevels;
   }
   MO.FUiTreeView_hasNode = function FUiTreeView_hasNode(){
      return this._rootNode.hasChild();
   }
   MO.FUiTreeView_focusNode = function FUiTreeView_focusNode(){
      return this._focusNode;
   }
   MO.FUiTreeView_nodes = function FUiTreeView_nodes(){
      return this._nodes;
   }
   MO.FUiTreeView_findType = function FUiTreeView_findType(p){
      return this._nodeTypes.get(p);
   }
   MO.FUiTreeView_findByName = function FUiTreeView_findByName(p){
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
   MO.FUiTreeView_findByGuid = function FUiTreeView_findByGuid(guid){
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
   MO.FUiTreeView_createChild = function FUiTreeView_createChild(x){
      var o = this;
      var r = null;
      var n = x.name();
      switch(n){
         case 'TreeColumn':
            r = RClass.create(FUiTreeColumn);
            break;
         case 'TreeLevel':
            r = RClass.create(FUiTreeLevel);
            break;
         case 'TreeNodeType':
            r = RClass.create(FUiTreeNodeType);
            break;
         case 'TreeNode':
            r = RClass.create(FUiTreeNode);
            break;
         default:
            throw new TError(o, 'Unknown child type. (config={1})', x.xml());
      }
      r._tree = o;
      return r;
   }
   MO.FUiTreeView_appendChild = function FUiTreeView_appendChild(child){
      var o = this;
   }
   MO.FUiTreeView_createNode = function FUiTreeView_createNode(){
      var o = this;
      var node = o._freeNodes.pop();
      if(!node){
         node = RClass.create(FUiTreeNode);
         node._tree = o;
         node.build(o._hPanel);
      }
      RHtml.visibleSet(node._hPanel, true);
      o._allNodes.push(node);
      return node;
   }
   MO.FUiTreeView_appendNode = function FUiTreeView_appendNode(node, parent){
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
            RHtml.tableMoveRow(o._hNodeForm, hPanel.rowIndex, nr);
         }else{
            o._hNodeRows.appendChild(hPanel);
            RHtml.tableMoveRow(o._hNodeForm, hPanel.rowIndex, nr+1);
         }
         node.setLevel(parent._level + 1);
      }else{
         o._hNodeRows.appendChild(hPanel);
         node.setLevel(0);
      }
      node._statusLinked = true;
   }
   MO.FUiTreeView_appendNodes = function FUiTreeView_appendNodes(parent, config){
      parent = RObject.nvl(parent, this.workNode, this.rootNode);
      if(config && config._nodes){
         var count = config._nodes.count;
         if(count > 0){
            parent.child = true;
            parent.loaded = true;
            for(var n = 0; n < count; n++){
               var nc = config._nodes.get(n);
               if(nc && (nc.isName('Node') || nc.isName('TreeNode'))){
                  var tn = RClass.create(FUiTreeNode);
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
   MO.FUiTreeView_selectNode = function FUiTreeView_selectNode(n, s){
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
   MO.FUiTreeView_push = function FUiTreeView_push(control){
      var o = this;
      o.__base.FDuiContainer.push.call(o, control);
      control._tree = o;
      if(RClass.isClass(control, FUiTreeColumn)){
         o._nodeColumns.set(control.name(), control);
      }else if(RClass.isClass(control, FUiTreeLevel)){
         o._nodeLevels.set(control.id(), control);
      }else if(RClass.isClass(control, FUiTreeNodeType)){
         o._nodeTypes.set(control.code(), control);
      }else if(RClass.isClass(control, FUiTreeNode)){
         o._nodes.push(control);
         o._allNodes.push(control);
         o.appendNode(control);
      }
   }
   MO.FUiTreeView_removeNode = function FUiTreeView_removeNode(oNode){
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
   MO.FUiTreeView_removeNodes = function FUiTreeView_removeNodes(node){
      node = RObject.nvl(node, this.workNode, this.rootNode);
      if(node.hasChild()){
         node.removeChildren();
      }
      node.remove();
   }
   MO.FUiTreeView_freeNode = function FUiTreeView_freeNode(node){
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
   MO.FUiTreeView_clearNodes = function FUiTreeView_clearNodes(node){
      if(node){
         node.removeChildren();
      }
      var nodes = new Array();
      var oLoopNode = null;
      var nCount = this._allNodes.length;
      for(var n=0; n<nCount; n++){
         oLoopNode = this._allNodes[n];
         if(oLoopNode.parent != oNode){
            nodes[nodes.length] = oLoopNode;
         }else{
         oNode.childrenHTML.removeChild(oLoopNode.ownerHTML);
         }
      }
      oNode.imageHTML.src = this.imgEmpty ;
      this._allNodes = nodes;
      return true;
   }
   MO.FUiTreeView_nodeClick = function FUiTreeView_nodeClick(node){
      var o = this;
      var event = new SEvent();
      event.tree = o;
      event.node = node;
      o.onNodeClick(event);
      o.processNodeClickListener(event);
      event.dispose();
   }
   MO.FUiTreeView_calculateHeight = function FUiTreeView_calculateHeight(){
      var o = this;
      var ns = o._allNodes;
      var c = ns.count();
      for(var i = 0; i < c; i++){
         var n = ns.get(i);
         if(RHtml.displayGet(n._hPanel)){
            c++;
         }
      }
      return c * 29;
   }
   MO.FUiTreeView_fetchChangedChecks = function FUiTreeView_fetchChangedChecks(){
      var o = this;
      var treeView = new TNode('TreeView');
      treeView.set('name', o.name);
      var rnd = RObject.nvl(o.rootNode, o);
      var cs = rnd.controls;
      for(var n = 0; n < cs.count; n++){
         var c = cs.value(n);
         c.pushChanged(treeView);
      }
      return treeView;
   }
   MO.FUiTreeView_extendAuto = function FUiTreeView_extendAuto(n){
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
   MO.FUiTreeView_extendAll = function FUiTreeView_extendAll(n, f){
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
   MO.FUiTreeView_refresh = function FUiTreeView_refresh(){
      var o = this;
      if(o.parentObj){
         o.parentObj.style.height = o.calculateHeight();
      }
   }
   MO.FUiTreeView_filterNode = function FUiTreeView_filterNode(pl, pa){
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
   MO.FUiTreeView_clearAllNodes = function FUiTreeView_clearAllNodes(){
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
   MO.FUiTreeView_clear = function FUiTreeView_clear(){
      var o = this;
      o.clearAllNodes();
   }
   MO.FUiTreeView_dispose = function FUiTreeView_dispose(){
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
}
