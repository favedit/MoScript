//==========================================================
// <T>节点工具类。</T>
//
// @tool
// @author maocy
// @version 150104
//==========================================================
MO.TXmlNode = function TXmlNode(name){
   var o = this;
   MO.TNode.call(o, name);
   //..........................................................
   // @method
   o.create   = MO.TXmlNode_create;
   o.innerXml = MO.TXmlNode_innerXml;
   o.xml      = MO.TXmlNode_xml;
   o.toString = MO.TXmlNode_toString;
   return o;
}

//==========================================================
// <T>创建一个新的节点,并把这个节点放到父节点里。</T>
//
// @method
// @param n:name:String 名称
// @param a:attribtues:TAttributes 属性集合
// @return TNode 返回新建的节点
//==========================================================
MO.TXmlNode_create = function TXmlNode_create(n, a){
   var o = this;
   var r = new MO.TXmlNode();
   r._name = n;
   r._attributes = a;
   if(!MO.Class.isClass(a, MO.TAttributes)){
      var a = arguments;
      var len = a.length;
      for(var n = 1; n < len; n += 2){
         if(n + 1 < len){
            r.set(a[n], a[n+1]);
         }else{
            r._value = a[n];
         }
      }
   }
   o.push(r);
   return r;
}

//==========================================================
// <T>构建配置文本。</T>
//
// @method
// @param s:string:String 字符串对象
// @param l:level:Integer 层级
// @return String 构建成xml格式的字符串
//==========================================================
MO.TXmlNode_innerXml = function TXmlNode_innerXml(s, l){
   var o = this;
   s.appendRepeat('   ', l);
   s.append('<', o._name);
   var as = o._attributes;
   if(as){
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         s.append(' ', as.name(n), '="');
         MO.RXml.buildText(s, as.value(n));
         s.append('"');
      }
   }
   if(!o._nodes && (o._value == null)){
      s.append('/');
   }
   s.append('>\n');
   var ns = o._nodes;
   if(ns){
      var c = ns.count();
      for(var n = 0; n < c; n++){
         ns.get(n).innerXml(s, l + 1);
      }
   }
   MO.RXml.buildText(s, o._value)
   if(o._nodes || o._value != null){
      s.appendRepeat('   ', l);
      s.append('</', o._name, '>');
      s.append('\n');
   }
   return s;
}

//==========================================================
// <T>构建配置文本。</T>
//
// @method
// @return String 配置文本
//==========================================================
MO.TXmlNode_xml = function TXmlNode_xml(){
   var xml = new MO.TString();
   this.innerXml(xml, 0);
   return xml.flush();
}

//==========================================================
// <T>将构建成xml格式的字符串对象转换为字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.TXmlNode_toString = function TXmlNode_toString(){
   return this.xml().toString();
}
