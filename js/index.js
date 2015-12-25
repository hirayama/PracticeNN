
window.onload = function(){

	// graph init
	window._costGraph = new CostGraph();

	// get query
	var qs = (function(a) {
		if (a == "") {
			return {};
		}
		var b = {};
		for (var i = 0; i < a.length; ++i) {
			var p=a[i].split('=', 2);
			if (p.length == 1) {
				b[p[0]] = "";
			} else {
				b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
			}
		}
		return b;
	})(window.location.search.substr(1).split('&'));

	// NN
	var w = qs['w'] == undefined ? 0.6 : parseFloat(qs['w']);
	var b = qs['b'] == undefined ? 0.9 : parseFloat(qs['b']);
	var eta = qs['eta'] == undefined ? 0.15 : parseFloat(qs['eta']);
	var cost_func_type = qs['cost_func'] == undefined ? COST_MSE : parseInt(qs['cost_func']);
	var is_log = qs['is_log'] == undefined ? 0 : parseInt(qs['is_log']);
	window._simpleNN = new SimpleNN();
	_simpleNN.set_eta(eta);
	_simpleNN.set_first_w(w);
	_simpleNN.set_first_b(b);
	_simpleNN.set_cost_func(cost_func_type);
	_simpleNN.set_input(1);
	_simpleNN.set_is_log(is_log);
	_simpleNN.init();
	var cost = 0;
	var trainIte = 0;
	var trainAmount = 300;
	var train_reset = false;

	// train loop
	window.train = function() {
		trainIte++;
		_simpleNN.train();
		cost = _simpleNN.get_cost();
		_costGraph.addData(cost);
		if (trainIte < trainAmount && !train_reset) {
			setTimeout('train()',1);
		} else {
			trainIte = 0;
			train_reset = false;
			_simpleNN.init();
		}
	}

	$('#run').on('click', function(){
		_costGraph.init();
		_simpleNN.init();
		if (trainIte > 0) train_reset = true;
		train();
	});
};
