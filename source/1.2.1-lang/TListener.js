//==========================================================
// <T>监听器的工具类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
function TListener(o){
   if(!o){o = this;}
   // @attribute
   o.owner    = null;
   o.callback = null;
   // @method
   o.process  = TListener_process;
   o.dump     = TListener_dump;
   return o;
}

//==========================================================
// <T>监听器的工具类。</T>
// <P>响应处理时最多可以带5个参数。</P>
//
// @method
// @param s:sender:发出对象
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数2
// @param p3:parameter3:Object 参数3
// @param p4:parameter4:Object 参数4
// @param p5:parameter5:Object 参数5
//==========================================================
function TListener_process(s, p1, p2, p3, p4, p5){
   var o = this;
   if(o.callback){
      o.callback.call(o.owner ? o.owner : o, s, p1, p2, p3, p4, p5);
   }
}

//==========================================================
// <T>获得监听器的内部信息。</T>
//
// @method
// @return String 内部信息
//==========================================================
function TListener_dump(){
   var o = this;
   return RClass.name(o) + ' owner=' + RClass.name(o.owner);
}
