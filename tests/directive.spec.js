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
});