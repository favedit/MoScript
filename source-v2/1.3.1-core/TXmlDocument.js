//==========================================================
// <T>配置文档。</T>
//
// @tool
// @author maocy
// @version 150104
//==========================================================
function TXmlDocument(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o._root   = null;
   //..........................................................
   // @method
   o.create  = TXmlDocument_create;
   o.root    = TXmlDocument_root;
   o.setRoot = TXmlDocument_setRoot;
   o.xml     = TXmlDocument_xml;
   o.dump    = TXmlDocument_dump;
   return o;
}

//==========================================================
// <T>创建一个节点对象。</T>
//
// @method
// @param n:name:String 节点名称
// @param a:attributes:TAttributes 节点属性
// @param v:value:String 节点名称
// @return TXmlNode 节点对象
//==========================================================
function TXmlDocument_create(n, a, v){
   var r = new TXmlNode();
   r._name = n;
   r._attributes = a;
   r._value = v;
   return r;
}

//==========================================================
// <T>获得文档的根节点。</T>
// <P>如果文档的根节点不存在，则创建一个新的根节点。</P>
//
// @method
// @return TXmlNode 根节点
//==========================================================
function TXmlDocument_root(){
   var o = this;
   var r = o._root;
   if(!r){
      r = o._root = new TXmlNode();
      r._name = 'Configuration';
   }
   return r;
}

//==========================================================
// <T>设置文档的根节点。</T>
//
// @method
// @param p:node:TXmlNode 根节点
//==========================================================
function TXmlDocument_setRoot(p){
   var o = this;
   if(!o._root){
      o._root = p;
   }else{
      throw new TError(o, 'Root node is already exists.');
   }
}

//==========================================================
// <T>获得配置字符串。</T>
//
// @method
// @return String 配置字符串
//==========================================================
function TXmlDocument_xml(){
   var s = new TString();
   s.append("<?xml version='1.0' encoding='UTF-8'?>");
   this.root().innerXml(s, 0);
   return s.flush();
}

//==========================================================
// <T>获得内部调试信息。</T>
//
// @method
// @return String 调试信息
//==========================================================
function TXmlDocument_dump(){
   var o = this;
   var r = new TString();
   r.appendLine(RClass.name(o));
   o.root().innerDump(r);
   return r.flush();
}
