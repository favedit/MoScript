//==========================================================
// <T>获取数据集的参数信息类。</T>
//
// @tool
// @param fn:formName:String 表单名称
// @param cn:controlName:String 控件路径
// @param da:dataAction:String 命令名称
// @author MAOCY
// @version 1.0.1
//==========================================================
function TDatasetServiceArg(fn, da){
   var o = this;
   // Attribute
   o.formName    = fn;
   o.controlName = null;
   o.dataAction  = da;
   o.service     = null;
   o.action      = null;
   o.attributes  = new TAttributes();
   o.codes       = null;
   o.rows        = null;
   o.actionType  = 'process';
   o.values      = null;
   o.resultRows  = null;
   o.callback    = null;
   // Attribute
   o.hasData     = TDatasetServiceArg_hasData;
   o.toNode      = TDatasetServiceArg_toNode;
   o.invoke      = TDatasetServiceArg_invoke;
   o.push        = TDatasetServiceArg_push;
   return o;
}

//==========================================================
function TDatasetServiceArg_hasData(){
   var o = this;
   if(o.rows){
      return !o.rows.isEmpty();
   }
   return false;
}

//==========================================================
// <T>将当前信息存储为一个XML节点。</T>
//
// @method
// @return TNode XML节点
//==========================================================
function TDatasetServiceArg_toNode(){
   var o = this;
   // 创建根节点
   var nf = new TNode('Form');
   nf.set('name', o.formName);
   nf.set('control_name', o.controlName);
   nf.set('data_action', o.dataAction);
   // 属性行
   nf.push(new TNode('Dataset', o.attributes));
   // 代码行
   nf.push(new TNode('Code', o.codes));
   // 获得数据行
   var rs = o.rows;
   if(rs){
      var c = rs.count;
      for(var n=0; n<c; n++){
         nf.push(new TNode('Row', rs.get(n)));
      }
   }
   if(o.values && o.values.count > 0){
      var nd = new TNode('Values', o.values);
      nf.push(nd);
   }
   return nf;
}

//==========================================================
// <T>回调函数。</T>
//
// @method
//==========================================================
function TDatasetServiceArg_invoke(){
   var o = this;
   if(o.callback){
      o.callback.invoke(o);
   }
}

//==========================================================
function TDatasetServiceArg_push(r){
   var o = this;
   if(r){
      var rs = o.rows;
      if(!rs){
         rs = o.rows = new TList();
      }
      rs.push(r);
   }
}
