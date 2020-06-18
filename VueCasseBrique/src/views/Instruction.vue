<template>
  <div class="main w-50 mx-auto m-5 bg-light p-5 shadow overflow-auto">
    <h1 class="p-3">
      <span class="text-info">P</span>
      <span class="text-warning">A</span>
      <span class="text-danger">D</span>
      <span class="text-success">D</span>
      <span class="text-primary">L</span>
      <span class="text-dark">E</span>
      <span class="text-info">B</span>
      <span class="text-warning">R</span>
      <span class="text-danger">I</span>
      <span class="text-success">C</span>
      <span class="text-primary">K</span>
    </h1>
    <router-link class="btn btn-dark float-left" to="/">
      <h4 class="m-0">
        <span class="text-info">M</span> E N U
      </h4>
    </router-link>
    <div class="text-justify">
      <div class="m-5">
        <h3 class="text-info border-bottom p-3">Histoire du Casse Brique</h3>
        <p class>
          Le casse-briques est un genre de jeu vidéo souvent classé dans la catégorie arcade,
          apparu en 1975 avec le jeu Breakout. Il est directement inspiré de Pong.
          Le principe général est de détruire, au moyen d'une ou plusieurs balles,
          un ensemble de briques se trouvant dans un niveau pour accéder au niveau suivant.
        </p>
      </div>
      <div class="m-5">
        <h3 class="text-info border-bottom p-3">Règles du jeu</h3>
        <p class>
          Traditionnellement, le joueur contrôle une sorte de raquette qu'il peut seulement déplacer sur un axe horizontal au bas de l'écran,
          et le but est d'empêcher la balle de franchir cette ligne en l'interceptant avec la raquette. S'il y parvient, la balle est renvoyée en direction des briques ;
          dans le cas contraire, le joueur perd la balle. Si cette balle est la dernière qui lui reste, il perd la partie.
          Toute la difficulté consiste donc à rattraper la balle lorsqu'elle se déplace vite.
          De nombreux jeux sont fondés sur ce principe et y apportent des améliorations de diverses sortes pour renforcer l'intérêt du jeu.
          La modification la plus classique est l'ajout de bonus ou malus, qui tombent de certaines briques détruites et produisent des effets divers,
          allant d'une augmentation de la taille de la raquette à la multiplication par deux du nombre de balles à rattraper.
        </p>
      </div>
      <div class="m-5">
        <h3 class="text-danger border-bottom p-3">Informations importantes</h3>
        <p
          class="mt-4"
        >Voici ci-dessous 6 Jokers, ils vous donneront des pouvoir durant 10 secondes, parfois bon parfois mauvais. Pour cela il vous suffira de les attraper avec le paddle.</p>
        <div class="pt-3">
          <h5 class="text-success mt-4">Les Bonus</h5>
          <div class="d-flex justify-content-between m-3 border-bottom">
            <div class="ghost"></div>
            <h6>Ghost Ball</h6>
            <small class="w-50">Il rendra ta balle transparente et passera à travers les briques.</small>
          </div>
          <div class="d-flex justify-content-between m-3 border-bottom">
            <div class="live"></div>
            <h6>Lives Ball</h6>
            <small
              class="w-50"
            >Il te rendra les vies que tu as perdu pendant la partie et plus encore !</small>
          </div>
          <div class="d-flex justify-content-between m-3 border-bottom">
            <div class="ball"></div>
            <h6>Ball +</h6>
            <small
              class="w-50"
            >Il rendra ta balle plus grosse pour avoir moins de chance de la laisser tomber.</small>
          </div>
          <div class="d-flex justify-content-between m-3 border-bottom">
            <div class="paddle"></div>
            <h6>Paddle +</h6>
            <small
              class="w-50"
            >Il rendra ton paddle plus long donc moins de stresse pour faire tomber la balle.</small>
          </div>

          <h5 class="text-warning mt-4">Les Malus</h5>
          <div class="d-flex justify-content-between m-3 border-bottom">
            <div class="ballM"></div>
            <h6>Ball -</h6>
            <small
              class="w-50"
            >Il rendra ta balle moins grosse pour te stresser et donc perdre une vie.</small>
          </div>
          <div class="d-flex justify-content-between m-3 border-bottom">
            <div class="paddleM"></div>
            <h6>Paddle -</h6>
            <small
              class="w-50"
            >Il rendra ton paddle moins long donc attention a ne pas faire tomber ta balle !</small>
          </div>
        </div>
        <p
          class="mt-4"
        >Pour chacun de ces bon ou mauvais Jokers (à pars pour le Lives Ball) un compte à rebours sera lancé à gauche du plateau de jeu à chaque joker attrapé.</p>
        <h5 class="text-primary mt-4">Les Niveaux</h5>
        <p>Afin de tester un certain niveau souhaité, il va falloir d'abord remporter le précédent. Si vous échouez un niveau ne vous inquiétez pas il vous suffit juste d'appuyer sur le bouton 'Again' en haut en gauche.</p>
        <h3 class="text-center mt-5">BON COURAGE !!</h3>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main {
  height: 700px;
}
.ghost {
  width: 30px;
  height: 30px;
  background-color: rgb(211, 211, 211);
  border-radius: 50px;
}
.live {
  width: 30px;
  height: 30px;
  background-color: rgb(255, 0, 212);
  border-radius: 50px;
}
.ball {
  width: 30px;
  height: 30px;
  background-color: rgb(115, 255, 0);
  border-radius: 50px;
}
.paddle {
  margin-top: 15px;
  width: 30px;
  height: 5px;
  background-color: rgb(115, 255, 0);
}
.ballM {
  width: 30px;
  height: 30px;
  background-color: rgb(255, 0, 0);
  border-radius: 50px;
}
.paddleM {
  margin-top: 15px;
  width: 30px;
  height: 5px;
  background-color: rgb(255, 0, 0);
}
</style>