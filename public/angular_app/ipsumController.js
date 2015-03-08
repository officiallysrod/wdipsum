angular
    .module('ipsumApp')
    .controller('ipsumController', ipsumController);

    function ipsumController(){
        var self = this;

        self.checkFlashInstall = checkFlashInstall();
        self.generatedIpsum    = [];
        self.buildParagraph    = buildParagraph;
        self.copyToClipboard   = copyToClipboard;
        self.updateButtonState = updateButtonState;
        self.button            = { message: 'Slap it on my clipboard!', clicked: false };

        self.phrases = [
            'snarf', 'banana', 'it\'s just data', 'rick roll', 'party on code', 'bagel', 'donut', 'Micah\'s beard', 'mustache', 'we code', 'the code doesn\'t care', 'shhh', 'kendama', 'Crossfit', 'Dapper Dan\'s Bowtie Bazaar', 'buncha nerds', 'chipotle', 'carpool mafia', 'bro', 'Mike\'s wedding', 'cuz rails', 'Hipchat', 'meme', 'gif', 'rails g scaffold', 'where\'s the README', 'Angular', 'Ruby', 'JavaScript', 'all your Firebase are belong to us', 'rspec', 'TDD', 'Pivotal Tracker', 'git commit', 'commit early and often', 'spill on Macbook', 'happy hour', 'the NSFW link', 'quiz time', 'chomp', '7-11', 'ask Dan', 'Trashio™', 'paste and pray', 'will lunch be provided', 'real talk'
        ];

        function copyToClipboard(){
            if(self.generatedIpsum.length > 1){
                var text = '';
                var i = 0;
                var j = self.generatedIpsum.length;
                for(var i = 0; i < j; i++){
                    text = text + self.generatedIpsum[i];
                    i < j - 1 ? text = text + '\n \n' : null;        
                }
                return text;
            } else {
                return self.generatedIpsum.join(' ');
            }
        }

        function buildSentence(allPhrases){
            var randomPhrases = shuffle(allPhrases).slice(0, 5);
            var sentence = randomPhrases.join(' ') + '.';
            sentence = sentence.charAt(0).toUpperCase() + sentence.substring(1);
            return sentence;
        }

        function buildParagraph(numParagraphs){
            updateButtonState();
            numParagraphs > 100 ? numParagraphs = 100 : numParagraphs;
            var numSentences = numParagraphs * 10;
            var paragraph = buildSentence(self.phrases);
            var ipsum = [];

            for(var i = 2; i <= numSentences; i++){
                paragraph = paragraph + ' ' + buildSentence(self.phrases);
                if(i % 10 === 0){
                    ipsum.push(paragraph);
                    paragraph = buildSentence(self.phrases);
                }
            }
            self.generatedIpsum = ipsum;
        }

        function updateButtonState(){
            if(!self.button.clicked && self.generatedIpsum.length > 0){
                self.button.clicked = true;
                self.button.message = 'Added!';
            } else {
                self.button.clicked = false;
                self.button.message = 'Slap it on my clipboard!';
            }
        }

        //check to see if client has flash installed
        function checkFlashInstall(){
            if(navigator.mimeTypes["application/x-shockwave-flash"] == undefined){
                console.log("You don't have Flash installed!");
                return false;
            } else {
                console.log("You have Flash installed!");
                return true;
            }
        }

        //called in buildSentence to select 5 random words from the array of phrases.
        function shuffle(array){
            var currentIndex = array.length;
            var temporaryValue;
            var randomIndex;

            while(0 !== currentIndex){
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }
    }