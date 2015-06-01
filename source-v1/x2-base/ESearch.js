/***********************************************************
 * <T>搜索时的匹配类型枚举。</T>
 *
 * @enum
 * @type String
 * @author maocy
 * @version 1.0.1
 **********************************************************/
var ESearch = new function(){
   var o = this;
   /// @member 相等
   o.Equals = 'E';
   /// @member 开始
   o.Begin  = 'B';
   /// @member 结束
   o.End    = 'N';
   /// @member 相似
   o.Like   = 'L';
   /// @member 其中
   o.In     = 'I';
   /// @member 自定义方式
   o.Source = 'C';
   /// @member 时间
   o.Date = 'D';
   return o;
}
