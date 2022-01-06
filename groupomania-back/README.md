## Backend

Naviguez vers le dossier groupomania-backend si vous n'etes pas déja dedans.
Puis installez les dépendences

    npm install

puis

    npm start ou nodemon serve

## Base de données

Se connecter au serveur **MySql** de votre choix.
Exécuter la commande: `CREATE DATABASE groupomania;`
Vérifiez les identifiants dans le fichier config.json du dossier groupomania-back/config puis importer le fichier groupomania.sql s'il vous a été fourni :

    mysql -u root -p groupomania < groupomania.sql

Il faut remplacer `groupomania.sql` par le chemin du fichier dans votre machine.
