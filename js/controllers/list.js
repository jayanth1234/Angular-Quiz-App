//IMMEDIATELY INVOKED FUNCTION EXPRESSION
(function(){
    
    angular
        .module("turtleFacts")
        .controller("listCtrl", ListController);
    
    ListController.$injector = ['quizMetrics', 'DataService'];   //INJECTING BOTH FACTORIES
        
    function ListController(quizMetrics, DataService) {
        var vm = this;
        
        vm.quizMetrics = quizMetrics;
        vm.data = DataService.turtlesData;  // SINCE THE LIST OF JSON DATA IS PUT INTO THE DATASERVICES.JS FILE
        vm.activeTurtle = {};
        vm.changeActiveTurtle = changeActiveTurtle;
        vm.activateQuiz = activateQuiz;
        vm.search = "";
        
        function changeActiveTurtle(index) {
            vm.activeTurtle = index;
        }
        
        function activateQuiz() {
            quizMetrics.changeState("quiz", true);
        }
    }
    
})();