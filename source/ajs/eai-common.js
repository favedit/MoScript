MO.EEaiChapter = new function EEaiChapter(){
   var o = this;
   o.Chart   = 'chart';
   o.Cockpit = 'cockpit';
   return o;
}
MO.EEaiConstant = new function EEaiConstant(){
   var o = this;
   o.DefaultCountry = "china";
   o.LogicService   = "eai.logic.service";
   o.ServiceHost    = "eai.host.service";
   o.Resource       = "eai.resource";
   return o;
}
MO.EEaiRate = new function EEaiRate(){
   var o = this;
   o.Line            = 0;
   o.Map             = 1;
   o.Investment      = 2;
   o.InvestmentRange = 3;
   return o;
}
MO.EEaiScene = new function EEaiScene(){
   var o = this;
   o.Group                    = 'group';
   o.GroupReport              = 'group.report';
   o.Company                  = 'company';
   o.Country                  = 'country';
   o.ChartTotal               = 'chart.total';
   o.ChartHistory             = 'chart.history';
   o.ChartCustomer            = 'chart.customer';
   o.ChartMarketer            = 'chart.marketer';
   o.ChartDepartment          = 'chart.department';
   o.ChartLive                = 'chart.live';
   o.ChartWorld               = 'chart.world';
   o.ChartSales               = 'chart.sales';
   o.ChartIndustry             = 'chart.industry';
   o.ChartInvestment           = 'chart.investment';
   o.ChartPerformence          = 'chart.performence';
   o.ChartCustomer             = 'chart.customer';
   o.ChartCustomerInvestment3d = 'chart.customer.investment.3d';
   o.ChartCustomerSphere       = 'chart.customer.sphere';
   o.ChartMarketerCustomer     = 'chart.marketer.customer';
   o.ChartMarketerMarketer     = 'chart.marketer.marketer';
   o.ChartMarketerManage       = 'chart.marketer.manage';
   o.ChartDepartmentCustomer   = 'chart.department.customer';
   o.ChartDepartmentMarketer   = 'chart.department.marketer';
   o.ChartDepartmentDepartment = 'chart.department.department';
   o.ChartStatisticsMarketer   = 'chart.statistics.marketer';
   o.ChartPerformenceMarketer  = 'chart.performence.marketer';
   o.ChartMarketerProduct      = 'chart.marketer.product';
   o.Cockpit                   = 'cockpit';
   o.ChartShow1019             = 'chart.show.1019';
   o.ChartShow1022             = 'chart.show.1022';
   o.ChartShow1022MktCtm       = 'chart.show.1022MktCtm';
   o.ChartSesameFinancial      = 'chart.sesame.financial';
   return o;
}
MO.Eai = new function FEai(){
   var o = this;
   o.Application = null;
   o.Canvas      = null;
   return o;
}
