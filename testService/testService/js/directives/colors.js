'use strict';

/**
 * @ngdoc function
 * @name yomanAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanAppApp
 */
angular.module('libraryApp')
  .directive('colors', function () {
        return {
            restrict: "E",
            scope: {
                question : '=',
                nextaction : '@'
            },
            templateUrl: 'templates/colors.html',
            controller: function($scope) {
                $scope.priority = [];
                $scope.selectedCount = 0;
                $scope.selectColor = function() {
                    if(!this.option.isSelected){
                        this.option.isSelected = true;
                        $scope.priority.push(this.option);
                        $scope.selectedCount++;
                        if($scope.selectedCount == $scope.question.options.length){
                            $scope.handleResults();
                        }
                    }
                };

                $scope.getResult = function(isFirst, value) {
                    var result = "";
                    if(isFirst){
                        switch (value) {
                            case "12":
                                result = "чувство удовлетворенности, спокойствия, стремление к спокойной обстановке, нежелание участвовать в конфликтах, стрессе.";
                                break;
                            case "13":
                                result = "чувство целостности, активное и не всегда осознанное стремление к тесным отношениям. Потребность вовнимании со стороны других.";
                                break;
                            case "15":
                                result = "небольшое беспокойство, потребность в тонком окружении, стремление к эстетическому.";
                                break;
                            case "16":
                                result = "чувство беспокойства, страх одиночества, стремление уйти от конфликтов, избежать стресса.";
                                break;
                            case "17":
                                result = "негативное состояние, стремление к покою, отдыху, неудовлетворенность отношением к себе, негативное отношение к ситуации.";
                                break;
                            case "10":
                                result = "негативное состояние, потребность освободиться от стресса, стремление к покою, отдыху.";
                                break;
                            case "21":
                                result = "позитивное состояние, стремление к признанию, к деятельности, обеспечивающей успех.";
                                break;
                            case "23":
                                result = "активное стремление к успеху, к самостоятельным решениям, преодолению преград в деятельности.";
                                break;
                            case "24":
                                result = "небольшое беспокойство, стремление к признанию, популярности, желание произвести впечатление.";
                                break;
                            case "25":
                                result = "небольшое беспокойство, стремление к признанию, популярности, желание супервпечатлений, повышенное внимание к реакциям окружающих на свои  поступки.";
                                break;
                            case "26":
                                result = "чувство неудовлетворенности, усталости, переоценка значимости отношения к себе со стороны окружающих.";
                                break;
                            case "27":
                                result = "чувство обиды, злости, стремление к жесткости, авторитетности в отношениях.";
                                break;
                            case "20":
                                result = "чувство неудовлетворенности, стремление к признанию, желание произвести впечатление.";
                                break;
                            case "31":
                                result = "деловое возбуждение, активное стремление к деятельности, впечатлениям, удовольствиям.";
                                break;
                            case "32":
                                result = "деловое возбуждение, активное стремление к цели, преодолению всех трудностей, стремление к высокой оценке своей деятельности.";
                                break;
                            case "34":
                                result = "деловое, слегка повышенное возбуждение, увлеченность, оптимизм, стремление к контактам, расширение сферы деятельности.";
                                break;
                            case "35":
                                result = "повышенное возбуждение, не всегда адекватная увлеченность, стремление произвести впечатление.";
                                break;
                            case "36":
                                result = "негативное настроение, огорчение из-за неудачи, нежелание лишиться благоприятной ситуации.";
                                break;
                            case "37":
                                result = "негативное настроение, злость, стремление уйти из неблагоприятной ситуации.";
                                break;
                            case "30":
                                result = "чувство неудовлетворенности, направленность на рискованное действие.";
                                break;
                            case "41":
                                result = "настроение в общем положительное, стремление к  позитивному эмоциональномус остоянию, взаимовыдержке.";
                                break;
                            case "42":
                                result = "настроение в общем положительное, желание поиска первых путей решения стоящих задач, стремление к самоутверждению.";
                                break;
                            case "43":
                                result = "несколько повышенное деловое возбуждение, стремление к широкой активности.";
                                break;
                            case "45":
                                result = "небольшая эйфория, стремление к ярким событиям, желание произвести впечатление.";
                                break;
                            case "46":
                                result = "негативное настроение, огорчение и потребность в эмоциональной разрядке, отдыхе.";
                                break;
                            case "47":
                                result = "весьма негативное настроение, стремление уйти от любых проблем, склонность к необходимым, малоадекватным решениям.";
                                break;
                            case "40":
                                result = "негативное угнетенное состояние, стремление выйти из неприятной ситуации, нечеткое представление о том, как это сделать.";
                                break;
                            case "51":
                                result = "неопределенное настроение, стремление к согласию и гармонии";
                                break;
                            case "52":
                                result = "настороженность, желание произвести впечатление.";
                                break;
                            case "53":
                                result = "некоторое возбуждение, увлеченность, активное стремление произвести впечатление.";
                                break;
                            case "54":
                                result = "возбуждение, фантазирование, стремление к ярким событиям.";
                                break;
                            case "56":
                                result = "возбуждение, направленность на сильные эмоциональные переживания.";
                                break;
                            case "57":
                                result = "негативное состояние.";
                                break;
                            case "50":
                                result = "напряжение, стремление оградить себя от конфликтов, стресса.";
                                break;
                            case "61":
                                result = "напряжение, страх одиночества, желание уйти из неблагоприятной ситуации.";
                                break;
                            case "62":
                                result = "чувство беспокойства, стремление к строгому контролю над собой, чтобы избежать ошибки.";
                                break;
                            case "63":
                                result = "активное стремление к эмоциональной разрядке.";
                                break;
                            case "64":
                                result = "утрата веры в положительные перспективы, вероятность необдуманных решений («мне все равно»).";
                                break;
                            case "65":
                                result = "чувство, неудовлетворенности, стремление к комфорту.";
                                break;
                            case "67":
                                result = "негативное состояние, разочарованность, стремление к покою, желание уйти от активности.";
                                break;
                            case "60":
                                result = "весьма негативное состояние, стремление уйти от сложных проблем, а не бороться с ними.";
                                break;
                            case "71":
                                result = "весьма негативное состояние, стремление уйти от проблем («оставили бы в покое»).";
                                break;
                            case "72":
                                result = "возбуждение, гневное отношение к окружающим, не всегда адекватное упрямство.";
                                break;
                            case "73":
                                result = "сильное возбуждение, возможны аффективные поступки.";
                                break;
                            case "74":
                                result = "весьма негативное состояние, отчаяние, суицидные мысли.";
                                break;
                            case "75":
                                result = "напряженность, мечты о гармонии.";
                                break;
                            case "76":
                                result = "возбуждение, постановка нереальных задач, стремление уйти от беспокойных мыслей, неблагоприятных ситуаций.";
                                break;
                            case "70":
                                result = "чувство безнадежности, обреченности, стремление сопротивляться всему, неадекватность.";
                                break;
                            case "01":
                                result = "негативное состояние, желание спокойной ситуации.";
                                break;
                            case "02":
                                result = "негативное состояние, ощущение враждебности окружающих и желание оградиться от среды.";
                                break;
                            case "03":
                                result = "негативное состояние, повышенные требования к окружающим, не всегда адекватная активность.";
                                break;
                            case "04":
                                result = "негативное состояние, стремление уйти от проблем, а не решать их.";
                                break;
                            case "05":
                                result = "чувство беспокойства, настороженности, стремление скрыть это чувство.";
                                break;
                            case "06":
                                result = "весьма негативное состояние, стремление уйти от всего сложного, трудного, от волнения.";
                                break;
                            case "07":
                                result = "весьма негативное состояние, обида, чувство угнетенности, вероятность неадекватных решений.";
                                break;
                        }
                    }else{
                        switch (value) {
                            case "01":
                                result = "чувство неудовлетворенности, эмоциональной напряженности.";
                                break;
                            case "02":
                                result = "эмоциональная напряженность, желание выйти из неблагоприятной ситуации.";
                                break;
                            case "03":
                                result = "раздраженность, чувство беспомощности.";
                                break;
                            case "04":
                                result = "тревожность, неуверенность в своих силах.";
                                break;
                            case "05":
                                result = "небольшое контролируемое возбуждение.";
                                break;
                            case "06":
                                result = "тревожность, неуверенность в своих силах, но при этом завышенная требовательность, желание достичь признания своей личности.";
                                break;
                            case "07":
                                result = "отрицание каких-либо ограничений своей личности, активное стремление к деятельности.";
                                break;
                            case "12":
                                result = "сильное напряжение, стремление избавиться от негативного стрессового состояния.";
                                break;
                            case "13":
                                result = "сильное напряжение, чувство беспомощности, желание выйти из эмоциональной ситуации.";
                                break;
                            case "14":
                                result = "состояние, близкое к стрессу, эмоциональные негативные переживания, чувство беспомощности.";
                                break;
                            case "15":
                                result = "состояние, близкое к стрессу, сложность взаимоотношений, чувство ограниченности в возможностях, нетерпеливость.";
                                break;
                            case "16":
                                result = "эмоциональная неудовлетворенность, самоограничение, поиск поддержки.";
                                break;
                            case "17":
                                result = "состояние, близкое к стрессу, эмоциональная неудовлетворенность, стремление уйти из психогенной ситуации.";
                                break;
                            case "10":
                                result = "несколько угнетенное состояние, тревожность, ощущение бесперспективности.";
                                break;
                            case "21":
                                result = "угнетенное состояние, неверие в свои силы, стремление уйти из неприятной ситуации.";
                                break;
                            case "23":
                                result = "сильное возбуждение, тягостные переживания, отношения со средой считает для себя враждебными, возможны аффективные поступки.";
                                break;
                            case "24":
                                result = "состояние, близкое фрустрации, чувство разочарования, нерешительности.";
                                break;
                            case "25":
                                result = "состояние, близкое к стрессовому, чувство оскорбленного достоинства, неверие в свои силы.";
                                break;
                            case "26":
                                result = "состояние, близкое к стрессовому, неадекватно повышенный самоконтроль, необоснованное стремление к признанию.";
                                break;
                            case "27":
                                result = "состояние фрустрации из-за ограничения амбициозных требований, недостаточная целеустремленность.";
                                break;
                            case "20":
                                result = "состояние фрустрации, раздраженность из-за ряда неудач, снижение волевых качеств.";
                                break;
                            case "31":
                                result = "подавляемое возбуждение, раздражительность, нетерпеливость, поиск выхода из негативных отношений, сложившихся с близкими людьми.";
                                break;
                            case "32":
                                result = "состояние стресса из-за неадекватной самооценки.";
                                break;
                            case "34":
                                result = "мнительность, тревожность, неадекватная оценка среды, стремление к самооправданию.";
                                break;
                            case "35":
                                result = "состояние стресса из-за неудачных попыток достичь взаимопонимания, чувство неуверенности, беспомощности, желание сочувствия.";
                                break;
                            case "36":
                                result = "сильное напряжение, вызванное иногда сексуальным самоограничением, отсутствие дружеских контактов, неуверенность в своих силах.";
                                break;
                            case "37":
                                result = "состояние стресса из-за глубокого разочарования, фрустрация, чувство тревожности, бессилия решить конфликтную поблему, желание выйти из фрустрирующей ситуации любым путем, сомнение в том, что это удастся.";
                                break;
                            case "30":
                                result = "сдерживаемое возбуждение, чувство утрачиваемой перспективы, вероятность нервного истощения.";
                                break;
                            case "41":
                                result = "чувство разочарования, состояние, близкое к стрессу, стремление подавить негативные эмоции.";
                                break;
                            case "42":
                                result = "состояние нерешительности, тревожности, разочарования.";
                                break;
                            case "43":
                                result = "состояние стресса, сопровождаемое возбуждением, сомнения в успехе, претензии, не подкрепляемые реальными возможностями, самооправдание.";
                                break;
                            case "45":
                                result = "эмоциональное разочарование и чувство беспокойства, тревоги, разочарования.";
                                break;
                            case "47":
                                result = "напряженность, чувство неуверенности, настороженности, стремление избежать контроля извне.";
                                break;
                            case "40":
                                result = "напряженность, чувство боязни потерять что-то важное, упустить возможности, напряженное ожидание.";
                                break;
                            case "51":
                                result = "чувство неудовлетворенности, стимулирующее к активности, стремление к сотрудничеству.";
                                break;
                            case "52":
                                result = "стрессовые состояния из-за неосуществившегося самоутверждения.";
                                break;
                            case "53":
                                result = "стрессовое состояние из-за неудач в активных, иногда необдуманных действиях.";
                                break;
                            case "54":
                                result = "настороженность, подозрительность, разочарование, замкнутость.";
                                break;
                            case "56":
                                result = "стресс, вызванный нарушением желательных взаимоотношений, повышенная взыскательность к другим.";
                                break;
                            case "57":
                                result = "напряжение из-за ограничения в самостоятельных решениях, стремление к взаимопониманию, откровенному выражению мысли.";
                                break;
                            case "50":
                                result = "проявление нетерпения, но в то же время стремление к самоконтролю, что вызывает некоторое эмоциональное возбуждение.";
                                break;
                            case "61":
                                result = "негативное состояние, чувство неудовлетворенности из-за недостаточного признания заслуг (реальных и предполагаемых), стремление к самоограничению и самоконтролю.";
                                break;
                            case "62":
                                result = "негативное состояние из-за чрезмерного самоконтроля, упрямое желание выделиться, сомнения в том,  что это удастся.";
                                break;
                            case "63":
                                result = "стрессовое состояние из-за подавленности эротических и других биологических потребностей, стремление к сотрудничеству для выхода из стресса.";
                                break;
                            case "64":
                                result = "напряженность из-за стремления скрыть тревогу под маской уверенности и беспечности.";
                                break;
                            case "65":
                                result = "негативное состояние из-за неудовлетворенного стремления к чувственной гармонии.";
                                break;
                            case "67":
                                result = "стремление уйти из подчинения, негативное отношение к различным запретам.";
                                break;
                            case "60":
                                result = "стрессовое состояние из-за подавления биологических, сексуальных потребностей.";
                                break;
                            case "71":
                                result = "состояние беспокойства в связи со скрываемым желанием получить помощь, поддержку.";
                                break;
                            case "72":
                                result = "состояние, близкое к фрустрации из-за ограничения свободы желаемых действий, стремление избавиться от помех.";
                                break;
                            case "73":
                                result = "стрессовое состояние, вызванное разочарованием в ожидаемой ситуации, эмоциональное возбуждение.";
                                break;
                            case "74":
                                result = "стрессовое состояние из-за боязни дальнейших неудач, отказ от разумных компромиссов.";
                                break;
                            case "75":
                                result = "поиски идеализированной ситуации.";
                                break;
                            case "76":
                                result = "стрессовое состояние из-за неприятных ограничений, запретов, стремление сопротивляться ограничениям, уйти от заурядности.";
                                break;
                            case "70":
                                result = "стремление уйти из неблагоприятной ситуации.";
                                break;
                            case "01":
                                result = "некоторое напряжение, стремление противостоять негативным чувствам.";
                                break;
                            case "02":
                                result = "негативное состояние в связи с перенапряжением, переутомлением.";
                                break;
                            case "03":
                                result = "подавляемое беспокойство, возможность эффективных действий, раздражительность.";
                                break;
                            case "04":
                                result = "чувства тревожности, неуверенности.";
                                break;
                            case "05":
                                result = "напряжение в связи с подавлением чувственных переживаний.";
                                break;
                            case "06":
                                result = "стремление выйти из неблагоприятной ситуации, несколько завышенная самооценка.";
                                break;
                            case "07":
                                result = "стремление выйти из неблагоприятной ситуации, надежда на хорошие перспективы в будущем.";
                                break;
                        }
                    }
                    return result;
                };

                $scope.handleResults = function() {
                    var priority = $scope.priority;
                    var first = "";
                    var last = "";
                    if(priority.length > 0){
                        first = priority[0].key + priority[1].key;
                        last = priority[priority.length - 2].key + priority[priority.length - 1].key;
                    }
                    var result = $scope.getResult(true, first) + " || " + $scope.getResult(false, last);

                    $scope.$emit("testDone", {
                        Fail: 0,
                        Correct: 0,
                        Neutral: 0,
                        Try: 1,
                        Result: result,
                        Timestamp: new Date(),
                        TimeSpend: Math.floor((new Date().getTime() - $scope.startTime) / 1000),
                        isDone: true
                    });
                };
            }
        }
  });
