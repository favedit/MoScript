//==========================================================
// <T>工具栏类的引用类。</T>
//
// @class
// @author maocy
// @version 150318
//==========================================================
MO.RDuiToolBar = function RDuiToolBar(){
   var o = this;
   return o;
}

//==========================================================
// <T>工具栏类的引用类。</T>
//
// @method
//==========================================================
MO.RDuiToolBar.prototype.mergeNode = function RDuiToolBar_mergeNode(xtb, xNode, r){
   var ns = xNode.nodes;
   // 建立工具栏的XML节点
   for(var j=0; j<ns.count; j++){
      var n = ns.get(j);
      if('ToolBar' == n.name){
         if(n.nodes){
            // 合并工具栏定义
            for(var i=0; i<n.nodes.count; i++){
               xtb.push(n.nodes.get(i));
            }
         }
      }
   }
   // 删除工具栏的XML节点
   if(r){
      for(var j=ns.count-1; j>=0; j--){
         var n = ns.get(j);
         if('ToolBar' == n.name){
            ns.removeItem(n);
         }
      }
   }
   return xtb;
}

//==========================================================
// <T>过滤页面中的xml把toolbar的XML送到RControl.fromNode来处理。</T>
//
// @method
// @param c:config:TNode 页面中的XML节点
// @param p:panel:HTML 放置的位置
// @param r:remove:Boolean 是否要移出webform中的toolbar 的xml
// @return Object 返回这个工具条控件
//==========================================================
MO.RDuiToolBar.prototype.fromNode = function RDuiToolBar_fromNode(control, config, panel, r){
   if(config && config._nodes){
      var xtb = null;
      var ns = config._nodes;
      // 建立工具栏的XML节点
      var jc = ns.count();
      for(var j = 0; j < jc; j++){
         var n = ns.getAt(j);
         if(n.isName('ToolBar')){
            if(!xtb){
               // 获得工具栏定义
               xtb = n;
            }else if(n.hasNode()){
               // 合并工具栏定义
               xtb.nodes().append(n.nodes());
            }
         }
      }
      // 删除工具栏的XML节点
      if(r){
         for(var i = 0; i < ns.count(); i++){
            var n = ns.getAt(i);
            if(n.isName('ToolBar')){
               ns.erase(i--);
            }
         }
      }
      // 建立工具栏
      if(xtb){
         RControl.build(control, xtb, null, panel);
      }
   }
}
//..........................................................
// 实例化内容
MO.RDuiToolBar = new MO.RDuiToolBar();
MO.Dui.ToolBar = MO.RDuiToolBar;
