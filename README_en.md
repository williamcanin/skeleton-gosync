[Leia em Português do Brasil](https://github.com/williamcanin/skeleton-gosync/blob/master/README.md)

# Skeleton Go!Sync

Simple boilerplate with [Gulp](http://gulpjs.com/) and [Browser Sync](https://www.browsersync.io) for projects HTML.

### Intro

**Skeleton Go!Sync** makes it easy to develop HTML's projects in a way that the monitoring of all changes in Html, Stylesheets and Javascripts are made automatically through tasks [Gulp](http://gulpjs.com/), [plugins](https://github.com/williamcanin/skeleton-gosync/blob/master/README_en.md#plugins) and the [Browser Sync](https://www.browsersync.io). To forget the F5 on browser ;)


### *How it works the operation of **Skeleton Go!Sync**?*

* All Html structure are minified.

* You create style sheets with "SASS" that will be compiled for "CSS" and automatically minificadas every change.

* JavaScripts are concatenated and automatically diminished every change also.

* Images are also minified, however, only at startup Browser Sync or performing compilation with the `$ gulp build` or task ` gulp imagemin`.

* The project will be stored in the folder `build`.


### Requirements

| Required        | Checking      | How to install  |
| --------------- | ------------------- | -------------- | 
| Git             | `git --version`     | [Git](http://git-scm.com/) |
| Ruby            | `ruby -v`           | [Ruby](https://www.ruby-lang.org) |
| NodeJS          | `node -v`           | [Nodejs](http://nodejs.org/) |
| Npm             | `npm --version`     | **Nodejs** contains **Npm** |
| Gulp            | `gulp -v`           | `npm install -g gulp` |


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

* 4 - You must create all structure in the `src/template`. 

* 5 -  Before you host your project, run the following command `gulp build` to make sure that all your design is complete for hosting. 


### Plugins

| Plugin          | How to install and configure                    | 
| --------------- | ----------------------------------------------- | 
| gulp-concat     | [npm install --save-dev gulp-concat](https://www.npmjs.com/package/gulp-concat)            | 
| gulp-htmlmin    | [npm install --save-dev gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin)           |
| gulp-imagemin   | [npm install --save-dev gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)          |
| gulp-jshint     | [npm install --save-dev gulp-jshint](https://www.npmjs.com/package/gulp-jshint)            |
| gulp-notify     | [npm install --save-dev gulp-notify](https://www.npmjs.com/package/gulp-notify)            |
| gulp-plumber    | [npm install --save-dev gulp-plumber](https://www.npmjs.com/package/gulp-plumber)           |
| gulp-rename     | [npm install --save-dev gulp-rename](https://www.npmjs.com/package/gulp-rename)            |
| gulp-rimraf     | [npm install --save-dev gulp-rimraf](https://www.npmjs.com/package/gulp-rimraf)            |
| gulp-sass       | [npm install --save-dev gulp-sass](https://www.npmjs.com/package/gulp-sass)              |
| gulp-strip-comments    | [npm install --save-dev gulp-strip-comments](https://www.npmjs.com/package/gulp-strip-comments)  |
| gulp-task-listing    | [npm install --save-dev gulp-task-listing](https://www.npmjs.com/package/gulp-task-listing)           |
| gulp-uglify     | [npm install --save-dev gulp-uglify](https://www.npmjs.com/package/gulp-uglify)            |
| gulp-watch      | [npm install --save-dev gulp-watch](https://www.npmjs.com/package/gulp-watch)             |
| jshint          | [npm install --save-dev jshint](https://www.npmjs.com/package/jshint)                 |
| gulp-sourcemaps | [npm install --save-dev gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)        |


### License

[MIT License](https://opensource.org/licenses/MIT) © William Canin