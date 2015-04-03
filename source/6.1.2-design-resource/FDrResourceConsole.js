//==========================================================
// <T>设计资源控制台。</T>
//
// @class
// @author maocy
// @version 150331
//==========================================================
function FDrResourceConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   //..........................................................
   // @attribute
   o._serviceCode = 'cloud.content3d.resource';
   o._resources   = null;
   //..........................................................
   // @method
   o.construct    = FDrResourceConsole_construct;
   // @method
   o.fetch        = FDrResourceConsole_fetch;
   o.doDelete     = FDrResourceConsole_doDelete;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDrResourceConsole_construct(){
   var o = this;
   o.__base.FDrAbsResourceConsole.construct.call(o);
   // 初始化属性
   o._resources = new TDictionary();
}

//==========================================================
// <T>查询数据内容。</T>
//
// @method
// @param typeCd:String 类型代码
// @param serach:String 搜索内容
// @param order:String 排序内容
// @param pageSize:Integer 分页大小
// @param page:Integer 分页
//==========================================================
function FDrResourceConsole_fetch(typeCd, search, order, pageSize, page){
   var o = this;
   // 发送数据请求
   var url = '/' + o._serviceCode + '.ws?action=fetch&type_cd=' + typeCd + '&serach=' + serach + '&order=' + order + '&page_size=' + pageSize + '&page=' + page;
   return RConsole.find(FXmlConsole).sendAsync(url);
}

//==========================================================
// <T>删除一条数据记录。</T>
//
// @method
// @param typeCd:String 资源类型
// @param guid:String 唯一编号
//==========================================================
function FDrResourceConsole_doDelete(typeCd, guid){
   var o = this;
   var url = '/' + o._serviceCode + '.ws?action=delete&type_cd=' + typeCd + '&guid=' + guid;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
