// cost functions
const COST_MSE = 1;   // MSE: 最小二乗誤差
const COST_CROSS = 2; // CrossEntropy: 交差エントロピー

function SimpleNN() {

	var me = this;

	// log flag
	me.is_log = false;

	// node vars
	// 重みやバイアスの初期値、変数宣言
	me.first_w = 0.6;
	me.first_b = 0.9;
	me.w = me.first_w;
	me.b = me.first_b;

	// in/out
	// 入力値は常に1として、出力値を0で初期化
	me.input  = 1;
	me.output = 0;

	// for train vars
	// Correct value is always ZERO.: 正解値は常に0
	me.correct = 0;
	// Learning rate. : 学習率 η 初期化
	me.eta = 0.015;
	// Initialize cost value. : コスト値初期化
	me.cost = 0;
	// Initialze the cost function, select MSE. : コスト関数初期化、最小二乗誤差MSEを利用
	me.cost_func = null;
	me.cost_func_type = COST_MSE;
	// Iterator for training.: 訓練ステップイテレータ
	me.step = 0;


	// Initialize w and b.
	// 重みwとバイアスbを初期化
	me.init = function() {
		me.w = me.first_w;
		me.b = me.first_b;
	}

	// Setter for the first w value.
	// 重みの初期値を設定
	me.set_first_w = function(_w) {
		me.first_w = _w;
		me.w = _w;
	}

	// Setter for is_log
	// ログを吐き出すかセット
	me.set_is_log = function(_is_log) {
		me.is_log = _is_log;
	}

	// Setter for the first b value.
	// バイアスの初期値を設定
	me.set_first_b = function(_b) {
		me.first_b = _b;
		me.b = _b;
	}

	// Setter for the learning rate.
	// 学習率を設定する
	me.set_eta = function(_eta) {
		me.eta = _eta;
	}

	// Setter for the input value.
	// 固定入力値を変更するメソッド
	me.set_input = function(_input) {
		me.input = _input;
	}

	// Select the cost function by flag (COST_MSE or COST_CROSS).
	// 目的関数（コスト関数）を選択する
	me.set_cost_func = function(flag) {
		switch(flag) {
			case COST_MSE:
				me.cost_func = me._mse;
				me.cost_func_type = COST_MSE;
				break;
			case COST_CROSS:
				me.cost_func = me._cross;
				me.cost_func_type = COST_CROSS;
				break;
			default:
				me.cost_func = me._mse;
				me.cost_func_type = COST_MSE;
				break;
		}
	}

	// Getter for the output value.
	// 出力値を取得する
	me.get_output = function() {
		return me.output;
	}

	// Getter for the cost value.
	// コスト値を取得する
	me.get_cost = function() {
		return me.cost;
	}

	// Evaluation function (Sigmoid).
	// 評価関数 : シグモイド関数
	me.sigmoid = function(x) {
		return 1/(1+Math.exp(-x));
	}
	// Derivative of the evaluation function.
	// シグモイド関数の1次導関数
	me.sigmoid_derivative= function(x) {
		return me.sigmoid(x) * (1-me.sigmoid(x));
	}

	// Cost function: Mean Squared Error (MSE)
	// 目的関数: mse（最小二乗誤差）
	me._mse = function() {
		me.cost = Math.pow(me.correct - me.output,2)/2;
		return me.cost;
	}

	// Cost function: Cross Entropy
	// 目的関数: cross entropy (交差エントロピー)
	me._cross = function() {
		me.cost = -(me.correct*Math.log(me.output) + (1 - me.correct)*Math.log(1 - me.output));
		return me.cost;
	}

	// Optimizer : Simple Stochastic Gradient Descent
	// 最適化手法: SGD (確率的勾配降下法)
	me.simpleSGD = function() {
		z = me.w*me.input + me.b;
		switch (me.cost_func_type) {
			case COST_MSE:
				me.b = me.b - me.eta * me.output * me.sigmoid_derivative(z);
				me.w = me.w - me.eta * me.output * me.sigmoid_derivative(z)*me.input;
			break;
			case COST_CROSS:
				me.b = me.b - me.eta * (me.sigmoid(z) - me.correct);
				me.w = me.w - me.eta * me.input * (me.sigmoid(z) - me.correct);
			break;
		}
	}

	// 状態デバッグ
	me.log = function() {
		if (!me.is_log) {
			return;
		}
		console.log('[input] '+me.input);
		console.log('[output] '+me.output);
		console.log('[w] '+me.w);
		console.log('[b] '+me.b);
		console.log('[cost] '+me.cost);
		console.log(me.step,me.cost);
	}

	/**
	 * 
	 * Training w and b.
	 *
	 *	1. Calculate an output by the evaluation function (Sigmoid).
	 *	2. Calculate the cost by the cost function (MSE or CROSS).
	 *	3. Optimize w and b.
	 *
	 *	This method is expected to be called many times.
	 */
	me.train = function() {
		// ステップイテレーション
		me.step++;
		// output 計算
		me.output = me.sigmoid(me.w*me.input + me.b);
		// コスト計算
		me.cost_func();
		// 事前状態ログ
		me.log();
		// w,b更新
		me.simpleSGD();
		return me.output;
	};

	// test
	// テスト
	me.test = function() {
		// Procedure.
		_simpleNN = new SimpleNN();
		_simpleNN.set_eta(0.15);
		_simpleNN.set_first_w(0.6);
		_simpleNN.set_first_b(0.9);
		_simpleNN.set_input(1);
		_simpleNN.set_cost_func(COST_CROSS);
		_simpleNN.init();
		var train_amount = 300;
		for (i=0;i<train_amount;i++) _simpleNN.train();
	};
}
