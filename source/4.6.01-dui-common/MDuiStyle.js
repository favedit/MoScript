//==========================================================
// <T>样式接口。</T>
//
// @face
// @author maocy
// @version 150101
//==========================================================
MO.MDuiStyle = function MDuiStyle(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.construct     = MO.Method.empty;
   // @method
   o.styleName     = MO.MDuiStyle_styleName;
   o.styleIcon     = MO.MDuiStyle_styleIcon;
   o.styleIconPath = MO.MDuiStyle_styleIconPath;
   // @method
   o.dispose       = MO.Method.empty;
   return o;
}

//==========================================================
// <T>获得定义的样式名称。</T>
// <P>样式不存在的话，产生例外。</P>
//
// @param name:String 名称
// @param method:Function 类对象
// @return String 样式名称
//==========================================================
MO.MDuiStyle_styleName = function MDuiStyle_styleName(name, method){
   var o = this;
   var findMethod = method ? method : o;
   var className = MO.Class.name(findMethod);
   var clazz = MO.Class.forName(className);
   return clazz.style(name);
}

//==========================================================
// <T>获得定义的样式图标名称。</T>
//
// @param name:String 名称
// @param method:Function 类对象
// @return String 图标名称
//==========================================================
MO.MDuiStyle_styleIcon = function MDuiStyle_styleIcon(name, method){
   var className = MO.Class.name(method ? method : this, true);
   return className + '_' + name;
}

//==========================================================
// <T>获得定义的样式图标路径。</T>
//
// @param name:String 名称
// @param method:Function 类对象
// @return String 图标路径
//==========================================================
MO.MDuiStyle_styleIconPath = function MDuiStyle_styleIconPath(name, method){
   var className = MO.Class.name(method ? method : this, true);
   var iconName = className + '_' + name;
   return MO.RResource.iconPath(iconName);
}
