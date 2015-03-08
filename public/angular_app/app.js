angular
    .module('ipsumApp', ['ngAnimate', 'ngClipboard'])
    .config(configure);

    configure.$inject = ['ngClipProvider'];

    function configure(ngClipProvider){
        ngClipProvider.setPath("../../vendor/zeroclipboard/dist/ZeroClipboard.swf");
    }
