//==========================================================
// 树目录里一个节点的类，主要定义一个节点的显示图标，注释，子节点
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
// @class FContainer
// @author maochunyang
// @version 1.0.1
//==========================================================
function FTreeNode(o){
   o = RClass.inherits(this, o, FContainer);
   //..........................................................
   // @property
   o.type             = RClass.register(o, new TPtyStr('type'));
   o.uuid             = RClass.register(o, new TPtyStr('uuid'));
   o.isValid          = RClass.register(o, new TPtyBool('isValid'), true);
   o.icon             = RClass.register(o, new TPtyStr('icon'));
   o.tag              = RClass.register(o, new TPtyStr('tag'));
   o.note             = RClass.register(o, new TPtyStr('note'));
   o.child            = RClass.register(o, new TPtyBool('child'));
   o.checked          = RClass.register(o, new TPtyBool('checked'), false);
   o.extended         = RClass.register(o, new TPtyBool('extended'), false);
   //..........................................................
   // @style
   o.stHover          = RClass.register(o, new TStyle('Hover'));
   o.stSelect         = RClass.register(o, new TStyle('Select'));
   o.stNodePanel      = RClass.register(o, new TStyle('NodePanel'));
   o.stNodeHover      = RClass.register(o, new TStyle('NodeHover'));
   o.stNodeSelect     = RClass.register(o, new TStyle('NodeSelect'));
   o.stImage          = RClass.register(o, new TStyle('Image'));
   o.stIcon           = RClass.register(o, new TStyle('Icon'));
   o.stIconDisable    = RClass.register(o, new TStyle('IconDisable'));
   o.stCell           = RClass.register(o, new TStyle('Cell'));
   //..........................................................
   // @attribute
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
   //..........................................................
   // @html
   o.hNodePanel       = null;
   o.hImage           = null;
   o.hIcon            = null;
   o.hLabel           = null;
   //..........................................................
   // @event
   o.onNodeEnter      = RClass.register(o, new HMouseEnter('onNodeEnter'), FTreeNode_onNodeEnter);
   o.onNodeLeave      = RClass.register(o, new HMouseLeave('onNodeLeave'), FTreeNode_onNodeLeave);
   o.onNodeClick      = RClass.register(o, new HClick('onNodeClick'), FTreeNode_onNodeClick);
   o.onBuildPanel     = RBuilder.onBuildTrPanel;
   //..........................................................
   // @process
   o.oeBuild          = FTreeNode_oeBuild;
   //..........................................................
   // @method
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



















   //..........................................................
   // @method
   o.extendAll        = FTreeNode_extendAll;
   o.findByName       = FTreeNode_findByName;
   o.findByUuid       = FTreeNode_findByUuid;
   o.checkChanged     = FTreeNode_checkChanged;
   o.pushChanged      = FTreeNode_pushChanged;
   o.getFullPath      = FTreeNode_getFullPath;
   return o;
}

//==========================================================
// <T>鼠标移进节点的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
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

