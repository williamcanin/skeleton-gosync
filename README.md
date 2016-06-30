[Read in English](https://github.com/williamcanin/skeleton-gosync/blob/master/README_en.md)

# Skeleton Go!Sync

Simples boilerplate com [Gulp](http://gulpjs.com/) e [Browser Sync](https://www.browsersync.io) para projetos em HTML.

### Introdução

"Skeleton Go!Sync" facilita o desenvolver de projetos HTML's de uma forma em que o monitoramento de todas as alterações ocorridas em Html, folhas de estilos e Javascripts são feitas automaticamente através de tarefas do [Gulp](http://gulpjs.com/), [plugins](https://github.com/williamcanin/skeleton-gosync/blob/master/README.md#plugins), e [Browser Sync](https://www.browsersync.io). Uma facilidade pra esquecer o F5 do navegador ;)


### *Como é o funcionamento do **Skeleton Go!Sync**?*

* Toda estrutura Html são minificadas.

* Você cria as folhas de estilos com SASS que serão compiladas para CSS e minificadas automaticamente* a cada alteração.

* Os JavaScripts são concatenados e minificados automaticamente a cada alteração também.

* As imagens também são minificadas, porem, somente na inicialização do  Browser Sync ou na execução de compilação com a tarefa `$ gulp build` ou da própria tarefa de minificação da imagem ` gulp imagemin` .

* O projeto será armazenado na pasta `build`.


### Requerimentos 

| Requerido       | Como verificar      | Como instalar  |
| --------------- | ------------------- | -------------- | 
| Git             | `git --version`     | [Git](http://git-scm.com/) |
| Ruby            | `ruby -v`           | [Ruby](https://www.ruby-lang.org) |
| NodeJS          | `node -v`           | [Nodejs](http://nodejs.org/) |
| Npm             | `npm --version`     | **Nodejs** contains **Npm** |
| Gulp            | `gulp -v`           | `npm install -g gulp` |


> Veja a documentação de cada requerimento para a instalação.


### Usando

Após instalar todos requerimentos acima, faça os comando abaixo:

1 - Faz o clone do **Skeleton Go!Sync** e acesse a pasta:

~~~
$ git clone https://github.com/williamcanin/skeleton-gosync.git "nome_do_projeto"; cd nome_do_projeto
~~~

* 1 - Instalando as dependências:

~~~
$ npm install
~~~

* 2 - Compilar:

~~~
$ gulp build
~~~

* 3 - Iniciando o servidor e monitoramento:

~~~
$ gulp serve
~~~

> Nota: Não há necessidade de compilar e, em seguida, iniciar o servidor.

* 4 - Você deve criar toda estrutura no diretório `src/template`


* 5 - Antes de hospedar seu projeto, execute o comando `gulp build` para ter 
certeza que todo seu projeto esteja completo para hospedagem.



### Plugins

| Plugin          | Como Instalar e configurar                      | 
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


### Licença

[MIT License](https://opensource.org/licenses/MIT) © William Canin