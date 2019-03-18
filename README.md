[Read in English](https://github.com/williamcanin/skeleton-gosync/blob/master/README_en.md)

# Skeleton Go!Sync

[![Build Status](https://travis-ci.org/williamcanin/skeleton-gosync.svg?branch=master)](https://travis-ci.org/williamcanin/skeleton-gosync)

Simples boilerplate com [Gulp](http://gulpjs.com/) (com Babel 7),  [Twitter Bootstrap](http://getbootstrap.com),, [Pug](http://pugjs.org) e [Browser Sync](https://www.browsersync.io) para projetos em HTML.

### Introdução

"Skeleton Go!Sync" facilita o desenvolver de projetos HTML's de uma forma em que o monitoramento de todas as alterações ocorridas em Pug, Folhas de estilos e Javascripts são feitas automaticamente através de tarefas do [Gulp](http://gulpjs.com/), [plugins](https://github.com/williamcanin/skeleton-gosync/blob/master/package.json), e [Browser Sync](https://www.browsersync.io). Uma facilidade pra esquecer o F5 do navegador ;)


### *Como é o funcionamento do **Skeleton Go!Sync**?*

* Toda estrutura de arquivos .pug são minificadas para html.

* Você cria as folhas de estilos com SASS que serão compiladas para CSS e minificadas automaticamente* a cada alteração.

* Os JavaScripts são concatenados e minificados automaticamente a cada alteração também.

* As imagens também são minificadas, porém, somente na inicialização do  Browser Sync ou na execução de compilação com a tarefa `$ gulp build` ou da própria tarefa de minificação da imagem ` gulp imagemin` .

* O projeto será armazenado na pasta `app`.


### Requerimentos 

| Requerido       | Versão | Como verificar      | Como instalar  |
| --------------- | -------| ------------------- | -------------- | 
| Git             |  2.21  | `git --version`     | [Git](http://git-scm.com/) |
| NodeJS          | 11.10.1| `node -v`          | [Nodejs](http://nodejs.org/) |
| Npm             | 6.8.0  | `npm --version`     | **Nodejs** contains **Npm** |
| Gulp            | 4.0.0  | `gulp -v`           | [Gulp](http://gulpjs.com/) |


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

* 4 - Você deve criar toda estrutura no diretório `src/templates` utilizando Pug.

* 4.1 - A pasta `pages` é onde você deve criar suas páginas, que terá includes e blocks 
        através das pastas `src/templates/includes` and `src/templates/layouts`.


* 5 - Antes de hospedar seu projeto, execute o comando `gulp build` para ter 
certeza que todo seu projeto esteja completo para hospedagem.

### Licença

[MIT License](https://opensource.org/licenses/MIT) © William Canin