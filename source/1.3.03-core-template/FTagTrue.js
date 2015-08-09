//==========================================================
// <T>标签判断真类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
MO.FTagTrue = function FTagTrue(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   //..........................................................
   // @attribute
   o._trimLeft = true;
   o._source   = null;
   //..........................................................
   // @event
   o.onBegin   = MO.FTagTrue_onBegin;
   //..........................................................
   // @method
   o.set       = MO.FTagTrue_set;
   o.toString  = MO.FTagTrue_toString;
   return o;
}

//==========================================================
// <T>开始处理。</T>
//
// @method
// @param p:context:FTagContext 环境
// @return EResult 处理结果
//==========================================================
MO.FTagTrue_onBegin = function FTagTrue_onBegin(p){
   var o = this;
   var r = false;
   var ns = o._source.split('|');
   var c = ns.length;
   for(var i = 0; i < c; i++){
      var n = ns[i]
      var v = p.get(n);
      if(MO.Lang.Boolean.parse(v)){
         r = true;
         break;
      }
   }
   return r ? MO.EResult.Continue : MO.EResult.Skip;
}

//==========================================================
// <T>设置属性值。</T>
//
// @method
// @param n:name:String 名称
// @param v:level:Integer 内容
//==========================================================
MO.FTagTrue_set = function FTagTrue_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}


//==========================================================
//<T>获得字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.FTagTrue_toString = function FTagTrue_toString(){
   var o = this;
   return 'source=' + o._source;
}
