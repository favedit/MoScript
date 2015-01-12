//==========================================================
// <T>样式接口。</T>
//
// @face
// @author maocy
// @version 150101
//==========================================================
function MStyle(o){
   o = RClass.inherits(this, o);
   // @method
   o.style         = MStyle_style;
   o.styleIcon     = MStyle_styleIcon;
   o.styleIconPath = MStyle_styleIconPath;
   return o;
}

//==========================================================
// <T>获得定义的样式名称。</T>
// <P>样式不存在的话，产生例外。</P>
//
// @param n:name:String 名称
// @param c:class:TClass 类对象
// @return String 样式名称
//==========================================================
function MStyle_style(n, c){
   var r = RClass.find(c ? c : this, true);
   return r.style(n);
}

//==========================================================
// <T>获得定义的样式图标名称。</T>
//
// @param n:name:String 名称
// @param c:class:TClass 类对象
// @return String 图标名称
//==========================================================
function MStyle_styleIcon(n, c){
   return 'ctl.' + RClass.name(c ? c : this, true) + '_' + n;
}

//==========================================================
// <T>获得定义的样式图标路径。</T>
//
// @param n:name:String 名称
// @param c:class:TClass 类对象
// @return String 图标路径
//==========================================================
function MStyle_styleIconPath(n, c){
   return RResource.iconPath('ctl.' + RClass.name(c ? c : this, true) + '_' + n);
}
