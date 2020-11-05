axios.get(`https://opentdb.com/api.php?amount=20&category=28&difficulty=easy`)
  .then(res => {
    //console.log(res.data.results)
    let questions = res.data.results

    let correctAnswers = [];

    for (i = 0; i < res.data.results.length; i++) {
      correctAnswers.push(res.data.results[i].correct_answer)
    }
    //console.log(correctAnswers)

    function shuffle(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    }

    questions.forEach(question => {
      let answers = [...question.incorrect_answers, question.correct_answer]
      shuffle(answers)
      //console.log(answers)


      let questionElem = document.createElement('h5')
      questionElem.innerHTML = `${question.question}`
      document.getElementById("questions").append(questionElem)
      let answerElemList = document.createElement('ol')
      document.getElementById("questions").append(answerElemList)

      for (i = 0; i < answers.length; i++) {
        let answerElem = document.createElement('li')
        answerElem.className = "list-group-item black-text"
        answerElem.innerHTML = `${answers[i]}`
        document.getElementById("questions").append(answerElem)
      }
    })

    var score = 0;

    document.addEventListener('click', event => {
      //var firstTry = true;
      console.log(event.target)
      //console.log(res.data)

      if (correctAnswers.includes(event.target.textContent)) {
        console.log('nice')
        //if (firstTry === true) {
        score++
        //}
        console.log(score)
        event.target.className = "list-group-item black-text chosen"
      } else if (event.target.className === "list-group-item black-text") {
        console.log('nah')
        event.target.className = "list-group-item black-text u-wrong"
        //firstTry = false;
      }

      if (event.target.classList.contains('btn-success')) {
        var scoreTally = document.getElementById("score");
        scoreTally.style.color = "turquoise"
        scoreTally.innerHTML = `
              Your score: ${score} out of 20 (${score / 20 * 100}%)
            `
      }
    })
  })
  .catch(err => console.error(err))