// Variables qui pointe vers les id sélectionné
let boutons = document.getElementsByClassName('bouton');
let question = document.getElementById('question');
let correct = document.getElementById('correct');
let wrong = document.getElementById('wrong');
let category = document.getElementById('category');
let modal = document.getElementById('modal');
let src = '../api-openquizzdb/assets/etbiennn.gif';
let src2 = '../api-openquizzdb/assets/lepers.gif';

// Envoie de la requête à l'API
fetch("https://opentdb.com/api.php?amount=10&type=boolean&token=abb23aeec231b4614f28bc9d0e040fe4bbbc7a1e700c3f5688724e463dbf2538")
  .then(response => response.json())
  .then((response) => {
    // Récupération des données de l'API (stocké dans un array)
    question.innerHTML = response.results[0].question;
    category.innerText = response.results[0].category;
    correct.innerText = response.results[0].correct_answer;
    wrong.innerText = response.results[0].incorrect_answers;
    // Definition de l'id true et false
    correct.parentNode.setAttribute('id', 'true');
    wrong.parentNode.setAttribute('id', 'false');

    // Boucle for qui ajoute un écouteur d'évènement a chaque clic du bouton ayant l'id défini
    for (let i = 0; i < boutons.length; i++) {
      boutons[i].addEventListener('click', function() {
        // Si le bouton a un id "false" = mauvaise réponse
        if (this.getAttribute('id') == 'false') {
          let answer = this;
          // Affichage du modal
          $('#myModal').modal('show');
          $('#myModal img').attr('src', src);
          // Changemement de couleur du bouton après 1sec
          setTimeout(function() {
            answer.style.backgroundColor = '#dc3545';
            answer.style.color = 'white';
          }, 1000)
          // Si le bouton a un id "true" = bonne réponse
        } else if (this.getAttribute('id') == 'true') {
          let answer = this;
          // Affichage du modal
          $('#myLepers').modal('show');
          $('#myLepers img').attr('src', src2);
          // Changemement de couleur du bouton après 1sec
          setTimeout(function() {
            answer.style.backgroundColor = '#218838';
            answer.style.color = 'white';
          }, 1000)
        }
      });
    }
  })
  .catch(error => alert("Erreur : " + error));

// Fonction qui permet de rafraichir la page via un bouton lorsqu'une réponse été donnée
function refreshPage() {
  window.location.reload();
}
