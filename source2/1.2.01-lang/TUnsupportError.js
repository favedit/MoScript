with(MO){
   //==========================================================
   // <T>错误处理类。</T>
   //
   // @tool
   // @param po:sender:Object 发送者
   // @param pp:parameters:Object[] 参数集合
   // @author maocy
   // @version 150101
   //==========================================================
   MO.TUnsupportError = function TUnsupportError(po, pp){
      var o = this;
      var pm = 'Unsupport method. (name={1})'
      //..........................................................
      // @construct
      var r = new TString();
      // 建立函数调用信息
      var f = TUnsupportError.caller;
      var s = new TString();
      var t = new Array();
      while(f){
         if(RArray.contains(t, f)){
            break;
         }
         t.push(f);
         f = f.caller;
      }
      var c = t.length;
      for(var n = 0; n < c; n++){
         f = t[n];
         if(n > 0){
            s.appendLine();
         }
         s.append('   ' + (c - n) + ': ' + RMethod.name(f));
      }
      // 建立描述参数信息
      var a = arguments;
      var c = a.length;
      for(var n = 1; n < c; n++){
         var v = a[n];
         var vs = null;
         if(typeof(v) == 'function'){
            vs = RMethod.name(v);
         }else{
            vs = v;
         }
         pm = pm.replace('{' + (n - 1) + '}', vs);
      }
      r.appendLine(pm);
      r.appendLine('------------------------------------------------------------');
      r.append(s);
      throw new Error(r);
   }
}
