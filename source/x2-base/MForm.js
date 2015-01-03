/***********************************************************
 * <T>表单对象的管理类。</T>
 *
 * @tool
 * @author maocy
 * @version 1.0.1
 **********************************************************/
function MForm(o){
   o = RClass.inherits(this, o);
   // Method
   o.getFormLink =  RMethod.virtual(o, 'getFormLink');
   return o;
}
