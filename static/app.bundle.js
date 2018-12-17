webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(11);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _IssueList = __webpack_require__(1);

	var _IssueList2 = _interopRequireDefault(_IssueList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var contentNode = document.getElementById('contents');
	_reactDom2.default.render(_react2.default.createElement(_IssueList2.default, null), contentNode);

	if (false) {
	  module.hot.accept();
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _IssueFilter = __webpack_require__(2);

	var _IssueFilter2 = _interopRequireDefault(_IssueFilter);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import IssueAdd from './IssueAdd.jsx';


	var IssueRow = function IssueRow(props) {
	  return _react2.default.createElement(
	    'tr',
	    null,
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue._id
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.status
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.owner
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.created.toDateString()
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.effort
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.completionDate ? props.issue.completionDate.toDateString() : ''
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.title
	    )
	  );
	};

	function IssueTable(props) {
	  var issueRows = props.issues.map(function (issue) {
	    return _react2.default.createElement(IssueRow, { key: issue._id, issue: issue });
	  });
	  return _react2.default.createElement(
	    'table',
	    { className: 'bordered-tatle' },
	    _react2.default.createElement(
	      'thead',
	      null,
	      _react2.default.createElement(
	        'tr',
	        null,
	        _react2.default.createElement(
	          'th',
	          null,
	          'Id'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Status'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Owner'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Created'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Effort'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Completion Date'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Title'
	        )
	      )
	    ),
	    _react2.default.createElement(
	      'tbody',
	      null,
	      issueRows
	    )
	  );
	}

	var IssueList = function (_React$Component) {
	  _inherits(IssueList, _React$Component);

	  function IssueList() {
	    _classCallCheck(this, IssueList);

	    var _this = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

	    _this.state = { issues: [] };
	    _this.createIssue = _this.createIssue.bind(_this);
	    return _this;
	  }

	  _createClass(IssueList, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.loadData();
	    }
	  }, {
	    key: 'loadData',
	    value: function loadData() {
	      var _this2 = this;

	      fetch('/api/issues').then(function (response) {
	        if (response.ok) {
	          response.json().then(function (data) {
	            data.records.forEach(function (issue) {
	              issue.created = new Date(issue.created);
	              if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
	            });
	            _this2.setState({ issues: data.records });
	          });
	        } else {
	          response.json().then(function (error) {
	            alert("fail to fetch issue:" + error.message);
	          });
	        }
	      }).catch(function (err) {
	        alert("error in fetching data to server" + err.message);
	      });
	    }
	  }, {
	    key: 'createIssue',
	    value: function createIssue(newIssue) {
	      var _this3 = this;

	      fetch('/api/issues', {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify(newIssue)
	      }).then(function (response) {
	        if (response.ok) {
	          response.json().then(function (updatedIssue) {
	            updatedIssue.created = new Date(updatedIssue.created);
	            if (updatedIssue.completionDate) {
	              updatedIssue.completionDate = new Date(updatedIssue.completionDate);
	            }
	            var newIssues = _this3.state.issues.concat(updatedIssue);
	            _this3.setState({ issues: newIssues });
	          });
	        } else {
	          response.json().then(function (err) {
	            alert("fail to add issue:" + err.message);
	          });
	        }
	      }).catch(function (err) {
	        alert("error in sending data to server" + err.message);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h1',
	          null,
	          'Issue Tracker'
	        ),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement(_IssueFilter2.default, null),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement(IssueTable, { issues: this.state.issues }),
	        _react2.default.createElement('br', null)
	      );
	    }
	  }]);

	  return IssueList;
	}(_react2.default.Component);

	exports.default = IssueList;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IssueFilter = function (_React$Component) {
	  _inherits(IssueFilter, _React$Component);

	  function IssueFilter() {
	    _classCallCheck(this, IssueFilter);

	    return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
	  }

	  _createClass(IssueFilter, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        'this is a placeholder for IssueFilter22'
	      );
	    }
	  }]);

	  return IssueFilter;
	}(_react2.default.Component);

	exports.default = IssueFilter;

/***/ })
]);