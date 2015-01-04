//==========================================================
// <T>节点工具类。</T>
//
// @tool
// @author maocy
// @version 150104
//==========================================================
function TXmlNode(){
   var o = this;
   TNode(o);
   //..........................................................
   // @method
   o.create   = TXmlNode_create;
   o.innerXml = TXmlNode_innerXml;
   o.xml      = TXmlNode_xml;
   o.toString = TXmlNode_toString;
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
function TXmlNode_create(n, a){
   var r = new TNode();
   r._name = n;
   r._attributes = a;
   if(!RClass.isClass(attrs, TAttributes)){
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
   this.push(r);
   return r;
}

//==========================================================
// <T>构建配置文本。</T>
//
// @param s:string:String 字符串对象
// @return String 构建成xml格式的字符串
//==========================================================
function TXmlNode_innerXml(s){
   var o = this;
   s.append('<', o._name);
   var as = o._attributes;
   if(as){
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         s.append(' ', as.name(n), '="');
         RXml.buildText(s, as.value(n));
         s.append('"');
      }
   }
   if(!o._nodes && (o._value == null)){
      s.append('/');
   }
   s.append('>');
   var ns = o._nodes;
   if(ns){
      var c = ns.count();
      for(var n = 0; n < c; n++){
         ns.get(n).innerXml(s);
      }
   }
   RXml.buildText(s, o._value)
   if(o._nodes || o._value != null){
      s.append('</', o._name, '>');
   }
   return s;
}

//==========================================================
// <T>构建配置文本。</T>
//
// @return String 配置文本
//==========================================================
function TXmlNode_xml(s){
   var s = new TString();
   this.innerXml(s);
   return s.toString();
}

//==========================================================
// <T>将构建成xml格式的字符串对象转换为字符串。</T>
//
// @return String 字符串
//==========================================================
function TXmlNode_toString(){
   return this.xml().toString();
}
