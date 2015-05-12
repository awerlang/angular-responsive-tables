function TestController() {
    this.projects = [
        {name: "AngularJS", version: "1.5", language: "JavaScript", maintainer: "Google", stars: 35000},
        {name: "Bootstrap", version: "3.3", language: "CSS", maintainer: "Twitter", stars: 23000},
        {name: "UI-Router", version: "0.13", language: "JavaScript", maintainer: "AngularUI", stars: 15000}
    ];
}

angular.module('app', ['wt.responsive'])
    .controller('TestController', TestController);
