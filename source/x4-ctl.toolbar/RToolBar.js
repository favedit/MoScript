/**************************************************************
 * 工具栏类的引用类
 *
 * @reference
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
var RToolBar = new function(){
   var o = this;
   // Member
   o.mergeNode    = RToolBar_mergeNode;
   o.fromNode     = RToolBar_fromNode;
   // Construct
   RMemory.register('RToolBar', o);
   return o;
}

// ------------------------------------------------------------
function RToolBar_mergeNode(xtb, xNode, r){
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

/**************************************************************
 * 过滤页面中的xml把toolbar的XML送到RControl.fromNode来处理
 *
 * @method
 * @param c:config:TNode 页面中的XML节点
 * @param p:panel:HTML 放置的位置
 * @param r:remove:Boolean 是否要移出webform中的toolbar 的xml
 * @return Object 返回这个工具条控件
 **************************************************************/
function RToolBar_fromNode(c, p, r){
   if(c && c.nodes){
      var xtb = null;
      var ns = c.nodes;
      // 建立工具栏的XML节点
      for(var j=0; j<ns.count; j++){
         var n = ns.get(j);
         if('ToolBar' == n.name){
            if(!xtb){
               // 获得工具栏定义
               xtb = n;
            }else if(n.nodes){
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
               ns.extract(n);
            }
         }
      }
      // 建立工具栏
      if(xtb){
         return RControl.fromNode(xtb, p);
      }
   }
}
