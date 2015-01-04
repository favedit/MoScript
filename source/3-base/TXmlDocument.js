//============================================================
// <T>配置文档。</T>
//
// @tool
// @param r:rootNode:TNode 根节点
// @author maocy
// @version 150104
//============================================================
function TXmlDocument(o, r){
   if(!o){o = this;}
   // @attribute
   o._root  = r;
   // @method
   o.create = TXmlDocument_create;
   o.root   = TXmlDocument_root;
   o.xml    = TXmlDocument_xml;
   o.dump   = TXmlDocument_dump;
   return o;
}

//============================================================
// <T>创建一个节点对象。</T>
//
// @method
// @param n:name:String 节点名称
// @param as:attributes:TAttributes 节点属性
// @param v:value:String 节点名称
// @return TXmlNode 节点对象
//============================================================
function TXmlDocument_create(n, as, v){
   var r = new TXmlNode();
   r._name = n;
   r._attributes = as;
   r._value = v;
   return r;
}

//============================================================
// <T>获得文档的根节点。</T>
// <P>如果文档的根节点不存在，则创建一个新的根节点。</P>
//
// @method
// @return TXmlNode 根节点
//============================================================
function TXmlDocument_root(){
   var o = this;
   var r = o._root;
   if(!r){
      r = o._root = new TXmlNode('Configuration');
   }
   return r;
}

//============================================================
// <T>构建XML文档内容。</T>
//
// @method
// @return TString XML文档
//============================================================
function TXmlDocument_xml(){
   var s = new TString();
   s.append("<?xml version='1.0' encoding='UTF-8'?>");
   this.root().xml(s);
   return s;
}

//============================================================
// <T>获得内部调试信息。</T>
//
// @method
// @param d:dump:TString 字符串对象
// @return TString 含内部调试信息的字符串对象
//============================================================
function TXmlDocument_dump(d){
   var o = this;
   d = RString.nvlStr(d);
   d.appendLine(RClass.name(o));
   o.root().dump(d);
   return d;
}
