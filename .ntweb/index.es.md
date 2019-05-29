---
title: ntDocutils
description: Gestor de temas para Docutils.
metadata:
  source-code: https://github.com/ntrrg/ntdocutils
  license: MIT
kinds:
  - cli
  - documentación
techs:
  - python
  - docutils
  - pygments
  - mdl
---

[![pypi](https://img.shields.io/pypi/v/NtDocutils.svg)](https://pypi.python.org/pypi/NtDocutils)

**ntDocutils** es un gestor de temas para [Docutils](http://docutils.sourceforge.net/).
Su función es ser un mediador para el frontend `rst2html5.py`, y con esto
habilitar la posibilidad de personalizar el archivo obtenido.

{{< toc >}}

# Instalación

**Requisitos:**

* Python >= 3.4 

## Desde el PyPI

```shell-session
$ pip install NtDocutils
```

## Desde el código fuente

```shell-session
$ wget https://github.com/ntrrg/ntdocutils/archive/v1.0.0.tar.gz
```

```shell-session
$ tar -xvf v1.0.0.tar.gz
```

```shell-session
$ cd ntdocutils-1.0.0
```

```shell-session
$ python3 setup.py
```

# Uso

Básicamente de deben hacer dos cosas:

1\. Crear un archivo `.rst`:

`example.rst`:

```rest
==========
My Article
==========

:Author: Vultur Gryphus
:Contact: info@vultur.org.ve

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
sint occaecat cupidatat non proident, sunt in culpa qui officia
deserunt mollit anim id est laborum.
```

2\. Procesar el archivo:

```shell-session
$ ntdocutils example.rst example.html
```

Y eso es todo, ya debería tener su archivo HTML con el estilo predeterminado.

{{< img src="images/example.png" alt="Default Theme" class="block" >}}

Para usar un tema, solo debe instalarse y pasarse la opción `-T TEMA`, por
ejemplo, para usar el [tema MDL](https://ntrrg.github.io/ntdocutils-theme-mdl):

```shell-session
$ pip install ntdocutils-theme-mdl
```

```shell-session
$ ntdocutils -T mdl example.rst example.html
```

Y el resultado es:

{{< img src="images/mdl-example.png" alt="MDL Theme" class="block" >}}

## CLI

```shell-session
$ ntdocutils -h
usage: ntdocutils [-h] [-V] [-T THEME] [-S SERVER] SOURCE DESTINATION

NtDocutils is a theme manager for Docutils.

positional arguments:
  SOURCE                file to process.
  DESTINATION           file to generate.

optional arguments:
  -h, --help            show this help message and exit
  -V, --version         show program's version number and exit
  -T THEME, --theme THEME
                        theme used to generate DESTINATION.
  -S SERVER, --server SERVER
                        server from where assets will be downloaded. If
                        'local' is passed as value, it will activate the
                        offline mode, this will create a directory with the
                        theme name in the 'DESTINATION' parent folder and
                        stores the necessary assets in there.

NtDocutils v1.0.0 https://nt.web.ve/en/projects/ntdocutils
Copyright (c) 2017 Miguel Angel Rivera Notararigo
Licensed under The MIT License
```

NtDocutils recibe dos argumentos, `SOURCE` y `DESTINATION`, que son el archivo
reStructuredText y el archivo donde se escribirá resultado (HTML)
respectivamente; además puede recibir cuatro opciones:

* `-h`, `--help`: muestra el texto de ayuda de arriba y finaliza la ejecución.

* `-V`, `--version`: muestra la versión de NtDocutils y finaliza la ejecución.

* `-T TEMA`, `--theme TEMA`: determina el tema que será usado para procesar el
  archivo `SOURCE`; si no se especifica algún tema, se usará el estilo
  predeterminado de Docutils.

* `-S SERVIDOR`, `--server SERVIDOR`: servidor de donde se descargarán los
  archivos estáticos del tema (CSS, JavaScript, etc...); en caso de que se use
  el valor `local`, NtDocutils creará una carpeta justo al lado del archivo
  `DESTINATION` que contendrá todos archivos necesitados por el tema.

# Temas

* [MDL](https://ntrrg.github.io/ntdocutils-theme-mdl)

## Crear un tema

1\. Obtener la plantilla.

```shell-session
$ git clone \
  --depth 1 \
https://github.com/ntrrg/ntdocutils-theme-template.git \
NOMBRE_REPOSITORIO
```

2\. Configurar la plantilla.

```shell-session
$ cd NOMBRE_REPOSITORIO
```

```shell-session
$ EDITOR config.sh
```

`config.sh`:

```sh
NAME="test"
VERSION="1.0.0"
DESCRIPTION="This is a test theme."
URL="https://github.com/ntrrg/ntdocutils-theme-test"
AUTHOR="Miguel Angel Rivera Notararigo"
EMAIL="ntrrgx@gmail.com"
SERVER="https://ntrrg.github.io/ntdocutils-theme-test/ntdocutils-theme-test"
```

```shell-session
$ ./setup.sh
```

3\. Editar y probar la plantilla (vea el código fuente del [tema MDL](https://github.com/ntrrg/ntdocutils-theme-mdl/)
y úselo como ejemplo).

```shell-session
$ pip install -e .
```

```shell-session
$ cd docs
```

```shell-session
$ ntdocutils -T TEMA -S local demo.rst index.html
```

4\. Publicar el tema.

**Nota:** Es necesario tener una cuenta Python ([crear una cuenta](https://pypi.org/account/register/)).

```shell-session
$ rm -rf ntdocutils-theme-TEMA
```

```shell-session
$ cd ..
```

```shell-session
$ pip install setuptools twine
```

```shell-session
$ rm -rf dist
```

```shell-session
$ python setup.py sdist bdist_well
```

```shell-session
$ twine upload dist/*
```

# Desinstalar

```shell-session
$ pip uninstall -y NtDocutils docutils Pygments
```

# Contribuir

Ver la [guía de contribución](https://github.com/ntrrg/ntdocutils/blob/master/CONTRIBUTING.md)
para más información.

# Atribuciones

Trabajando en este proyecto usé/uso:

* [Debian](https://www.debian.org/)

* [XFCE](https://xfce.org/)

* [Sublime Text 3](https://www.sublimetext.com/3)

* [Chrome](https://www.google.com/chrome/browser/desktop/index.html)

* [Terminator](https://gnometerminator.blogspot.com/p/introduction.html)

* [Zsh](http://www.zsh.org/)

* [Git](https://git-scm.com/)

* [EditorConfig](http://editorconfig.org/)

* [Github](https://github.com)

* [Inkscape](https://inkscape.org/en/)

* [GIMP](https://www.gimp.org/)

* [Material Icons](https://material.io/icons/)

* [Roboto](https://fonts.google.com/specimen/Roboto)

* [RawGit](https://rawgit.com/)

* [st](https://st.suckless.org/)

* [GNU Screen](https://www.gnu.org/software/screen)

* [Vim](https://www.vim.org/)

* [Gogs](https://gogs.io/)

* [Python](https://www.python.org)

* [Docutils](http://docutils.sourceforge.net/)

* [Pygments](http://pygments.org)

**Docutils Team.** *reStructuredText.* <http://docutils.sourceforge.net/rst.html>

**Mozilla Developer Network.** *JavaScript.* <https://developer.mozilla.org/en-US/docs/Web/JavaScript>

