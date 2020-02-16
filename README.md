[Read in English](https://github.com/williamcanin/skeleton-gosync/blob/master/README_en.md)

# Skeleton Go!Sync

[![Build Status](https://travis-ci.org/williamcanin/skeleton-gosync.svg?branch=master)](https://travis-ci.org/williamcanin/skeleton-gosync)

Simples boilerplate com [Gulp](http://gulpjs.com/), [Twitter Bootstrap](http://getbootstrap.com), [Pug](http://pugjs.org) e [Browser Sync](https://www.browsersync.io) para projetos em HTML.

### Introdução

"Skeleton Go!Sync" facilita o desenvolver de projetos HTML's de uma forma em que o monitoramento de todas as alterações ocorridas em Pug, Folhas de estilos e Javascripts são feitas automaticamente através de tarefas do [Gulp](http://gulpjs.com/), [plugins](https://github.com/williamcanin/skeleton-gosync/blob/master/package.json), e [Browser Sync](https://www.browsersync.io). Uma facilidade pra esquecer o F5 do navegador ;)


### *Como é o funcionamento do **Skeleton Go!Sync**?*

* Toda estrutura de arquivos .pug são minificadas para html.

* Você cria as folhas de estilos com SASS que serão compiladas para CSS e minificadas automaticamente* a cada alteração.

* Os JavaScripts são concatenados e minificados automaticamente a cada alteração também.

* As imagens também são minificadas, porém, somente na inicialização do  Browser Sync ou na execução de compilação com a tarefa `$ gulp build` ou da própria tarefa de minificação da imagem ` gulp imagemin` .

* O projeto será armazenado na pasta `public`.


### Requerimentos 

| Requerido       | Versão | Como verificar      | Como instalar  |
| --------------- | -------| ------------------- | -------------- | 
| Git             | 2.25.0 | `git --version`     | [Git](http://git-scm.com/) |
| Node            | 13.7.0 | `node -v`          | [Nodejs](http://nodejs.org/) |
| Python          | 3.x    | `python --version`  | [Python](https://www.python.org/) |
| Npm             | 6.13.6 | `npm --version`     | **Nodejs** contains **Npm** |
| Gulp            | 4.0.2  | `gulp -v`           | [Gulp](http://gulpjs.com/) |

> Veja a documentação de cada requerimento para a instalação.

### Instalando

Após instalar todos requerimentos acima, faça os comando abaixo:

1 - Faz o clone do **Skeleton Go!Sync** e acesse a pasta:

~~~
$ git clone https://github.com/williamcanin/skeleton-gosync.git "mysite"; cd mysite
~~~

* 2 - Instalando as dependências do **Skeleton Go!Sync**:

~~~
$ npm install
~~~

### Compilando

* Use o comando abaixo para compilar seu projeto:

~~~
$ gulp build
~~~

ou

~~~
$ $(npm bin)/gulp build
~~~

Nota: Seu site irá ser compilado na pasta `public`.

### Iniciando servidor local

* O comando abaixo você inicia um servidor local com o [Browser Sync](https://www.browsersync.io) (para desenvolvimento):

~~~
$ gulp serve
~~~

ou

~~~
$ $(npm bin)/gulp serve
~~~

> Nota 1: Para obter mais tarefas do gulp, use `gulp --tasks`.
> Nota 2: Não há necessidade de compilar e, em seguida, iniciar o servidor.

### Desenvolvimento

* 1 - Você deve criar toda estrutura de layout e includes do seu projeto no diretório `src/templates` utilizando [Pug](http://pugjs.org).

* 2 - A pasta `src/views` é onde você deve criar suas páginas, que terá includes, extends e blocks
através das pastas `src/templates/includes` and `src/templates/layouts`.

* 3 - Antes de hospedar seu projeto no servidor, altere no arquivo `config.json` o valor de `url`, colocando a url do seu site. Após isso, você pode executar o comando `gulp build` e hospedar em um servidor na web.

### Licença

[MIT License](https://opensource.org/licenses/MIT) © William Canin