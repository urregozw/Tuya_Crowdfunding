<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/urregozw/Tuya_Crowdfunding">
    <img src="entrega1_sprint0/Logos/dev1.PNG" alt="Logo" width="200" height="auto">
  </a>
  <a href="https://github.com/urregozw/Tuya_Crowdfunding">
    <img src="entrega1_sprint0/Logos/tuya.PNG" alt="Logo" width="200" height="auto">
  </a>

  <h3 align="center">Tuya Crowd Funding</h3>

  <p align="center">
    Una aplicación de inversiones en asociación con Tuya
    <br />
    <a href="https://github.com/urregozw/Tuya_Crowdfunding/wiki"><strong>Explorar la Wiki »</strong></a>
    <br />
    <br />
    <a href="https://github.com/urregozw/Tuya_Crowdfunding/">Mirar un Demo</a>
    ·
    <a href="https://github.com/urregozw/Tuya_Crowdfunding/issues">Reportar un problema</a>
    ·
    <a href="https://github.com/urregozw/Tuya_Crowdfunding/issues">Sugerir una mejora</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
<summary><h2 style="display: inline-block">Tabla de contenidos</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">Sobre el proyecto</a>
      <ul>
        <li><a href="#built-with">Construido con</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Comenzando el proyecto</a>
      <ul>
        <li><a href="#prerequisites">Pre requisitos</a></li>
        <li><a href="#installation">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contribuir</a></li>
    <li><a href="#license">Licencia</a></li>
    <li><a href="#contact">Contacto</a></li>
    <li><a href="#acknowledgements">Reconocimientos</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## Sobre el proyecto

Esto es un proyecto en asociación con Tuya, para hacer un sistema de inversión e inversionistas realizado con Angular, .NET y MongoDB.

### Built With

-   [Laravel](https://github.com/laravel/laravel)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You will need to have PHP version 7.4 or greater installed to be able to use the project.

You can check out PHP here:

-   [PHP](https://www.php.net/downloads)

You will also need to have Composer installed .

You can check out Composer here:

-   [Composer](https://getcomposer.org/download/)

### Installation

1. You can check out how to set up the project <a href="#contributing">here</a>
2. cd into the project
    ```sh
    cd MovieTown
    ```
3. Install Composer Dependencies
    ```sh
    composer install
    ```
4. Create a copy of your .env file
    ```sh
    cp .env.example .env
    ```
5. Generate an app encryption key
    ```sh
    php artisan key:generate
    ```
6. Create an empty database for the application
   You can use your favorite development environment. I recommend you look at options like MAMP or XAMPP.
   Make sure you name the database **`movietown`**.
7. Add database information in the .env file
   We want to allow Laravel to connect to the database that you just created in the previous step. To do this, we must add the connection credentials in the .env file and Laravel will handle the connection from there.
   In the .env file fill in the `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` options to match the credentials of the database you just created.
8. Migrate the database
    ```sh
    php artisan migrate
    ```
9. Seed the database
    ```sh
    php artisan db:seed
    ```
10. Link storage
    ```sh
    php artisan storage:link
    ```
11. Run the project
    You can run the project by using your development environment or you may use the `serve` Artisan command:
    ```sh
    php artisan serve
    ```

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
For contributing, the project uses a strategy based on a [forking workflow.](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow)

Here you can check out a full list of steps for you to contribute to this project: [GitHub Forking Workflow](https://gist.github.com/Chaser324/ce0505fbed06b947d962)

Before opening any **Pull Request** you must use the projects linters to check and apply the project style guide.
When you installed the dependencies with `composer install` both [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) and [TLINT](https://github.com/tighten/tlint) where installed in your `vendor` folder. You can run this linters by running:

```sh
vendor/squizlabs/php_codesniffer/bin/phpcs
```

```sh
vendor/tightenco/tlint/bin/tlint
```

or you can install them globally in your machine by running:

```sh
composer global require "squizlabs/php_codesniffer=*"
```

```sh
composer global require tightenco/tlint
```

<!-- LICENSE -->

## Licencia

GNU GENERAL PUBLIC LICENSE Version 3. Mira `LICENSE` para más información.

<!-- CONTACT -->

## Contacto

Link del proyecto: [https://github.com/urregozw/Tuya_Crowdfunding](https://github.com/urregozw/Tuya_Crowdfunding)

<!-- ACKNOWLEDGEMENTS -->

## Reconocimientos

-   [ Juan Pablo Gómez ](https://github.com/jpgomezt)
-   [ Sebastian Urrego ](https://github.com/urregozw)
