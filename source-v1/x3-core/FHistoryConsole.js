/***********************************************************
 * <T>单个页面中的表单管理类。主要负责从表单的XML节点构建表单对象。</T>
 *
 * @console
 * @author MAOCY
 * @version 1.0.1
 **********************************************************/
function FHistoryConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope          = EScope.Page;
   /// @attribute TList<THistory> 历史对象集合
   o.historyIndex   = -1;
   /// @attribute TList<THistory> 历史对象集合
   o.historys       = null;
   // Method
   o.construct      = FHistoryConsole_construct;
   o.next           = FHistoryConsole_next;
   o.popup          = FHistoryConsole_popup;
   o.get            = FHistoryConsole_get;
   o.find           = FHistoryConsole_find;
   return o;
}

/***********************************************************
 * <T>构造函数。</T>
 *
 * @method
 **********************************************************/
function FHistoryConsole_construct(){
   var o = this;
   o.historys = new TList();
}

/***********************************************************
 * <T>构建指定表单名称的控件对象，并放置在指定HTML页面ID的位置。</T>
 *
 * @method
 * @param n:name:String 表单名称
 * @param h:html:HTML 页面元素的放置位置
 * @param b:Builder:Builder 构建器
 * @return MForm 表单实例
 **********************************************************/
function FHistoryConsole_next(){
   var o = this;
   var n = o.historyIndex + 1;
   var h = o.historys.get(n);
   if(!h){
      h = new THistory();
      o.historys.push(h);
   }
   o.historyIndex++;
   return h;
}

/***********************************************************
 * <T>获取指定表单名称的控件。</T>
 *
 * @method
 * @param id:id:Integer 表单id
 * @return FWebForm 表单控件结构
 **********************************************************/
function FHistoryConsole_popup(l){
   var n = o.historyIndex - l;
   if(n < 0){
      n = 0;
   }
   o.historyIndex = n;
   return o.historys.get(n);
}

/***********************************************************
 * <T>根据名称查找表单实例，如果不存在则创建一个。</T>
 *
 * @method
 * @param n:name:String 表单名称
 * @param h:html:HTML 页面元素的放置位置
 * @param b:Builder:Builder 构建器
 * @return MForm 表单实例
 **********************************************************/
function FHistoryConsole_get(n, h, b){
   var o = this;
   var f = o.forms.get(n);
   if(!f){
      f = o.createFromName(n, h, b);
   }
   return f;
}

//==========================================================
function FHistoryConsole_find(){
}
