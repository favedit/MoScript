function EResultCommandFace(){
   var o = this;
   o.TreeReload        = 'tree.reload';
   o.TreeParentRefresh = 'tree.parent.refresh';
   o.TreeNodeRefresh   = 'tree.node.refresh';
   o.PageRedirect      = 'page.redirect';
   return o;
}
var EResultCommand = new EResultCommandFace();
