// ============================================================
// FMenuBar
// ============================================================
function FMenuBar(o, create){
   if(!create){return this;}
   o = IClass.inherits(this, o, FControl, MDocument);
   // Attribute
   o.service         = 'menu.xml';
   o.focusNode       = null;
   o.isLoading       = false;
   o.indent          = 16;
   o.nodes           = new TList();
   o.allNodes        = new TList();
   o.types           = new TMap();
   // Event
   o.onNodeLoaded    = null;
   o.onNodeClick     = null;
   o.onNodeDblClick  = null;
   o.onBuild         = FMenuBar_onBuild;
   o.onLoaded        = FMenuBar_onLoaded;
   // Method
   o.connect         = FMenuBar_connect;
   o.release         = FMenuBar_release;
   o.dispose         = FMenuBar_dispose;
   return this;
}
// ------------------------------------------------------------
function FMenuBar_onBuild(builder){
   var doc = builder.document;
   // Bodu
   this.hBody = doc.createDiv();
   this.hBody.className = 'menu_panel';
   // Build
   this.hParent.insertBefore(this.hBody);
   // Complete
   builder.hParent = this.hBody;
}
// ------------------------------------------------------------
function FMenuBar_onLoaded(cnn){
   var doc = cnn.document;
   if(doc && doc.node){
      IControl.load(this, doc.node);
      this.build();
   }
}
// ------------------------------------------------------------
function FMenuBar_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hBody);
   RMemory.freeHtml(o.hParent);
   o.hBody = null;
   o.hParent = null;
}
// ------------------------------------------------------------
function FMenuBar_connect(type, action, attrs){
   // Build send info
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('type', type);
   root.set('action', action);
   root.create('Attributes').value = attrs;
   // Build xml connection
   var self = this;
   var cnn = new TXmlCnn();
   cnn.onLoad = function(){self.onLoaded(cnn)};
   cnn.send(this.service, doc);
}
// ------------------------------------------------------------
function FMenuBar_release(){
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
// ------------------------------------------------------------
