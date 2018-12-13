/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _IssueList = __webpack_require__(1);

	var _IssueList2 = _interopRequireDefault(_IssueList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var contentNode = document.getElementById('contents');

	ReactDOM.render(React.createElement(_IssueList2.default, null), contentNode);

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import IssueAdd from './IssueAdd.jsx';


	var IssueRow = function IssueRow(props) {
	  return React.createElement(
	    'tr',
	    null,
	    React.createElement(
	      'td',
	      null,
	      props.issue._id
	    ),
	    React.createElement(
	      'td',
	      null,
	      props.issue.status
	    ),
	    React.createElement(
	      'td',
	      null,
	      props.issue.owner
	    ),
	    React.createElement(
	      'td',
	      null,
	      props.issue.created.toDateString()
	    ),
	    React.createElement(
	      'td',
	      null,
	      props.issue.effort
	    ),
	    React.createElement(
	      'td',
	      null,
	      props.issue.completionDate ? props.issue.completionDate.toDateString() : ''
	    ),
	    React.createElement(
	      'td',
	      null,
	      props.issue.title
	    )
	  );
	};

	function IssueTable(props) {
	  var issueRows = props.issues.map(function (issue) {
	    return React.createElement(IssueRow, { key: issue._id, issue: issue });
	  });
	  return React.createElement(
	    'table',
	    { className: 'bordered-tatle' },
	    React.createElement(
	      'thead',
	      null,
	      React.createElement(
	        'tr',
	        null,
	        React.createElement(
	          'th',
	          null,
	          'Id'
	        ),
	        React.createElement(
	          'th',
	          null,
	          'Status'
	        ),
	        React.createElement(
	          'th',
	          null,
	          'Owner'
	        ),
	        React.createElement(
	          'th',
	          null,
	          'Created'
	        ),
	        React.createElement(
	          'th',
	          null,
	          'Effort'
	        ),
	        React.createElement(
	          'th',
	          null,
	          'Completion Date'
	        ),
	        React.createElement(
	          'th',
	          null,
	          'Title'
	        )
	      )
	    ),
	    React.createElement(
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
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Issue Tracker'
	        ),
	        React.createElement('br', null),
	        React.createElement(_IssueFilter2.default, null),
	        React.createElement('br', null),
	        React.createElement(IssueTable, { issues: this.state.issues }),
	        React.createElement('br', null)
	      );
	    }
	  }]);

	  return IssueList;
	}(React.Component);

	exports.default = IssueList;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        null,
	        "this is a placeholder for IssueFilter"
	      );
	    }
	  }]);

	  return IssueFilter;
	}(React.Component);

	exports.default = IssueFilter;

/***/ })
/******/ ]);