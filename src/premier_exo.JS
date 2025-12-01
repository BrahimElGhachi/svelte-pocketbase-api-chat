// ---------------------
// Pour exécuter ce fichier, il suffit d'exécuter la commande : node premier_exo.js
// ---------------------
// - Créer les variables `firstname`, `lastname` et `age` avec les valeurs de votre choix.
// - Créer une fonction `present` qui prend en paramètre c’est 3 informations et qui retourne une phrase de présentation.
// - Appeler la fonction en question et l’afficher dans la console.
// - Exécuter le fichier dans le REPL pour tester.
// ---------------------

let firstname = "brahim";
let lastname = "elghachi";
let age = 46;

function present (prenom, nom, age) {
    return `Je m'appelle ${firstname} ${lastname} et j'ai ${age}`
}

console.log(present(firstname,lastname,age));