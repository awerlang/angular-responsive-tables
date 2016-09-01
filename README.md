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
* Support conditionally shown (ng-if) columns;
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
   * td: responsive-dynamic: add it when there's an `ng-if` directive applied to the element
   * td: data-title: use to override the header for a given row/cell 

## Installation

### Bower

    bower install angular-responsive-tables --save

### Application

#### HTML

    <link rel="stylesheet" href="release/angular-responsive-tables.min.css">
    <script type="text/javascript" src="release/angular-responsive-tables.min.js"></script>

#### JavaScript

    var app = angular.module('app', ['wt.responsive']);

## Special cases

### Header doesn't appear for a row / need to override header

It's possible to override a header with a `data-title` attribute:

    <tr>
        <td data-title="column 1">tom</td>
        <td data-title="column 2">jerry</td>
    </tr> 


### Column can be shown/hidden with ng-if

Also, more than one `td` exist for a single `th`...to deal with this add a `responsive-dynamic` attribute:

    <tr>
        <td ng-if="condition" responsive-dynamic>tom</td>
        <td ng-if="!condition" responsive-dynamic>jerry</td>
    </tr> 

### IE9 responsive hack

Because IE9 doesn't handle correctly a `display` CSS rule for `<td>`, if you need to support it, you can use the following style, only for IE9:

```css
<!--[if IE 9]>
<style>
/* rules for IE9 only */
.responsive {
    overflow: hidden;
}
.responsive td:nth-child(odd), .responsive td:nth-child(even) {
    float: left;
    width: 100%;
}
</style>
<![endif]-->
```

## Credits

CSS based on original work by Chris Coyier (http://css-tricks.com/responsive-data-tables/). In this article, he covers approaches to responsive tables. I modified it to work around CSS specificity and to keep things DRY.

## License

MIT
