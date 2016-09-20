// https://github.com/awerlang/angular-responsive-tables
(function() {
    "use strict";
    function getFirstHeaderInRow(tr) {
        var th = tr.firstChild;
        while (th) {
            if (th.tagName === "TH") break;
            if (th.tagName === "TD") {
                th = null;
                break;
            }
            th = th.nextSibling;
        }
        return th;
    }
    function getHeaders(element) {
        return [].filter.call(element.children().children().children(), function(it) {
            return it.tagName === "TH";
        });
    }
    function updateTitle(td, th) {
        var title = th && th.textContent;
        if (title && (td.getAttributeNode("data-title-override") || !td.getAttributeNode("data-title"))) {
            td.setAttribute("data-title", title);
            td.setAttribute("data-title-override", title);
        }
    }
    function colspan(td) {
        var colspan = td.getAttributeNode("colspan");
        return colspan ? parseInt(colspan.value) : 1;
    }
    function wtResponsiveTable() {
        return {
            restrict: "A",
            controller: [ "$element", function($element) {
                return {
                    contains: function(td) {
                        var tableEl = $element[0];
                        var el = td;
                        do {
                            if (el === tableEl) return true;
                            if (el.tagName === "TABLE") return false;
                            el = el.parentElement;
                        } while (el);
                        throw new Error("Table element not found for " + td);
                    },
                    getHeader: function(td) {
                        var firstHeader = getFirstHeaderInRow(td.parentElement);
                        if (firstHeader) return firstHeader;
                        var headers = getHeaders($element);
                        if (headers.length) {
                            var row = td.parentElement;
                            var headerIndex = 0;
                            var found = Array.prototype.some.call(row.children, function(value, index) {
                                if (value.tagName !== "TD") return false;
                                if (value === td) {
                                    return true;
                                }
                                headerIndex += colspan(value);
                            });
                            return found ? headers[headerIndex] : null;
                        }
                    }
                };
            } ],
            compile: function(element, attrs) {
                attrs.$addClass("responsive");
                var headers = getHeaders(element);
                if (headers.length) {
                    var rows = [].filter.call(element.children(), function(it) {
                        return it.tagName === "TBODY";
                    })[0].children;
                    Array.prototype.forEach.call(rows, function(row) {
                        var headerIndex = 0;
                        [].forEach.call(row.children, function(value, index) {
                            if (value.tagName !== "TD") return;
                            var th = getFirstHeaderInRow(value.parentElement);
                            th = th || headers[headerIndex];
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
            restrict: "E",
            require: "?^^wtResponsiveTable",
            link: function(scope, element, attrs, tableCtrl) {
                if (!tableCtrl) return;
                if (!tableCtrl.contains(element[0])) return;
                setTimeout(function() {
                    [].forEach.call(element[0].parentElement.children, function(td) {
                        if (td.tagName !== "TD") return;
                        var th = tableCtrl.getHeader(td);
                        updateTitle(td, th);
                    });
                }, 0);
            }
        };
    }
    "use strict";
    angular.module("wt.responsive", []).directive("wtResponsiveTable", [ wtResponsiveTable ]).directive("td", [ wtResponsiveDynamic ]);
})();