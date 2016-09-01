'use strict';

angular.module('wt.responsive', [])
    .directive('wtResponsiveTable', [wtResponsiveTable])
    .directive('td', [wtResponsiveDynamic]);