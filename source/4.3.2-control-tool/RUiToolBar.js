//==========================================================
// <T>工具栏类的引用类。</T>
//
// @class
// @author maocy
// @version 150318
//==========================================================
var RUiToolBar = new function RUiToolBar(){
   var o = this;
   // Member
   //o.mergeNode    = RUiToolBar_mergeNode;
   o.fromNode = RUiToolBar_fromNode;
   return o;
}

//==========================================================
// <T>工具栏类的引用类。</T>
//
// @method
//==========================================================
function RUiToolBar_mergeNode(xtb, xNode, r){
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
function RUiToolBar_fromNode(control, config, panel, r){
   if(config && config._nodes){
      var xtb = null;
      var ns = config._nodes;
      // 建立工具栏的XML节点
      var jc = ns.count();
      for(var j = 0; j < jc; j++){
         var n = ns.getAt(j);
         if(n.name() == 'ToolBar'){
            if(!xtb){
               // 获得工具栏定义
               xtb = n;
            }else if(n.nodes){
               // 合并工具栏定义
               var ns = n.nodes();
               var ic = ns.count();
               for(var i = 0; i < ic; i++){
                  xtb.push(ns.getAt(i));
               }
            }
         }
      }
      // 删除工具栏的XML节点
      if(r){
         for(var j = ns.count() - 1; j >= 0; j--){
            var n = ns.getAt(j);
            if(n.name() == 'ToolBar'){
               ns.remove(n);
               break;
            }
         }
      }
      // 建立工具栏
      if(xtb){
         RControl.build(control, xtb, null, panel);
      }
   }
}
