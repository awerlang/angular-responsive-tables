/* global inject */
describe('directive', function () {

    describe('simple mask', function () {

        var element, scope;
        beforeEach(module('wt.easy'));
        beforeEach(inject(function ($compile, $rootScope) {
            scope = $rootScope.$new();
            element = $compile('<input type="text" ng-model="inputText" wt-easy-mask="99.999-9">')(scope);
        }));

    });
});
