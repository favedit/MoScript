/**************************************************************
 * 存放表格中一列的属性类
 *
 * @tool
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function TColumn(){
   var o = this;
   // Property
   o.align      = null;
   o.label      = null;
   o.width      = null;
   o.dataName   = null;
   // Method
   o.loadConfig = TColumn_loadConfig;
   o.saveConfig = TColumn_saveConfig;
   return o;
}

/**************************************************************
 * 从数据集中得到一列的属性值
 *
 * @method
 * @param c:config:TXmlDoc js中的xml节点
 **************************************************************/
function TColumn_loadConfig(c){
   this.align    = c.get('align');
   this.label    = c.get('label');
   this.width    = c.get('width');
   this.dataName = c.get('data_name');
}

function TColumn_saveConfig(c){
}

