# Discussion & commentary on Articles
## Introduction ##
This web application is created with ReactJS 17 & Symfony 5.4

### Prerequisites

What things you need to install the software and how to install them.
- PHP 7.4
- [composer](https://getcomposer.org/download/)
- [symfony](https://symfony.com/doc/current/setup.html)
- npm 8.5.2
- node v17.7.2

### Installing the BackEnd

```bash
cd api
composer install
php bin/console doctrine:database:create
php bin/console make:migration
php bin/console doctrine:migrations:migrate
symfony server:start
```
open the url http://localhost:8000 you will be automatically redirected to http://localhost:8000/api/doc  
![](../../../../../../home/badr/Desktop/apidoc.png)

### Installing the FrontEnd

```bash
cd front
npm install #to install all  dependencies
npm start # to start the local server (this project uses create-react-app)
```

Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.
