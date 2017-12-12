(function(){
    
    angular
        .module("turtleFacts")
        .controller("quizCtrl", QuizController);
    
    QuizController.$injector = ['quizMetrics', 'DataService'];
    
    function QuizController(quizMetrics, DataService) {
        
        var vm = this;
        
        vm.quizMetrics = quizMetrics;
        vm.dataService = DataService;
        vm.questionAnswered = questionAnswered;
        vm.setActiveQuestion = setActiveQuestion;
        vm.selectAnswer = selectAnswer;
        vm.activeQuestion = 0;
        vm.error = false;
        vm.finalise = false;
        vm.finaliseAnswers = finaliseAnswers;
        
        var numQuestionsAnswered = 0;
        
        function setActiveQuestion(index){
            if(index === undefined){
                var breakOut = false;
                var quizLength = DataService.quizQuestions.length - 1;
            
                while(!breakOut){
                    vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;
                    
                    if(vm.activeQuestion === 0) {
                        vm.error = true;
                    }
                
                    if(DataService.quizQuestions[vm.activeQuestion].selected === null){
                        breakOut = true;
                    }
                } 
            }else{
                vm.activeQuestion = index;
            }
        }
        
        function questionAnswered() {
           
            var quizLength = DataService.quizQuestions.length;
            
            if(DataService.quizQuestions[vm.activeQuestion].selected !== null){
                numQuestionsAnswered++;
                if(numQuestionsAnswered >= quizLength){
                    //FINALIZE THE QUIZ
                    for(var i = 0; i < quizLength; i++){
                        if(DataService.quizQuestions[i].selected === null) {
                            setActiveQuestion(i);
                            return;
                        }
                    }
                    vm.error = false;
                    vm.finalise = true;
                    return;
                }
            }
            
            vm.setActiveQuestion();
        }
        
        function selectAnswer(index) {
            DataService.quizQuestions[vm.activeQuestion].selected = index;
        }
        
        function finaliseAnswers(){
            vm.finalise = false;
            numQuestionsAnswered = 0;
            vm.activeQuestion = 0;
            quizMetrics.markQuiz();
            quizMetrics.changeState("quiz", false);
            quizMetrics.changeState("results", true);
        }
    }
    
})();














