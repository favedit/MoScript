function FTreeColumn(o){
   o = RClass.inherits(this, o, FControl);
   o.icon         = RClass.register(o, new TPtyStr('icon'));
   o.dataName     = RClass.register(o, new TPtyStr('dataName'));
   o.display      = RClass.register(o, new TPtyBool('display', EBool.False));
   o.config       = RClass.register(o, new TPtyCfg('config'));
   o.oeBuild      = FTreeColumn_oeBuild;
   o.onBuildPanel = FTreeColumn_onBuildPanel;
   return o;
}
function FTreeColumn_oeBuild(event){
   var o = this;
   var r = o.base.FControl.oeBuild.call(o, event);
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
function FTreeColumn_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD');
}
function FTreeLevel(o){
   o = RClass.inherits(this, o, FControl);
   o.id           = RClass.register(o, new TPtyStr('id'));
   o.color        = RClass.register(o, new TPtyStr('color'));
   o.bgColor      = RClass.register(o, new TPtyStr('bgColor'));
   return o;
}
function FTreeNode(o){
   o = RClass.inherits(this, o, FContainer);
   o.type             = RClass.register(o, new TPtyStr('type'));
   o.uuid             = RClass.register(o, new TPtyStr('uuid'));
   o.isValid          = RClass.register(o, new TPtyBool('isValid'), true);
   o.icon             = RClass.register(o, new TPtyStr('icon'));
   o.tag              = RClass.register(o, new TPtyStr('tag'));
   o.note             = RClass.register(o, new TPtyStr('note'));
   o.child            = RClass.register(o, new TPtyBool('child'));
   o.checked          = RClass.register(o, new TPtyBool('checked'), false);
   o.extended         = RClass.register(o, new TPtyBool('extended'), false);
   o.stHover          = RClass.register(o, new TStyle('Hover'));
   o.stSelect         = RClass.register(o, new TStyle('Select'));
   o.stNodePanel      = RClass.register(o, new TStyle('NodePanel'));
   o.stNodeHover      = RClass.register(o, new TStyle('NodeHover'));
   o.stNodeSelect     = RClass.register(o, new TStyle('NodeSelect'));
   o.stImage          = RClass.register(o, new TStyle('Image'));
   o.stIcon           = RClass.register(o, new TStyle('Icon'));
   o.stIconDisable    = RClass.register(o, new TStyle('IconDisable'));
   o.stCell           = RClass.register(o, new TStyle('Cell'));
   o.__linked         = false;
   o.__display        = true;
   o.__delete         = false;
   o._hover           = false;
   o._extended        = false;
   o._selected        = false;
   o.tree             = null;
   o.parentNode       = null;
   o.loaded           = false;
   o.level            = 0;
   o.attributes       = null;
   o.nodes            = null;
   o.hNodePanel       = null;
   o.hImage           = null;
   o.hIcon            = null;
   o.hLabel           = null;
   o.onNodeEnter      = RClass.register(o, new HMouseEnter('onNodeEnter'), FTreeNode_onNodeEnter);
   o.onNodeLeave      = RClass.register(o, new HMouseLeave('onNodeLeave'), FTreeNode_onNodeLeave);
   o.onNodeClick      = RClass.register(o, new HClick('onNodeClick'), FTreeNode_onNodeClick);
   o.onBuildPanel     = RBuilder.onBuildTrPanel;
   o.oeBuild          = FTreeNode_oeBuild;
   o.construct        = FTreeNode_construct;
   o.hasChild         = FTreeNode_hasChild;
   o.topNode          = FTreeNode_topNode;
   o.topNodeByType    = FTreeNode_topNodeByType;
   o.get              = FTreeNode_get;
   o.set              = FTreeNode_set;
   o.check            = FTreeNode_check;
   o.setCheck         = FTreeNode_setCheck;
   o.createChild      = FTreeNode_createChild;
   o.loadConfig       = FTreeNode_loadConfig;
   o.saveConfig       = FTreeNode_saveConfig;
   o.loadNode         = FTreeNode_loadNode;
   o.show             = FTreeNode_show;
   o.hide             = FTreeNode_hide;
   o.extend           = FTreeNode_extend;
   o.select           = FTreeNode_select;
   o.setLevel         = FTreeNode_setLevel;
   o.push             = FTreeNode_push;
   o.refreshStyle     = FTreeNode_refreshStyle;
   o.reload           = FTreeNode_reload;
   o.reloadParent     = FTreeNode_reloadParent;
   o.loadQuery        = FTreeNode_loadQuery;
   o.remove           = FTreeNode_remove;
   o.removeChildren   = FTreeNode_removeChildren;
   o.click            = FTreeNode_click;
   o.isFolder         = FTreeNode_isFolder;
   o.dispose          = FTreeNode_dispose;
   o.innerDump        = FTreeNode_innerDump;
   o.extendAll        = FTreeNode_extendAll;
   o.findByName       = FTreeNode_findByName;
   o.findByUuid       = FTreeNode_findByUuid;
   o.checkChanged     = FTreeNode_checkChanged;
   o.pushChanged      = FTreeNode_pushChanged;
   o.getFullPath      = FTreeNode_getFullPath;
   return o;
}
function FTreeNode_onNodeEnter(e){
   var o = this;
   var t = o.tree;
   if(!t.focusNode || (t.focusNode && (t.focusNode != o))){
      if(!o.isFolder()){
         o._hover = true;
         o.refreshStyle();
      }
      t.lsnsEnter.process(t, o);
   }
}
function FTreeNode_onNodeLeave(e){
   var o = this;
   var t = o.tree;
   if(!t.focusNode || (t.focusNode && (t.focusNode != o))){
      o._hover = false;
      o.refreshStyle();
      t.lsnsLeave.process(t, o);
   }
}
function FTreeNode_onNodeClick(e){
   var o = this;
   var t = o.tree;
   var esn = e.hSender.tagName;
   if('INPUT' == esn){
      return;
   }
   var isImg = false;
   if('IMG' == esn){
      isImg = ('image' == e.hSender._linkType);
   }
   var isParent = false;
   var find = t.focusNode;
   while(find){
      if(find == o){
         isParent = true;
         break;
      }
      find = find.parent;
   }
   if(!isImg || (isImg && (isParent || !o.child))){
      t.selectNode(o, true);
   }
   if(!o.loaded && o.child){
      o.extend(true);
      if(!isImg){
         t.lsnsClick.process(t, o);
      }
   }else{
      if(o.child){
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
      if((isImg && isParent) || (isImg && !o.child) || !isImg){
         t.lsnsClick.process(t, o);
      }
   }
}
function FTreeNode_oeBuild(e){
   var o = this;
   var t = o.tree;
   var r = o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      var hp = o.hPanel;
      hp.style.border = '1 solid red';
      o.attachEvent('onNodeEnter', hp, o.onNodeEnter);
      o.attachEvent('onNodeLeave', hp, o.onNodeLeave);
      o.attachEvent('onNodeClick', hp);
      var hnp = o.hNodePanel = RBuilder.appendCell(hp, o.style('NodePanel'));
      hnp.noWrap = true;
      var ni = o.child ? t.iconPlus : t.iconNode;
      var hi = o.hImage = RBuilder.appendIcon(hnp, ni, o.style('Image'), 16, 16);
      hi._linkType = 'image';
      var ni = RString.nvl(o.icon, o.type ? o.type.icon : null);
      if(ni){
         var hi = o.hIcon = RBuilder.appendIcon(hnp, ni, o.isValid ? o.style('Icon') : o.style('IconDisable'), 16, 16);
      }else{
        var hi = o.hIcon = RBuilder.appendIcon(hnp, t.iconEmpty, o.isValid ? o.style('Icon') : o.style('IconDisable'), 1, 1);
      }
      hi._linkType = 'icon';
      if(t.dispChecked){
         var hc = o.hCheck = RBuilder.appendCheck(hnp);
         hc.width = 13;
         hc.height = 13;
         hc.style.borderWidth = 0;
         o.setCheck(o.checked);
         t.linkEvent(o, 'onNodeCheckClick', hc);
      }
      var text = '&nbsp;' + o.label;
      if(o.tag){
         text += '&nbsp;<FONT color=blue>(' + o.tag + ')</FONT>';
      }
      if(o.note){
         text += '&nbsp;<FONT color=green>[ ' + o.note + ' ]</FONT>';
      }
      var hl = o.hLabel = RBuilder.appendText(hnp, text);
      hl.style.font = 'icon';
      var cs = t.columns;
      if(cs){
         for(var n=1; n<cs.count; n++){
            var c = cs.value(n);
            var hc = RBuilder.appendCell(hp, o.style('Cell'));
            hc.align='center';
            hc.noWrap = true;
            hc.innerText = RString.nvl(o.get(c.dataName));
            hc.style.display = c.display ? 'block' : 'none';
         }
      }
   }
   return r;
}
function FTreeNode_construct(){
   var o = this;
   o.base.FContainer.construct.call(o);
   o.attributes = new TAttributes();
}
function FTreeNode_hasChild(){
   var o = this;
   if(o.child){
      return o.nodes && o.nodes.count > 0;
   }
}
function FTreeNode_topNode(){
   var f = this;
   while(f.parentNode){
      f = f.parentNode;
   }
   return f;
}
function FTreeNode_topNodeByType(t){
   var f = this;
   while(f){
      if(f.type.type == t){
         return f;
      }
      f = f.parentNode;
   }
}
function FTreeNode_get(n){
   return this.attributes.get(n);
}
function FTreeNode_set(n, v){
   this.attributes.set(n, v);
}
function FTreeNode_check(){
   return this.hCheck.checked;
}
function FTreeNode_setCheck(v){
   this.hCheck.checked = v;
   this.checked = v;
}
function FTreeNode_createChild(x){
   var r = null;
   if(x.isName('Node') || x.isName('TreeNode')){
      r = RClass.create(FTreeNode);
      r.tree = this.tree;
   }
   return r;
}
function FTreeNode_loadConfig(x){
   var o = this;
   o.base.FContainer.loadConfig.call(o, x);
   o.type = RObject.nvl(this.tree.types.get(x.get('type')), this.tree.type);
   o.attributes.append(x.attrs);
   var attrs = x.get('attributes')
   if(attrs){
      o.attributes.unpack(attrs);
   }
}
function FTreeNode_saveConfig(x){
   var o = this;
   o.base.FContainer.saveConfig.call(o, x);
   var t = o.type;
   x.set('type', t.name);
   x.set('type_type', t.type);
   x.set('attributes', o.attributes.pack());
}
function FTreeNode_loadNode(x){
   var o = this;
   var t = o.tree;
   o.type = null;
   o.uuid = null;
   o.isValid = true;
   o.icon = null;
   o.tag = null;
   o.note = null;
   o.child = false;
   o.checked = false;
   o.extended = true;
   o.loadConfig(x);
   o.__linked = false;
   o.__display = true;
   o.__delete = false;
   o._hover = false;
   o._extended = false;
   o._selected = false;
   o.loaded = false;
   o.level = 0;
   var ni = o.child ? t.iconPlus : t.iconNode;
   o.hImage.src = RResource.iconPath(ni);
   var ni = RString.nvl(o.icon, o.type ? o.type.icon : null);
   o.hIcon.className = o.isValid ? o.style('Icon') : o.style('IconDisable');
   if(ni){
     o.hIcon.style.width = 16;
     o.hIcon.style.height = 16;
      o.hIcon.src = RResource.iconPath(ni);
   }else{
      o.hIcon.style.width = 1;
      o.hIcon.style.height = 1
   }
   if(!RString.isEmpty(o.attributes.get('checked'))){
     o.checked = RBoolean.isTrue(o.attributes.get('checked'));
     if(o.hCheck){
         o.hCheck.checked = o.checked;
     }
   }
   var text = '&nbsp;' + o.label;
   if(o.tag){
      text += '&nbsp;<FONT color=blue>(' + o.tag + ')</FONT>';
   }
   if(o.note){
      text += '&nbsp;<FONT color=green>[ ' + o.note + ' ]</FONT>';
   }
   o.hLabel.innerHTML = text;
}
function FTreeNode_show(){
   var o = this;
   var t = o.tree;
   o.hPanel.style.display = 'block';
   var ns = o.nodes;
   if(ns && ns.count){
      var nc = ns.count;
      for(var i=0; i<nc; i++){
         var n = ns.get(i);
         if(!n.__linked){
            t.appendNode(n, o);
         }
         if(n.__display){
            n.hPanel.style.display = 'block';
            if(n._extended){
               n.show();
            }
         }
      }
   }
}
function FTreeNode_hide(){
   var o = this;
   var t = o.tree;
   if(o.hPanel){
      o.hPanel.style.display = 'none';
   }
   if(o.components){
      var count = o.components.count;
      for(var n=0; n<count; n++){
         var child = o.components.value(n);
         if(child){
            child.hide();
         }
      }
   }
}
function FTreeNode_extend(flag){
   var o = this;
   var t = o.tree;
   if(!o.loaded && o.child){
      if(t.__loading){
         return;
      }
      t.loadNode(o);
   }else{
      if(o.hImage && !o.hasChild()){
         o.hImage.src = RResource.iconPath(t.iconNode);
         return false;
      }
      o._extended = flag;
      if(o.child && o.hImage){
         o.hImage.src = RResource.iconPath(flag ? t.iconMinus : t.iconPlus);
      }
      if(flag){
         o.show();
      }else if(o.nodes){
         for(var n=o.nodes.count-1; n>=0; n--){
            o.nodes.get(n).hide();
         }
      }
   }
   t.resetTreeHeight()
}
function FTreeNode_select(v){
   var o = this;
   o._selected = v;
   if(v){
      o._hover = false;
   }
   o.refreshStyle();
}
function FTreeNode_setLevel(l){
   var o = this;
   var t = o.tree;
   o.level = l;
   o.hImage.style.marginLeft = t.indent * l;
}
function FTreeNode_push(c){
   var o = this;
   var t = o.tree;
   o.base.FContainer.push.call(o, c);
   if(RClass.isClass(c, FTreeNode)){
      o.child = true;
      o.loaded = true;
      var ns = o.nodes;
      if(!ns){
         ns = o.nodes = new TList();
      }
      c.tree = t;
      c.parentNode = o;
      ns.push(c);
      t.allNodes.pushUnique(c);
   }
}
function FTreeNode_refreshStyle(){
   var o = this;
   var cs = o.hPanel.cells;
   if(o._selected){
      for(var n=0; n<cs.length; n++){
         cs[n].className = o.style('NodeSelect');
      }
   }else{
      if(o._hover){
         for(var n=0; n<cs.length; n++){
            cs[n].className = o.style('NodeHover');
         }
      }else{
         for(var n=0; n<cs.length; n++){
            cs[n].className = o.style('NodePanel');
         }
      }
   }
}
function FTreeNode_reload(t){
   var o = this;
   if(t){
      o.tree.reload();
   }else{
      o.tree.reloadNode(o);
   }
}
function FTreeNode_reloadParent(){
   var o = this;
   if(o.parentNode){
      o.tree.reloadNode(o.parentNode);
   }else{
      o.tree.reload();
   }
}
function FTreeNode_loadQuery(x){
   var o = this;
   var sl = RString.nvl(x.get('label'), o.label);
   var sn = RString.nvl(x.get('note'), o.note);
   var text = '&nbsp;' + sl;
   if(!RString.isEmpty(sn)){
      text += '&nbsp;<FONT color=green>[ ' + sn + ' ]</FONT>';
   }
   o.hLabel.innerHTML = text;
   if(x.contains('visible')){
      o.__display = RBool.isTrue(x.get('visible'));
      o.setVisible(o.__display);
   }
}
function FTreeNode_remove(){
   var o = this;
   if(o.__linked){
      if(o.nodes){
         o.removeChildren();
      }
      o.tree.freeNode(o);
   }
}
function FTreeNode_removeChildren(){
   var ns = this.nodes;
   if(ns){
      for(var i=ns.count-1; i>=0; i--){
         var n = ns.get(i);
         if(n){
            n.remove();
         }
      }
      ns.release();
   }
}
function FTreeNode_click(){
   var o = this;
   var t = o.tree;
   t.selectNode(o, true);
   t.lsnsClick.process(t, o);
}
function FTreeNode_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.hNodePanel = null;
   o.hImage = null;
   o.hIcon = null;
   o.hCheck = null;
   o.hLabel = null;
}
function FTreeNode_innerDump(s){
   var o = this;
   s.append(RClass.typeOf(o));
   s.append('[level=',  o.level);
   if(o.type){
      s.append(' type=',  o.type.name);
   }
   s.append(', icon=',  o.icon);
   s.append(', caption=', o.label);
   s.append(', child=', o.child);
   s.append(']');
}
function FTreeNode_extendAll(){
   var o = this;
   o.extend(true);
   var cs = o.components;
   if(cs){
      var c = cs.count;
      for(var n=0; n<c; n++){
         cs.values[n].extendAll();
      }
   }
}
function FTreeNode_findByName(n){
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
function FTreeNode_findByUuid(u){
   var o = this;
   if(o.uuid == u){
      return o;
   }
   var cs = o.components;
   if(cs){
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(c){
            if(c.uuid == u){
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
function FTreeNode_pushChanged(trd){
   var o = this;
    var d = new TNode();
    d.attrs = o.attributes;
    if(d.attrs){
         d.attrs.set('checked', RBoolean.toString(o.check()));
    }
    trd.push(d);
   if(o.components && o.components.count > 0){
      var cc = o.components.count;
      for(var n = 0; n < cc; n++){
         var c = o.components.value(n);
         if(RClass.isClass(c, FTreeNode)){
            c.pushChanged(trd);
         }
      }
   }
}
function FTreeNode_checkChanged(){
   var o = this;
   if(o.checked != o.check()){
      return true;
   }
   return false;
}
function FTreeNode_getFullPath(){
   var o = this;
   var path = '';
   if(o.label){
       path = o.label;
   }
    if(o.parent){
       var s = o.parent.getFullPath();
       if(!RString.isEmpty(s)){
           path = s + "/" + path;
       }
    }
    return path;
}
function FTreeNode_isFolder(){
   if(this.type){
       return (this.type.typeName == 'collections') ? true : false;
   }
}
function FTreeNodeType(o){
   o = RClass.inherits(this, o, FComponent);
   o.type       = RClass.register(o, new TPtyStr('type'));
   o.typeName   = RClass.register(o, new TPtyStr('typeName'));
   o.icon       = RClass.register(o, new TPtyStr('icon'));
   o.service    = RClass.register(o, new TPtyStr('service'));
   o.action     = RClass.register(o, new TPtyStr('action'));
   o.config     = RClass.register(o, new TPtyCfg('config'));
   o.get        = FTreeNodeType_get;
   o.set        = FTreeNodeType_set;
   o.innerDump  = FTreeNodeType_innerDump;
   return o;
}
function FTreeNodeType_get(n){
   var o = this;
   return o.config ? o.config.get(n) : null;
}
function FTreeNodeType_set(n, v){
   var o = this;
   if(o.config){
      o.config.set(n, v)
   }
}
function FTreeNodeType_innerDump(dump){
   var o = this;
   dump.append(RClass.typeOf(o));
   dump.append('[icon=',  o.icon);
   dump.append(', service=', o.service);
   dump.append(', action=', o.action);
   dump.append(']');
}
function FTreeView(o){
   o = RClass.inherits(this, o, FContainer);
   o.dispChecked      = RClass.register(o, new TPtyBool('dispChecked'), false);
   o.service          = RClass.register(o, new TPtyStr('service'));
   o.queryService     = RClass.register(o, new TPtyStr('queryService'));
   o.indent           = RClass.register(o, new TPtyInt('indent', 16));
   o.stNodePanel      = RClass.register(o, new TStyle('NodePanel'));
   o.stNodeForm       = RClass.register(o, new TStyle('NodeForm'));
   o.iconNode         = 'ctl.tv-node';
   o.iconPlus         = 'ctl.tv-plus';
   o.iconMinus        = 'ctl.tv-minus';
   o.__loading        = false;
   o.__loadingNode    = null;
   o.focusNode        = null;
   o.type             = null;
   o.allNodes         = null;
   o.dispNodeCount    = null;
   o.nodes            = null;
   o.freeNodes        = null;
   o.attributes       = null;
   o.types            = null;
   o.columns          = null;
   o.levels           = null;
   o.hNodePanel       = null;
   o.hNodeForm        = null;
   o.hHeadLine        = null;
   o.lsnsEnter        = new TListeners();
   o.lsnsLeave        = new TListeners();
   o.lsnsLoad         = new TListeners();
   o.lsnsLoaded       = new TListeners();
   o.lsnsClick        = new TListeners();
   o.onNodeCheckClick = RClass.register(o, new HClick('onNodeCheckClick'), FTreeView_onNodeCheckClick);
   o.onLoaded         = FTreeView_onLoaded;
   o.onQueryLoaded    = FTreeView_onQueryLoaded;
   o.onBuildPanel     = RBuilder.onBuildTablePanel;
   o.oeBuild          = FTreeView_oeBuild;
   o.construct        = FTreeView_construct;
   o.connect          = FTreeView_connect;
   o.findByName       = FTreeView_findByName;
   o.findByUuid       = FTreeView_findByUuid;
   o.selectNode       = FTreeView_selectNode;
   o.extendAuto       = FTreeView_extendAuto;
   o.extendAll        = FTreeView_extendAll;
   o.createChild      = FTreeView_createChild;
   o.createNode       = FTreeView_createNode;
   o.appendNode       = FTreeView_appendNode;
   o.loadNode         = FTreeView_loadNode;
   o.freeNode         = FTreeView_freeNode;
   o.push             = FTreeView_push;
   o.reload           = FTreeView_reload;
   o.reloadNode       = FTreeView_reloadNode;
   o.doQuery          = FTreeView_doQuery;
   o.clear            = FTreeView_clear;
   o.dispose          = FTreeView_dispose;
   o.getTreeHeight    = FTreeView_getTreeHeight;
   o.resetTreeHeight  = FTreeView_resetTreeHeight;
   o.filterNode       = FTreeView_filterNode;
   o.removeNode       = FTreeView_removeNode;
   o.clearNodes       = FTreeView_clearNodes;
   o.haveNodes        = FTreeView_haveNodes;
   o.release          = FTreeView_release;
   o.getChangedChecks = FTreeView_getChangedChecks;
   o.fetchExtendsAll  = FTreeView_fetchExtendsAll;
   o.tempAppendNodes  = FTreeView_tempAppendNodes;
   o.removeNodes      = FTreeView_removeNodes;
   o.tempAppendChild  = FTreeView_tempAppendChild;
   return o;
}
function FTreeView_onNodeCheckClick(s, e){
   var o = this;
   if(s && RClass.isClass(s, FTreeNode)){
      var f = s.check();
      var cs = s.controls;
      if(cs){
         for(var n = 0; n < cs.count; n++){
            var nd = cs.value(n);
            if(nd && RClass.isClass(nd, FTreeNode)){
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
	         for(var n=0; n<pcc; n++){
	        	var pnd = pcs.value(n);
	            if(pnd && RClass.isClass(pnd, FTreeNode)){
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
function FTreeView_onLoaded(e){
   var o = this;
   var xd = e.document;
   if(xd){
      var ne = e.node;
      o.__loadingNode.hide();
      o.__loading = false;
      var xr = xd.root();
      var xns = xr.nodes;
      if(xns){
         var xnc = xns.count;
         for(var i=0; i<xnc; i++){
            var xn = xns.get(i);
            if(xn.isName('TreeNode')){
               var n = o.createNode();
               n.loadNode(xn);
               if(ne){
                  ne.push(n);
               }else{
                  o.push(n);
               }
               o.appendNode(n, ne);
            }
         }
      }
      o.lsnsLoaded.process(o, e.node);
      if(o.extendsAll){
          o.extendAll();
      }
   }
}
function FTreeView_onQueryLoaded(e){
   var o = this;
   var doc = e.document;
   if(doc){
      var tvn = doc.root().find('TreeView');
      if(tvn && tvn.nodes){
         var nc = tvn.nodes.count;
         for(var n=0; n<nc; n++){
            var nd = tvn.nodes.get(n);
            if(nd.isName('TreeNode')){
               var nm = nd.get('name');
               var fd = o.findByName(nm);
               if(fd){
                  fd.loadQuery(nd);
               }
            }
         }
      }
   }
}
function FTreeView_oeBuild(e){
   var o = this;
   var r = o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      var hc = o.hPanel.insertRow().insertCell();
      var hnp = o.hNodePanel = RBuilder.appendDiv(hc, o.style('NodePanel'));
      var hnf = o.hNodeForm = RBuilder.appendTable(hnp, o.style('NodeForm'));
      o.hHeadLine = hnf.insertRow();
      o.hNodeRows = hnf.children[0];
      var ln = o.__loadingNode = RClass.create(FTreeNode);
      ln.tree = o;
      ln.label = RContext.get('FTreeView:loading');
      ln.icon = 'ctl.tv-load';
      ln.psBuild();
      o.appendNode(ln);
      ln.hide();
   }else if(e.isAfter()){
      var ns = o.nodes;
      if(!ns.isEmpty()){
         var nc = ns.count;
         for(var i=0; i<nc; i++){
            o.appendNode(ns.get(i));
         }
      }
      o.extendAuto();
   }
   return r;
}
function FTreeView_construct(){
   var o = this;
   o.base.FContainer.construct.call(o);
   o.nodes = new TList();
   o.allNodes = new TList();
   o.freeNodes = new TList();
   o.attributes = new TAttributes();
   o.types = new TMap();
   o.columns = new TMap();
   o.levels = new TMap();
   o.type = RClass.create(FTreeNodeType);
}
function FTreeView_connect(service, attrs){
   var o = this;
   var svc = RService.parse(RString.nvl(service, this.service));
   if(!svc){
      return alert('Unknown service');
   }
   attrs = RObject.nvl(attrs, o.attributes);
   var xd = new TXmlDocument();
   var xr = xd.root();
   xr.set('action', svc.action);
   RConsole.find(FEnvConsole).build(xr);
   if(!attrs.isEmpty()){
      if(RClass.isClass(attrs, TNode)){
         xr.push(attrs);
      }if(RClass.isClass(attrs, TAttributes)){
         xr.create('Tree').attrs = attrs;
         xr.create('Attributes').attrs = attrs;
      }else{
         xr.create('Tree').value = attrs;
         xr.create('Attributes').value = attrs;
      }
   }
   var ln = o.__loadingNode;
   RHtml.tableMoveRow(o.hNodeForm, ln.hPanel.rowIndex, 0);
   ln.setLevel(0);
   ln.show();
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = svc.url;
   e.document = xd;
   RConsole.find(FXmlConsole).process(e);
}
function FTreeView_findByName(n){
   var o = this;
   var ns = o.allNodes;
   var nc = ns.count;
   if(nc){
      for(var i=0; i<nc; i++){
         var fn = ns.get(i);
         if(fn.name == n){
            return fn;
         }
      }
   }
}
function FTreeView_findByUuid(u){
   var o = this;
   var ns = o.allNodes;
   var nc = ns.count;
   if(nc){
      for(var i=0; i<nc; i++){
         var fn = ns.get(i);
         if(fn.uuid == u){
            return fn;
         }
      }
   }
}
function FTreeView_selectNode(n, s){
   var o = this;
   var fn = o.focusNode;
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
            o.focusNode = n;
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
function FTreeView_extendAuto(n){
   var o = this;
   var ns = n ? n.nodes : o.nodes;
   if(ns){
      var nc = ns.count;
      if(nc){
         for(var i=0; i<nc; i++){
            var fn = ns.get(i);
            fn.extend(fn.extended);
            if(fn.extended){
               o.extendAuto(fn);
            }
         }
      }
   }
}
function FTreeView_extendAll(n){
   var o = this;
   var ns = n ? n.nodes : o.nodes;
   if(ns){
      var nc = ns.count;
      if(nc){
         for(var i=0; i<nc; i++){
            var fn = ns.get(i);
            fn.extend(true);
            o.extendAll(fn);
         }
      }
   }
}
function FTreeView_createChild(x){
   var o = this;
   var r = null;
   if(x.isName('Column') || x.isName('TreeColumn')){
      r = RClass.create(FTreeColumn);
   }else if(x.isName('Level') || x.isName('TreeLevel')){
      r = RClass.create(FTreeLevel);
   }else if(x.isName('Type') || x.isName('TreeNodeType')){
      r = RClass.create(FTreeNodeType);
   }else if(x.isName('Node') || x.isName('TreeNode')){
      r = RClass.create(FTreeNode);
   }else{
      RMessage.fatal(o, null, 'Unknown child type (config={0})', x.xml());
   }
   r.tree = o;
   return r;
}
function FTreeView_createNode(){
   var o = this;
   var n = o.freeNodes.pop();
   if(!n){
      var n = RClass.create(FTreeNode);
      n.tree = o;
      n.psBuild();
   }
   n.hPanel.style.display = 'block';
   o.allNodes.pushUnique(n);
   return n;
}
function FTreeView_appendNode(n, p){
   var o = this;
   if(!n.__linked){
      if(p){
         var nr = p.hPanel.rowIndex;
         var ns = p.nodes;
         for(var i=ns.count-1; i>=0; i--){
            var pn = ns.get(i)
            if(pn.__linked){
               nr = pn.hPanel.rowIndex;
               break;
            }
         }
         if(n.hPanel.parentElement){
            if(n.hPanel.rowIndex > nr){
               nr++;
            }
            RHtml.tableMoveRow(o.hNodeForm, n.hPanel.rowIndex, nr);
         }else{
            o.hNodeRows.appendChild(n.hPanel);
            RHtml.tableMoveRow(o.hNodeForm, n.hPanel.rowIndex, nr+1);
         }
         n.setLevel(p.level + 1);
      }else{
         o.hNodeRows.appendChild(n.hPanel);
         n.setLevel(0);
      }
      n.__linked = true;
   }
}
function FTreeView_loadNode(node, refresh){
   var o = this;
   o.__loading = true;
   var type = null;
   var fn = node;
   while(fn){
      type = fn.type;
      if(type && type.service){
         break;
      }
      fn = fn.parentNode;
   }
   var svc = RService.parse(RString.nvl(type.service, o.service));
   if(!svc){
      return alert('Unknown service');
   }
   var fn = node;
   while(fn){
      type = fn.type;
      if(type && type.action){
         break;
      }
      fn = fn.parentNode;
   }
   var act = RString.nvl(type.action, svc.action);
   if(!act){
      return alert('Unknown action');
   }
   o.lsnsLoad.process(o, node);
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('type', type.name);
   root.set('action', act);
   root.create('Tree', o.attributes);
   root.create('Attributes', o.attributes);
   var fn = node;
   var xnode = root;
   while(fn){
      var xnode = xnode.create('Node');
      fn.saveConfig(xnode);
      fn = fn.parentNode;
   }
   node._extended = true;
   if(node.child && node.hImage){
      node.hImage.src = RResource.iconPath(o.iconMinus);
   }
   var ln = o.__loadingNode;
   var nr = node.hPanel.rowIndex;
   if(ln.hPanel.rowIndex > nr){
      nr++;
   }
   RHtml.tableMoveRow(o.hNodeForm, ln.hPanel.rowIndex, nr);
   ln.setLevel(node.level + 1);
   ln.show();
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.node = node;
   e.url = svc.url;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FTreeView_freeNode(n){
   var o = this;
   if(n.__linked){
      n.__linked = false;
      n.hPanel.style.display = 'none';
      o.allNodes.extract(n);
      o.freeNodes.push(n);
   }
}
function FTreeView_push(c){
   var o = this;
   o.base.FContainer.push.call(o, c);
   c.tree = o;
   if(RClass.isClass(c, FTreeColumn)){
      o.columns.set(c.name, c);
   }else if(RClass.isClass(c, FTreeLevel)){
      o.levels.set(c.id.toString(), c);
   }else if(RClass.isClass(c, FTreeNodeType)){
      o.types.set(c.typeName, c);
   }else if(RClass.isClass(c, FTreeNode)){
      o.nodes.push(c);
      o.allNodes.pushUnique(c);
   }
}
function FTreeView_reload(){
   var o = this;
   o.clear();
   o.connect();
}
function FTreeView_reloadNode(n){
   var o = this;
   n = RObject.nvl(n, o.focusNode);
   if(!n){
      return o.reload();
   }
   n.removeChildren();
   o.loadNode(n);
}
function FTreeView_doQuery(){
   var o = this;
   var svc = RService.parse(o.queryService);
   if(!svc){
      return alert('Unknown query service');
   }
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', svc.action);
   root.create('Attributes').attrs = o.attributes;
   var e = new TEvent(o, EXmlEvent.Send, o.onQueryLoaded);
   e.url = svc.url;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FTreeView_clear(){
   var o = this;
   var ns = o.nodes;
   for(var i=ns.count-1; i>=0; i--){
      ns.get(i).remove();
   }
   ns.release();
   o.allNodes.release();
}
function FTreeView_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.hNodePanel = null;
   o.hNodeForm = null;
   o.hHeadLine = null;
}
function FTreeView_getTreeHeight(){
   var o = this;
   var ns = o.allNodes;
   var c = 0;
   for(var n = 0; n<ns.count; n++){
      var cn = ns.get(n);
      if(cn.hPanel.style.display == 'block'||cn.hPanel.style.display == ''){
         c++;
      }
   }
   return c * 29;
}
function FTreeView_resetTreeHeight(){
   var o = this;
   if(o.parentObj){
	   var h = o.getTreeHeight();
	   o.parentObj.style.height = h;
   }
}
function FTreeView_filterNode(sCaption, sAttr){
   var oNode = null;
   var nCount = this.allNodes.length;
   var sNodeCaption = null;
   var sNodeAttr = null;
   if(!sCaption){
      for(var n=0; n<nCount; n++){
         oNode = this.allNodes[n];
         if(!oNode.isDelete){
            oNode.show(true);
         }
      }
   }else{
      sCaption = sCaption.toLowerCase();
      var arAttr = null;
      var nAttrCount = 0;
      if(sAttr){
         sAttr = sAttr.toLowerCase();
         arAttr = sAttr.split("|");
         nAttrCount = arAttr.length;
      }
      for(var n=0; n<nCount; n++){
         oNode = this.allNodes[n];
         if(!oNode.isDelete){
            sNodeCaption = oNode.label.toLowerCase();
            if(arAttr){
               sNodeAttr = oNode.linkAttr.toLowerCase();
               for(var s=0; s<nAttrCount; s++){
                  if(sNodeAttr.indexOf(arAttr[s]) != -1){
                     oNode.show((sNodeCaption.indexOf(sCaption) != -1));
                     break;
                  }
               }
            }else{
               oNode.show((sNodeCaption.indexOf(sCaption) != -1));
            }
         }
      }
   }
   return true;
}
function FTreeView_removeNode(oNode){
   if(oNode){
      var nodes = new Array();
      var oLoopNode = null;
      var nCount = this.allNodes.length;
      for(var n=0; n<nCount; n++){
         oLoopNode = this.allNodes[n];
         if(oLoopNode != oNode){
            nodes[nodes.length] = oLoopNode;
         }
      }
      this.allNodes = nodes;
      var oParent = oNode.parent;
      if(oParent){
         nodes = new Array();
         nCount = oParent.nodes.length;
         for(var n=0; n<nCount; n++){
            oLoopNode = oParent.nodes[n];
            if(oLoopNode != oNode){
               nodes[nodes.length] = oLoopNode;
            }
         }
         oParent.nodes = nodes;
         oNode.parent.childrenHTML.removeChild(oNode.ownerHTML);
      }
      if(oParent.nodes.length == 0){
         oParent.imageHTML.src = this.imgEmpty;
      }
      return true;
   }
   return false;
}
function FTreeView_haveNodes(){
   return this.rootNode.hasChild();
}
function FTreeView_clearNodes(node){
   if(node){
      node.removeChildren();
   }
   return true;
   var nodes = new Array();
   var oLoopNode = null;
   var nCount = this.allNodes.length;
   for(var n=0; n<nCount; n++){
      oLoopNode = this.allNodes[n];
      if(oLoopNode.parent != oNode){
         nodes[nodes.length] = oLoopNode;
      }else{
      oNode.childrenHTML.removeChild(oLoopNode.ownerHTML);
      }
   }
   oNode.imageHTML.src = this.imgEmpty ;
   this.allNodes = nodes;
   return true;
}
function FTreeView_release(){
   var nodes = this.allNodes;
   for(var n=0; n<nodes.length; n++){
      var node = nodes[n];
      node.release();
   }
   this.allNodes = null;
   this.allNodesUuid = null;
   this.allNodesProperty = null;
   this.allNodesPropertyExtend = null;
   this.nodes = null;
   return true;
}
function FTreeView_fetchExtendsAll(s){
   var o = this;
   if(s && RClass.isClass(s, FTreeNode)){
      fmMain.target = 'frmMain';
      fmMain.form_search.value = '';
      fmMain.form_order.value = '';
      fmMain.form_values.value = '';
      var type = node.type.typeName;
      if('table' == type || 'form' == type){
         fmMain.form_name.value = node.get('form');
         fmMain.action = top.RContext.context('/ent/apl/logic/form/InnerForm.wa?do=update');
         fmMain.submit();
      }else if('frameTree' == type){
         fmMain.action = top.RContext.context(node.get('redirect'));
         fmMain.submit();
      }
   }else{
   }
}
function FTreeView_getChangedChecks(){
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
function FTreeView_tempAppendNodes(parent, config){
   parent = RObject.nvl(parent, this.workNode, this.rootNode);
   if(config && config.nodes){
      var count = config.nodes.count;
      if(count > 0){
         parent.child = true;
         parent.loaded = true;
         for(var n=0; n<count; n++){
            var nc = config.nodes.get(n);
            if(nc && (nc.isName('Node') || nc.isName('TreeNode'))){
               var tn = RClass.create(FTreeNode);
               tn.parent = parent;
               tn.tree = this;
               tn.loadConfig(nc);
               if(nc.nodes){
                  tn.icon = 'ctl.FBrowser_Folder';
               }else{
                  tn.icon = 'ctl.FBrowser_Txt';
               }
               tn.build(0);
               tn.hide();
               if(nc.nodes){
                  this.tempAppendNodes(tn, nc);
               }
               parent.push(tn);
               this.allNodes.push(tn);
            }
         }
      }
   }
   this.rootNode.extend(true);
}
function FTreeView_removeNodes(node){
   node = RObject.nvl(node, this.workNode, this.rootNode);
   if(node.hasChild()){
      node.removeChildren();
   }
   node.remove();
}
function FTreeView_tempAppendChild(child){
   var o = this;
   var hc = o.hHeadLine.insertCell();
   hc.height = '100%';
   if(RClass.isClass(child, FTreeColumn)){
      hc.appendChild(child.hPanel);
   }
}
