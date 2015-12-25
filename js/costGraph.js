function CostGraph() {
	var me = this;
	me.graphElemId = "Graph-View";
	me.costGraphView = null;
	me.lineChartData = {
		labels : [],
		datasets : [
			{
				label: "cost",
				fillColor : "rgba(255,255,255,0.2)",
				strokeColor : "blue",
				pointColor : "blue",
				data : []
			}
		]
	};
	me.options = {
		bezierCurve: true,
		animation: false,
		showTooltips: false,
		scaleOverride : false,
		scaleSteps : 6,
		scaleStepWidth : 0.1,
		scaleStartValue : 0,
		scaleShowLabels: true,
		responsive:false,
		pointDotRadius : 1,
		datasetFill : true,
		datasetStroke : false,
		datasetStrokeWidth : 1,
		scaleShowGridLines: false
	};

	me.init = function() {
		if (me.costGraphView != null) {
			$("#"+me.graphElemId).remove();
			me.costGraphView.destroy();
			$("body").prepend("<canvas id="+me.graphElemId+"></canvas>");
			me.costGraphView = null;
		}
		var ctx = document.getElementById(me.graphElemId).getContext("2d");
		ctx.canvas.width = 600;
		ctx.canvas.height = 200;
		me.lineChartData.datasets[0].data = [];
		me.lineChartData.labels = [];
		me.costGraphView = new Chart(ctx).Line(me.lineChartData, me.options);
	}

	me.addData = function(x) {
		me.costGraphView.addData([x], "");
	}
}
