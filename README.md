![banner](README_files/banner.png)

# Take A Vet (Front)

Ce projet est une amélioration de [Take A Vet](https://iut-info.univ-reims.fr/gitlab/udyc0001/sae3-01), il s'agit de la partie [REACT/js](https://fr.reactjs.org/) de l'application.

---

**TakeAVet** est une application web qui permet principalement de gérer les rendez-vous des vétérinaires avec leurs clients avec bien d'autres fonctionnalités (Cf. [Fonctionnalités](#Fonctionnalités)).

## Contributeurs

- Alexis Udycz
- Vincent Guillemot
- Clement Perrot
- Romain Leroy
- Souliere Benoit

## Installation

Étape 1 : Cloner le projet

```git clone https://iut-info.univ-reims.fr/gitlab/udyc0001/sae4-01-front.git```

Étape 2 : Installer les dépendances

```npm install```

Étape 3 : Lancer le projet

```shell
npx vite
# ou directement
vite
```

## Informations

Ce projet utilise [React](https://fr.reactjs.org/) et [Vite](https://vitejs.dev/) et les packages suivants :

- [React Router](https://reactrouter.com/)
- [Font Awesome](https://fontawesome.com/)
- [FullCalendar](https://fullcalendar.io/)
- [React Md Editor](https://github.com/uiwjs/react-md-editor) (Pas encore implémenté)

### Fonctionnalités

- [x] Gestion des rendez-vous
- [x] Dashboard
- [x] FAQ
- [x] Gestion des animaux
- [x] Agenda
- [x] Authentification
- [x] Gestion des utilisateurs
- ...

Il y a des fonctionnalités qui ne sont pas encore implémentées, mais qui sont prévues pour la version finale.

- Gestion des vaccins
- Types d'animaux qu'un vétérinaire peut traiter
- Multiple animaux par rendez-vous
- Mise en avant des vétérinaires (FAQ)
- ...

Cependant, nous n'avons pas eu le temps de les implémenter.

## Docker

Une image Docker est disponible grâce au fichier `Dockerfile` présent à la racine du projet.

## Types de comptes et actions possibles

Voici les types de comptes et les actions possibles pour chacun d'entre eux (il est possible que nous ayons oublié certaines actions) :

- Vétérinaire
  - Accés aux rendez-vous
  - Accés aux Dashboard
    - Modification de l'agenda
    - Validation des rendez-vous
    - Modification des informations personnelles
    - Accés au rendez-vous actuel
  - Accés aux informations personnelles
- Client
  - Accés aux rendez-vous
  - Accés aux animaux
  - Accés aux adresses
  - Accés aux informations personnelles
- Administrateur
  - Accés au back-office (EasyAdmin)
