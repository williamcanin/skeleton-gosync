[Leia em Português do Brasil](https://github.com/williamcanin/skeleton-gosync/blob/master/README.md)

# Skeleton Go!Sync

[![Build Status](https://travis-ci.org/williamcanin/skeleton-gosync.svg?branch=master)](https://travis-ci.org/williamcanin/skeleton-gosync)

Simple boilerplate with [Gulp](http://gulpjs.com/) (with Babel 7), [Twitter Bootstrap](http://getbootstrap.com), [Pug](http://pugjs.org) and [Browser Sync](https://www.browsersync.io) for projects HTML.

### Intro

**Skeleton Go!Sync** makes it easy to develop HTML's projects in a way that the monitoring of all changes in Pug, Stylesheets and Javascripts are made automatically through tasks [Gulp](http://gulpjs.com/), [plugins](https://github.com/williamcanin/skeleton-gosync/blob/master/package.json) and the [Browser Sync](https://www.browsersync.io). To forget the F5 on browser ;)


### *How it works the operation of **Skeleton Go!Sync**?*

* All .pug structure are minified.

* You create style sheets with "SASS" that will be compiled for "CSS" and automatically minificadas every change.

* JavaScripts are concatenated and automatically diminished every change also.

* Images are also minified, however, only at startup Browser Sync or performing compilation with the `$ gulp build` or task ` gulp imagemin`.

* The project will be stored in the folder `build`.


### Requirements

| Required       | Version | Checking      | How to install  |
| --------------- | -------| ------------------- | -------------- | 
| Git             |  2.21  | `git --version`     | [Git](http://git-scm.com/) |
| NodeJS          | 11.10.1| `node -v`          | [Nodejs](http://nodejs.org/) |
| Npm             | 6.8.0  | `npm --version`     | **Nodejs** contains **Npm** |
| Gulp            | 4.0.0  | `gulp -v`           | [Gulp](http://gulpjs.com/) |


> See the documentation for each application to install.


### Usage

After installing all of the above requirements, do the following commands:

* 1 - Make Clone **Skeleton Go!Sync** and go to the folder:

~~~
$ git clone https://github.com/williamcanin/skeleton-gosync.git "name_your_project"; cd name_your_project
~~~

* 1 - Installing dependencies:

~~~
$ npm install
~~~

* 2 - To compile:

~~~
$ gulp build
~~~

* 3 - Starting the server and monitoring:

~~~
$ gulp serve
~~~

> Note: No need to compile and then start the server.

* 4 - You must create all structure in the `src/templates` using Pug.

* 4.1 - The `views` folder is where you should create your pages, which will have includes and blocks
         through the `src/templates/includes` and `src/templates/layouts` folders.

* 5 -  Before you host your project, run the following command `gulp build` to make sure that all your design is complete for hosting.

### License

[MIT License](https://opensource.org/licenses/MIT) © William Canin