//==========================================================
// <T>鼠标移出节点的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FTreeNode_onNodeLeave(e){
   var o = this;
   var t = o.tree;
   if(!t.focusNode || (t.focusNode && (t.focusNode != o))){
      o._hover = false;
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
function FTreeNode_onNodeClick(e){
   var o = this;
   var t = o.tree;
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
   var find = t.focusNode;
   while(find){
      if(find == o){
         isParent = true;
         break;
      }
      find = find.parent;
   }
   // 设置焦点节点
   if(!isImg || (isImg && (isParent || !o.child))){
      t.selectNode(o, true);
   }
   // 判断是否需要加载节点
   if(!o.loaded && o.child){
      o.extend(true);
      if(!isImg){
         t.lsnsClick.process(t, o);
      }
   }else{
      // 已经是加载过的节点
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

//==========================================================
// <T>显示或隐藏子目录。</T>
//
// @method
// @param flag:Flag:Boolean 判断参数
//==========================================================
function FTreeNode_oeBuild(e){
   var o = this;
   var t = o.tree;
   var r = o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      // 建立底板
      var hp = o.hPanel;
      hp.style.border = '1 solid red';
      o.attachEvent('onNodeEnter', hp, o.onNodeEnter);
      o.attachEvent('onNodeLeave', hp, o.onNodeLeave);
      o.attachEvent('onNodeClick', hp);
      // 建立节点底版
      var hnp = o.hNodePanel = RBuilder.appendCell(hp, o.style('NodePanel'));
      hnp.noWrap = true;
      // 建立图片
      var ni = o.child ? t.iconPlus : t.iconNode;
      var hi = o.hImage = RBuilder.appendIcon(hnp, ni, o.style('Image'), 16, 16);
      hi._linkType = 'image';
      // 建立图标
      var ni = RString.nvl(o.icon, o.type ? o.type.icon : null);
      if(ni){
         var hi = o.hIcon = RBuilder.appendIcon(hnp, ni, o.isValid ? o.style('Icon') : o.style('IconDisable'), 16, 16);
      }else{
        var hi = o.hIcon = RBuilder.appendIcon(hnp, t.iconEmpty, o.isValid ? o.style('Icon') : o.style('IconDisable'), 1, 1);
      }
      hi._linkType = 'icon';
      // 建立复选框
      if(t.dispChecked){
         var hc = o.hCheck = RBuilder.appendCheck(hnp);
         hc.width = 13;
         hc.height = 13;
         hc.style.borderWidth = 0;
         o.setCheck(o.checked);
         t.linkEvent(o, 'onNodeCheckClick', hc);
      }
      // 建立显示文本
      var text = '&nbsp;' + o.label;
      if(o.tag){
         text += '&nbsp;<FONT color=blue>(' + o.tag + ')</FONT>';
      }
      if(o.note){
         text += '&nbsp;<FONT color=green>[ ' + o.note + ' ]</FONT>';
      }
      var hl = o.hLabel = RBuilder.appendText(hnp, text);
      hl.style.font = 'icon';
      // 建立关联列
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

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
function FTreeNode_construct(){
   var o = this;
   o.base.FContainer.construct.call(o);
   // 初始化变量
   o.attributes = new TAttributes();
}

//==========================================================
// <T>是否有子节点。</T>
// 
//
// @method
// @return Boolean 是否有子节点
//==========================================================
function FTreeNode_hasChild(){
   var o = this;
   if(o.child){
      return o.nodes && o.nodes.count > 0;
   }
}

//==========================================================
// <T>查询顶层节点。</T>
//
// @method
// @param x:config:TNode 数据节点
//==========================================================
function FTreeNode_topNode(){
   var f = this;
   while(f.parentNode){
      f = f.parentNode;
   }
   return f;
}

//==========================================================
// <T>查询指定类型的顶层节点。</T>
//
// @method
// @param t:type:String 类型名称
//==========================================================
function FTreeNode_topNodeByType(t){
   var f = this;
   while(f){
      if(f.type.type == t){
         return f;
      }
      f = f.parentNode;
   }
}

//==========================================================
// <T>获取节点属性。</T>
//
// @method
// @param n:name:String 属性名称
// @return String 属性内容
//==========================================================
function FTreeNode_get(n){
   return this.attributes.get(n);
}

//==========================================================
// <T>设置节点属性。</T>
//
// @method
// @param n:name:String 属性名称
// @param v:value:String 属性内容
//==========================================================
function FTreeNode_set(n, v){
   this.attributes.set(n, v);
}

//==========================================================
// <T>获取节点选取。</T>
//
// @method
// @return Boolean 是否选取
//==========================================================
function FTreeNode_check(){
   return this.hCheck.checked;
}

//==========================================================
// <T>设置节点选取。</T>
//
// @method
// @param v:value:Boolean 是否选取
//==========================================================
function FTreeNode_setCheck(v){
   this.hCheck.checked = v;
   this.checked = v;
}

//==========================================================
// <T>创建子节点。</T>
//
// @method
// @param x:config:TXmlDco XML文件
//==========================================================
function FTreeNode_createChild(x){
   var r = null;
   if(x.isName('Node') || x.isName('TreeNode')){
      r = RClass.create(FTreeNode);
      r.tree = this.tree;
   }
   return r;
}

//==========================================================
// <T>从数据节点中加载数据内容。</T>
//
// @method
// @param x:config:TNode 数据节点
//==========================================================
function FTreeNode_loadConfig(x){
   var o = this;
   o.base.FContainer.loadConfig.call(o, x);
   // Property
   o.type = RObject.nvl(this.tree.types.get(x.get('type')), this.tree.type);
   // Attribute
   o.attributes.append(x.attrs);
   var attrs = x.get('attributes')
   if(attrs){
      o.attributes.unpack(attrs);
   }
}

//==========================================================
// <T>存储数据内容到数据节点中。</T>
//
// @method
// @param x:config:TNode 数据节点
//==========================================================
function FTreeNode_saveConfig(x){
   var o = this;
   o.base.FContainer.saveConfig.call(o, x);
   // Property
   var t = o.type;
   x.set('type', t.name);
   x.set('type_type', t.type);
   x.set('attributes', o.attributes.pack());
}

//==========================================================
// <T>从数据节点中加载数据内容。</T>
//
// @method
// @param x:config:TNode 数据节点
//==========================================================
function FTreeNode_loadNode(x){
   var o = this;
   var t = o.tree;
   // 获取属性
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
   //debugger;
   var ni = o.child ? t.iconPlus : t.iconNode;
   o.hImage.src = RResource.iconPath(ni);
   // 建立图标
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
   // 建立显示文本
   var text = '&nbsp;' + o.label;
   if(o.tag){
      text += '&nbsp;<FONT color=blue>(' + o.tag + ')</FONT>';
   }
   if(o.note){
      text += '&nbsp;<FONT color=green>[ ' + o.note + ' ]</FONT>';
   }
   o.hLabel.innerHTML = text;
}

//==========================================================
// <T>显示这个节点和他的子节点。</T>
//
// @method
//==========================================================
function FTreeNode_show(){
   var o = this;
   var t = o.tree;
   // 显示自己
   o.hPanel.style.display = 'block';
   // 显示所有子节点
   var ns = o.nodes;
   if(ns && ns.count){
      var nc = ns.count;
      for(var i=0; i<nc; i++){
         var n = ns.get(i);
         // 判断是否要加到树目录
         if(!n.__linked){
            t.appendNode(n, o);
         }
         // 判断是否要显示
         if(n.__display){
            n.hPanel.style.display = 'block';
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

//==========================================================
// <T>显示或隐藏子目录。</T>
//
// @method
// @param flag:Flag:Boolean 判断参数
//==========================================================
function FTreeNode_extend(flag){
   var o = this;
   var t = o.tree;
   if(!o.loaded && o.child){
      // 从服务器加载当前节点
      if(t.__loading){
         //return alert(RContext.get('FTreeView:waiting'));
         return;
      }
      // 加载节点
      t.loadNode(o);
   }else{
      // 设置图片
      if(o.hImage && !o.hasChild()){
         o.hImage.src = RResource.iconPath(t.iconNode);
         return false;
      }
      o._extended = flag;
      if(o.child && o.hImage){
         o.hImage.src = RResource.iconPath(flag ? t.iconMinus : t.iconPlus);
      }
      // 展开和隐藏节点
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

//==========================================================
// <T>选中当前节点。</T>
//
// @method
// @param v:value:Boolean 是否选中
//==========================================================
function FTreeNode_select(v){
   var o = this;
   o._selected = v;
   if(v){
      o._hover = false;
   }
   o.refreshStyle();
}

//==========================================================
// <T>设置当前节点的层次。</T>
//
// @method
// @param l:level:Integer 层次
//==========================================================
function FTreeNode_setLevel(l){
   var o = this;
   var t = o.tree;
   o.level = l;
   o.hImage.style.marginLeft = t.indent * l;
}

//==========================================================
// <T>把一个树节点追加到当前节点内。</T>
//
// @method
// @param c:control:FContainer 控件对象
//==========================================================
function FTreeNode_push(c){
   var o = this;
   var t = o.tree;
   o.base.FContainer.push.call(o, c);
   if(RClass.isClass(c, FTreeNode)){
      o.child = true;
      o.loaded = true;
      // 记住对象
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

//==========================================================
// <T>刷新节点的样式。</T>
//
// @method
//==========================================================
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

//==========================================================
// <T>重新加载节点。</T>
//
// @method
// @param t:top:Boolean 是否顶层节点
//==========================================================
function FTreeNode_reload(t){
   var o = this;
   if(t){
      o.tree.reload();
   }else{
      o.tree.reloadNode(o);
   }
}

//==========================================================
// <T>重新加载父节点。</T>
//
// @method
//==========================================================
function FTreeNode_reloadParent(){
   var o = this;
   if(o.parentNode){
      o.tree.reloadNode(o.parentNode);
   }else{
      o.tree.reload();
   }
}

//==========================================================
// <T>加载一个查询节点。</T>
//
// @method
// @param x:node:TNode 设置节点
//==========================================================
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

//==========================================================
// <T>删除当前节点。</T>
//
// @method
//==========================================================
function FTreeNode_remove(){
   var o = this;
   if(o.__linked){
      // 删除所有子
      if(o.nodes){
         o.removeChildren();
      }
      // 删除自己
      o.tree.freeNode(o);
   }
}

//==========================================================
// <T>删除当前节点和所有子节点。</T>
//
// @method
//==========================================================
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

//==========================================================
// <T>点击当前节点。</T>
//
// @method
//==========================================================
function FTreeNode_click(){
   var o = this;
   var t = o.tree;
   t.selectNode(o, true);
   t.lsnsClick.process(t, o);
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FTreeNode_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.hNodePanel = null;
   o.hImage = null;
   o.hIcon = null;
   o.hCheck = null;
   o.hLabel = null;
}

//==========================================================
// <T>获得运行时内部信息。</T>
//
// @method
// @param s:dump:TString 调试内容
//==========================================================
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
































//==========================================================
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

//==========================================================
// 到节点的子节点里找找一个节点
//
// @method
// @param u:uuid:String 节点的XML表示字符串
// @return FTreeNode 节点对象
//==========================================================
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



//==========================================================
// 把改变过的节点存放到树的节点里
//
// @method
//==========================================================
function FTreeNode_pushChanged(trd){
   var o = this;
   //if(o.checkChanged()){
    var d = new TNode();
    d.attrs = o.attributes;
    if(d.attrs){
         d.attrs.set('checked', RBoolean.toString(o.check()));
    }
    trd.push(d);
   //}
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

//==========================================================
// 到节点的子节点里找找一个节点
//
// @method
// @param u:uuid:String 节点的XML表示字符串
// @return FTreeNode 节点对象
//==========================================================
function FTreeNode_checkChanged(){
   var o = this;
   if(o.checked != o.check()){
      return true;
   }
   return false;
}

//---------------------------------------------------
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

//---------------------------------------------------
function FTreeNode_isFolder(){
   if(this.type){
       return (this.type.typeName == 'collections') ? true : false;
   }
}
