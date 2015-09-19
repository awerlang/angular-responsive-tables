# angular-responsive-tables

Make your HTML tables look great on every device. 
Compatible with **AngularJS 1.3.4+**. 

[Live Demo](http://awerlang.github.io/angular-responsive-tables/examples/)

## Why?

Currently, browsers for mobile devices like smartphones doesn't do anything to have a proper presentation of tables,
 and then scrollbars will show up and ruin your design.

In the search of a solution to this problem I have found many different approaches. Some of them
 still rely on horizontal scrollbars. While I believe this layout could be useful for some use cases, 
 I felt that a default solution should avoid horizontal scrollbars entirely. Then I came up with this
 highly reusable directive.

All this work is based on the following assumptions:

* If it is *flexible*, then it would solve most problems, even ones not aimed by the library author's;
* Focusing on the task of *adding responsiveness*, in order to accomplish a greater objective (*easy to use tabular data*);
* Do work with a *standard HTML table*, not requiring any extraneous markup;
* Do *not change default tabular layout* unless a smaller display is detected;
* Provide *convenience* without sacrificing flexibility;
* By keeping *code base simple*, it is easier to reason about and evolve;
* By fully covering with tests, it can *evolve without introducing bugs*.

## Features

* Angular native implementation compatible with 1.3.4+;
* Keep things DRY;
* Supports static and dynamic (ng-repeat) rows;
* Easy to apply any style on top of it;
* Works with any base CSS framework; 
* Should integrate seamlessly with any table component you might choose to use.

### Future Work

* Choose what columns to show/hide according to a given screen resolution;
* Choose when it would be best to hide columns or collapse all columns;
* Define a header and/or custom template for collapsed columns/row;
* Allow collapse/expand column details. 

## Usage

    <table wt-responsive-table>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
        </tr>
        <tr>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
        </tr>
        <tr>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
        </tr>
        <tr>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
        </tr>
    </table>

### Directives

#### wt-responsive-table

 * table: wt-responsive-table
   * td: responsive-omit-title: title should be ommited
   * td: responsive-omit-if-empty: no row for empty cells

## Installation

### Bower

    bower install angular-responsive-tables --save

### Application

#### HTML

    <link rel="stylesheet" href="release/angular-responsive-tables.min.css">
    <script type="text/javascript" src="release/angular-responsive-tables.min.js"></script>

#### JavaScript

    var app = angular.module('app', ['wt.responsive']);

## Credits

CSS based on original work by Chris Coyier (http://css-tricks.com/responsive-data-tables/). In this article, he covers approaches to responsive tables. I modified it to work around CSS specificity and to keep things DRY.

## License

MIT
