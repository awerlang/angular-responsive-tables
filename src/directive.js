'use strict';

function getHeaders(element) {
    return element.querySelectorAll('tr > th');
}

function updateTitle(td, th) {
    var title = th && th.textContent;
    if (title && (td.getAttributeNode('data-title-override') || !td.getAttributeNode('data-title'))) {
        td.setAttribute('data-title', title);
        td.setAttribute('data-title-override', title);
    }
}

function colspan(td) {
    var colspan = td.getAttributeNode('colspan');
    return colspan ? parseInt(colspan.value) : 1;
}

function wtResponsiveTable() {
    return {
        restrict: 'A',
        controller: ['$element', function ($element) {
            return {
                getHeader: function (td) {
                    var firstHeader = td.parentElement.querySelector('th');
                    if (firstHeader) return firstHeader; 

                    var headers = getHeaders($element[0]);
                    if (headers.length) {
                        var row = td.parentElement;
                        var headerIndex = 0;
                        var found = Array.prototype.some.call(row.querySelectorAll('td'), function (value, index) {
                            if (value === td) {
                                return true;
                            }

                            headerIndex += colspan(value);
                        });

                        return found ? headers.item(headerIndex) : null;
                    }
                },
            }
        }],
        compile: function (element, attrs) {
            attrs.$addClass('responsive');
            var headers = getHeaders(element[0]);
            if (headers.length) {
                var rows = element[0].querySelectorAll('tbody > tr');
                Array.prototype.forEach.call(rows, function(row) {
                    var headerIndex = 0;
                    Array.prototype.forEach.call(row.querySelectorAll('td'), function (value, index) {
                        var th = value.parentElement.querySelector('th') || headers.item(headerIndex);
                        updateTitle(value, th);

                        headerIndex += colspan(value);
                    });
                });
            }
        }
    };
}

function wtResponsiveDynamic() {
    return {
        restrict: 'E',
        require: '?^^wtResponsiveTable',
        link: function (scope, element, attrs, tableCtrl) {
            if (!tableCtrl) return;

            setTimeout(function () {
                Array.prototype.forEach.call(element[0].parentElement.querySelectorAll("td"), function (td) {
                    var th = tableCtrl.getHeader(td);
                    updateTitle(td, th);
                });
            }, 0);
        }
    };
}
