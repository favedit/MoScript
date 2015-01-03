/***********************************************************
 * <T>更新数据集的参数信息类。</T>
 *
 * @tool
 * @param c:config:TXmlNode 结果内容
 * @param f:form:TForm 表单对象
 * @author maocy
 * @version 1.0.1
 **********************************************************/
function TMessageArg(c, f){
   var o = this;
   // Attribute
   o.config = c;
   o.form   = f;
   return o;
}
