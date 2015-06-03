/* global inject */
/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/jasmine/jasmine.d.ts"/>
describe('directive', function () {
	var $compile;
	
	beforeEach(module('wt.responsive'));
	beforeEach(inject(function (_$compile_) {
		$compile = _$compile_;
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
});