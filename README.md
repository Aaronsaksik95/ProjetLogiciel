# ProjetLogiciel
Aaron Saksik & Tiemoko Keita.
Groupe A7.


Création d'une base de donnée 'ProjetLogiciel' et Configuration ('root', 'password'... en fonction de votre BDD) de celle-ci dans le dossier 'config'-> 'config.json' en fonction de votre connexion à celle-ci (Personnellement j'ai travaillé sur PhpMyAdmin pour ce projet).

Faites un 'cd NodeCasseBrique' puis un 'npm install' pour installer les modules.
Lancement du serveur NodeJs avec la commande 'npm start'.

Faites un 'cd VueCasseBrique' puis un 'npm install' pour installer les modules.
Lancement du serveur VueJS avec la commande 'npm run serve'.

Rendez-vous à l'adresse indiquer sur le terminal de VueCasseBrique (Ex: 'http://localhost:8080/') pour visionner l'application.

Afin d'être Admin il vous suffira de remplacer le 1 en 2 de la colonne 'RoleId' sur la ligne de votre authentification, à partir d'ici vous aurez les droits de l'admin et vous pourrez par exemple créer des niveaux.

Lors d’un ajout de niveau l’administrateur choisira la vitesse de la balle, la taille du paddle et de la balle, le nombre de briques et la résistance maximale de celles-ci... Les couleurs des briques en fonction de leur résistance et changeront de couleur à chaque collision.
