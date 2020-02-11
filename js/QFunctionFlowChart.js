/**
 * 函数方法调用流程图
 * 根据数据显示函数的内部函数调用流程【注意】仅内部函数调用流程，并非全部代码
 * 点击内部调用的函数，可以继续展开此内部函数的内部流程图
 * 所属库：请在引用此文件前，先引用下面的文件
 * jquery.js
 * jsplumb.js
 */
var QFunctionFlowChart = QFunctionFlowChart || {}
/* 
 * options参数设置
 * id ：绘制流程图的DIV容器ID
 * config ：配置jsplumb的设置
 * data ：数据
 */
QFunctionFlowChart.chart = function(options)
{
     // jsplumb对象
     this.mJsPlumbObj = null;
     // 每个节点的id序号 - 每创建一个加1
     this.mNodeIndex = 1;
     // 保存配置数据
     this.options = options;
     //
     this.mChartID = null;
     /**
      * 初始化创建绘图
      * @param options 传入的创建配置
      */
     this.create = function(options)
     {
         this.mChartID =  "chart_"+QFunctionFlowChart.CHART_ID + 1;
         QFunctionFlowChart.CHART_ID = QFunctionFlowChart.CHART_ID + 1;
         var chart_canvas = $(QFunctionFlowChart.DefualtChartTemp.replace("$CHART_ID", this.mChartID));
         $("#"+options.id).empty();
         $("#"+options.id).append(chart_canvas);
         jsPlumb_config =  QFunctionFlowChart.DefualtJsPlumb;
         this.mJsPlumbObj = jsPlumb.getInstance(jsPlumb_config);
         this.mJsPlumbObj.setContainer(this.mChartID);
         this.init_node_data();
     }
     /**
      * 初始化节点数据
      */
     this.init_node_data = function()
     {
        this.mNodeIndex = 0;
        if(this.options.hasOwnProperty("createNodes"))
        {
            this.options["createNodes"](this);
        }
     }
     /**
      * 添加节点
      * @param data 节点数据
      */
     this.OnCreateNode = function(data, kwargs)
     {
        this.mNodeIndex += 1;
        var item_id = this.mChartID + "_item_" + this.mNodeIndex;
        if(this.options.hasOwnProperty("nodeFormatEvent"))
        {
            this.options['nodeFormatEvent'](this, item_id, data, kwargs);
        }else
        {
            var node = this.private_create_node(item_id, data);
            this.addHtmlNode(node);
        }
        return item_id;
     }
     /**
      * 连线
      * @param src_id 源节点ID
      * @param des_id 目标节点ID
      * @param anchor 锚点的位置数组类似['Left', 'Right']
      */
     this.OnConnect = function(src_id, des_id, anchor, label, label_css)
     {
        var label = label || "";
        var label_css = label_css || "csslabel";
        this.mJsPlumbObj.connect({
            source:src_id,
            target:des_id,
            anchor: anchor,
            overlays:[
                ['PlainArrow', { width: 12, length: 12, location: 0.8 }],
                [ "Label", { label:label,cssClass:label_css} ]
            ]
        })
     }
     /**
      * 添加节点
      * @param html_node
      */
     this.addHtmlNode = function(html_node)
     {
        $("#"+this.mChartID).append(html_node);
     }
     /**
      * 内部创建节点
      * @param item_id 节点id
      * @param data 节点数据
      */
     this.private_create_node = function(item_id, data)
     {
        var item_name = data['name'];
        var item_node = QFunctionFlowChart.DefaultChartNode.replace("$ITEM_ID", item_id).replace("$VALUE", item_name);
        return item_node;
     }

     this.redraw = function()
     {
        this.mJsPlumbObj.setSuspendDrawing(false,true); //立即触发重绘
     }

     // 执行初始化创建
     this.create(options);
}
/**
 * 计算节点横向或纵向排布的间隔
 * @param count 横向或者纵向节点的数量
 */
QFunctionFlowChart.layoutInterval = function(count)
{
    var is_jishu = count % 2 == 0 ? 0 : 1;
    var min_v = Math.floor(count / 2 );
    // 间隙列表
    var interval_indexs = [];
    for(var i = -min_v; i <= min_v; i++)
    {
        if(i == 0 && is_jishu == 1)
            interval_indexs.push(i);
        else if(i != 0)
            interval_indexs.push(i * (is_jishu == 1? 1: 0.5));
    }
    return interval_indexs;
}
/**
 * 默认jsplumb配置
 */
QFunctionFlowChart.DefualtJsPlumb = {
    //连线类型，有直线:Straight，折线:Flowchart,状态机:StateMachine 等
    Connector : [ "Bezier", { curviness:50 } ],
    //拖动的时候
    //DragOptions : { cursor: "pointer", zIndex:2000 },
    //锚点样式
    EndpointStyle: {fill: '#FF0000',outlineStroke: '#00FF00',strokeWidth: 1, radius:5, width:5,height:5},
    //连线的样式
    PaintStyle : { stroke:"#5c96bc", lineWidth:4},
    //hover时线样式
    HoverPaintStyle: {strokeStyle: "#1e8151", lineWidth: 2 },
    //hover时点的样式
    EndpointHoverStyle:{fillStyle:'red'},
    //连线箭头和标签
    /*ConnectionOverlays:[
        ['PlainArrow', { width: 12, length: 12, location: 0.8 }],//这个是鼠标拉出来的线的属性
        [ "Label", { label:"关联",cssClass:"csslabel"} ]
    ],*/
}

QFunctionFlowChart.CHART_ID = 0;
QFunctionFlowChart.DefualtChartTemp = '<div class="function-chart" style="position: relative;" id="$CHART_ID"></div>';
QFunctionFlowChart.DefaultChartNode = '<div style="padding: 5px 20px;margin: 5px 10px;position: absolute;border: 1px solid rgb(35, 35, 36);border-radius:0px;background:#FFF;cursor:pointer;" id="$ITEM_ID">$VALUE</div>';