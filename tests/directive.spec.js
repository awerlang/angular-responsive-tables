/* global inject */
/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/jasmine/jasmine.d.ts"/>
describe('directive', function () {
	var $compile,
		$rootScope;
	
	beforeEach(module('wt.responsive'));
	beforeEach(inject(function (_$rootScope_, _$compile_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('header rows are visible but offscreen', function () {
		var markup = [
		    '<table wt-responsive-table>',
		    '    <thead>',
		    '        <tr>',
		    '            <th>First title</th>',
		    '            <th>Second title</th>',
		    '            <th>Third title</th>',
		    '            <th>Forth title</th>',
		    '        </tr>',
		    '    </thead>',
		    '    <tbody>',
		    '        <tr>',
		    '            <td>First column</td>',
		    '            <td>Second column</td>',
		    '            <td>Third column</td>',
		    '            <td>Forth column</td>',
		    '        </tr>',
		    '        <tr>',
		    '            <td>First column</td>',
		    '            <td>Second column</td>',
		    '            <td>Third column</td>',
		    '            <td>Forth column</td>',
		    '        </tr>',
		    '    </tbody>',
		    '</table>'
		].join('');
		var element = angular.element(markup);
		document.body.appendChild(element[0]);
		$compile(element);
		$rootScope.$digest();

		var headerRow = element.find('tr th');
		expect(headerRow.is(':visible')).toBe(true);
		expect(headerRow.is(':offscreen')).toBe(true);
	});

	it('supports rows with no <thead>', function () {
		var markup = [
		    '<table wt-responsive-table>',
	    '        <tr>',
	    '            <th>First title</th>',
	    '            <th>Second title</th>',
	    '            <th>Third title</th>',
	    '            <th>Forth title</th>',
	    '        </tr>',
	    '        <tr>',
	    '            <td>First column</td>',
	    '            <td>Second column</td>',
	    '            <td>Third column</td>',
	    '            <td>Forth column</td>',
	    '        </tr>',
		    '</table>'
		].join('');
		var element = angular.element(markup);
		document.body.appendChild(element[0]);
		$compile(element);

		var firstDataRow = element.find('tr td');
		expect(firstDataRow.eq(0).attr('data-title')).toBe('First title');
		expect(firstDataRow.eq(1).attr('data-title')).toBe('Second title');
		expect(firstDataRow.eq(2).attr('data-title')).toBe('Third title');
		expect(firstDataRow.eq(3).attr('data-title')).toBe('Forth title');

		var headerRow = element.find('tr th');
		expect(headerRow.eq(0).attr('data-title')).toBeUndefined();
		expect(headerRow.eq(1).attr('data-title')).toBeUndefined();
		expect(headerRow.eq(2).attr('data-title')).toBeUndefined();
		expect(headerRow.eq(3).attr('data-title')).toBeUndefined();
	});

	it('supports <th> as first column of each <tr>', function () {
		var markup = [
		    '<table wt-responsive-table>',
	    '        <tr>',
	    '            <th>First title</th>',
	    '            <td>First column</td>',
	    '        </tr>',
	    '        <tr>',
	    '            <th>Second title</th>',
	    '            <td>Second column</td>',
	    '        </tr>',
	    '        <tr>',
	    '            <th>Third title</th>',
	    '            <td>Third column</td>',
	    '        </tr>',
	    '        <tr>',
	    '            <th>Forth title</th>',
	    '            <td>Forth column</td>',
	    '        </tr>',
		    '</table>'
		].join('');
		var element = angular.element(markup);
		document.body.appendChild(element[0]);
		$compile(element);

		var firstDataRow = element.find('tr td');
		expect(firstDataRow.eq(0).attr('data-title')).toBe('First title');
		expect(firstDataRow.eq(1).attr('data-title')).toBe('Second title');
		expect(firstDataRow.eq(2).attr('data-title')).toBe('Third title');
		expect(firstDataRow.eq(3).attr('data-title')).toBe('Forth title');

		var headerRow = element.find('tr th');
		expect(headerRow.eq(0).attr('data-title')).toBeUndefined();
		expect(headerRow.eq(1).attr('data-title')).toBeUndefined();
		expect(headerRow.eq(2).attr('data-title')).toBeUndefined();
		expect(headerRow.eq(3).attr('data-title')).toBeUndefined();
	});

	it('supports colspan', function () {
		var markup = [
		    '<table wt-responsive-table>',
		    '    <thead>',
		    '        <tr>',
		    '            <th>First title</th>',
		    '            <th>Second title</th>',
		    '            <th>Third title</th>',
		    '            <th>Forth title</th>',
		    '        </tr>',
		    '    </thead>',
		    '    <tbody>',
		    '        <tr>',
		    '            <td colspan="3">This cell spans for 3 columns</td>',
		    '            <td>Forth column</td>',
		    '        </tr>',
		    '        <tr>',
		    '            <td>First column</td>',
		    '            <td>Second column</td>',
		    '            <td>Third column</td>',
		    '            <td>Forth column</td>',
		    '        </tr>',
		    '    </tbody>',
		    '</table>'
		].join('');
		var element = angular.element(markup);

		var firstDataRow = element.find('tbody tr:first td');
		expect(firstDataRow.attr('data-title')).toBeUndefined();

		$compile(element);

		expect(firstDataRow.eq(0).attr('data-title')).toBe('First title');
		expect(firstDataRow.eq(1).attr('data-title')).toBe('Forth title');
	});

	it('support tables with multiple static rows', function () {
		var markup = [
		    '<table wt-responsive-table>',
		    '    <thead>',
		    '        <tr>',
		    '            <th>First title</th>',
		    '            <th>Second title</th>',
		    '            <th>Third title</th>',
		    '            <th>Forth title</th>',
		    '        </tr>',
		    '    </thead>',
		    '    <tbody>',
		    '        <tr>',
		    '            <td>First column</td>',
		    '            <td>Second column</td>',
		    '            <td>Third column</td>',
		    '            <td>Forth column</td>',
		    '        </tr>',
		    '        <tr>',
		    '            <td>First column</td>',
		    '            <td>Second column</td>',
		    '            <td>Third column</td>',
		    '            <td>Forth column</td>',
		    '        </tr>',
		    '    </tbody>',
		    '</table>'
		].join('');
		var element = angular.element(markup);

		var rows = element.find('tbody tr');

		$compile(element);

		rows.each(function (index, element) {
			var titles = Array.prototype.map.call(element.querySelectorAll('td'), function (item) {
				return item.getAttribute('data-title');
			});
			expect(titles).toEqual(['First title', 'Second title', 'Third title', 'Forth title']);
		});
	});

	it('supports ng-repeat applied on TR', function () {
		var markup = [
		    '<table wt-responsive-table>',
		    '    <thead>',
		    '        <tr>',
		    '            <th>First title</th>',
		    '            <th>Second title</th>',
		    '            <th>Third title</th>',
		    '            <th>Forth title</th>',
		    '        </tr>',
		    '    </thead>',
		    '    <tbody>',
		    '        <tr ng-repeat="item in rows">',
		    '            <td>First column</td>',
		    '            <td>Second column</td>',
		    '            <td>Third column</td>',
		    '            <td>Forth column</td>',
		    '        </tr>',
		    '    </tbody>',
		    '</table>'
		].join('');
		var element = angular.element(markup);
		var scope = $rootScope.$new();
		scope.rows = [0, 1];

		var firstDataRow = element.find('tbody tr:first td');
		expect(firstDataRow.attr('data-title')).toBeUndefined();

		$compile(element)(scope);

		expect(firstDataRow.eq(0).attr('data-title')).toBe('First title');
		expect(firstDataRow.eq(1).attr('data-title')).toBe('Second title');
		expect(firstDataRow.eq(2).attr('data-title')).toBe('Third title');
		expect(firstDataRow.eq(3).attr('data-title')).toBe('Forth title');
	});

	it('supports ng-repeat applied on TH', function (done) {
		var markup = [
		    '<table wt-responsive-table>',
		    '    <thead>',
		    '        <tr>',
		    '            <th ng-repeat="header in headers">{{header}}</th>',
		    '        </tr>',
		    '    </thead>',
		    '    <tbody>',
		    '        <tr>',
		    '            <td>Column 1 - Content</td>',
		    '            <td>Column 2 - Content</td>',
		    '        </tr>',
		    '    </tbody>',
		    '</table>'
		].join('');
		var element = angular.element(markup);
		var scope = $rootScope.$new();
		scope.headers = ['Column 1', 'Column 2'];

		$compile(element)(scope);
		scope.$digest();

		var firstDataRow = element.find('tbody tr:first td');

		setTimeout(() => {
			expect(firstDataRow.eq(0).attr('data-title')).toBe('Column 1');
			expect(firstDataRow.eq(0).text()).toBe('Column 1 - Content');
			expect(firstDataRow.eq(1).attr('data-title')).toBe('Column 2');
			expect(firstDataRow.eq(1).text()).toBe('Column 2 - Content');

			done();
		}, 0);
	});

	it('supports ng-if applied on TD with data-title', function () {
		var markup = [
		    '<table wt-responsive-table>',
		    '    <thead>',
		    '        <tr>',
		    '            <th>column</th>',
		    '        </tr>',
		    '    </thead>',
		    '    <tbody>',
		    '        <tr>',
		    '            <td ng-if="!condition">tom</td>',
		    '            <td ng-if="condition" data-title="column">jerry</td>',
		    '        </tr>',
		    '    </tbody>',
		    '</table>'
		].join('');
		var element = angular.element(markup);
		var scope = $rootScope.$new();
		scope.condition = true;

		var firstDataRow = element.find('tbody tr:first td');

		$compile(element)(scope);

		expect(firstDataRow.eq(1).text()).toBe('jerry');
		expect(firstDataRow.eq(1).attr('data-title')).toBe('column');
	});

	it('supports bootstrap', function () {
		var markup = [
		    '<table wt-responsive-table class="table" style="display: none;">',
		    '    <thead>',
		    '        <tr>',
		    '            <th>First title</th>',
		    '            <th>Second title</th>',
		    '            <th>Third title</th>',
		    '            <th>Forth title</th>',
		    '        </tr>',
		    '    </thead>',
		    '    <tbody>',
		    '        <tr>',
		    '            <td>First column</td>',
		    '            <td>Second column</td>',
		    '            <td>Third column</td>',
		    '            <td>Forth column</td>',
		    '        </tr>',
		    '    </tbody>',
		    '</table>'
		].join('');
		var element = angular.element(markup);
		angular.element("body").append(element);
		
		var firstDataRow = element.find('tbody tr td');
		
		var styles = getComputedStyle(firstDataRow[0]);
		expect(styles.paddingLeft).toBe('8px');

		$compile(element);
		$rootScope.$digest();

		expect(styles.paddingLeft).toBe('50%');
	});

	describe('wt-responsive-column', function () {
		it('supports ng-if applied on TD', function () {
			var markup = [
				'<table wt-responsive-table>',
				'    <thead>',
				'        <tr>',
				'            <th>column</th>',
				'        </tr>',
				'    </thead>',
				'    <tbody>',
				'        <tr>',
				'            <td ng-if="!condition" responsive-dynamic>tom</td>',
				'            <td ng-if="condition" responsive-dynamic>jerry</td>',
				'        </tr>',
				'    </tbody>',
				'</table>'
			].join('');
			var element = angular.element(markup);
			var scope = $rootScope.$new();
			scope.condition = true;

			$compile(element)(scope);
			scope.$digest();

			var els = element.find('tbody tr:first td');
			expect(els.eq(0).text()).toBe('jerry');
			expect(els.eq(0).attr('data-title')).toBe('column');
		});

	});
});