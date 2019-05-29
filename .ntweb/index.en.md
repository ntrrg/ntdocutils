---
title: ntDocutils
description: Docutils theme manager.
metadata:
  source-code: https://github.com/ntrrg/ntdocutils
  license: MIT
kinds:
  - cli
  - documentation
techs:
  - python
  - docutils
  - pygments
  - mdl
---

[![pypi](https://img.shields.io/pypi/v/NtDocutils.svg)](https://pypi.python.org/pypi/NtDocutils)

**ntDocutils** is a theme manager for [Docutils](http://docutils.sourceforge.net/).
It acts as a wrapper for the `rst2html5.py` frontend, and that enables the
customization possibility of the resulting file.

{{< toc >}}

# Install

**Requirements:**

* Python >= 3.4 

## From PyPI

```shell-session
$ pip install NtDocutils
```

## From source

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

# Usage

Basically, you have to do two things:

1\. Create a `.rst` file:

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

2\. Process your file:

```shell-session
$ ntdocutils example.rst example.html
```

And that's it, you already have a HTML file, just like Docutils.

{{< img src="images/example.png" alt="Default Theme" class="block" >}}

To use a theme, just install it and pass the `-T THEME` flag, for example, to
use the [MDL theme](https://ntrrg.github.io/ntdocutils-theme-mdl):

```shell-session
$ pip install ntdocutils-theme-mdl
```

```shell-session
$ ntdocutils -T mdl example.rst example.html
```

And this is the result:

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

# Themes

* [MDL](https://ntrrg.github.io/ntdocutils-theme-mdl)

## Create a theme

1\. Get the template.

```shell-session
$ git clone \
  --depth 1 \
https://github.com/ntrrg/ntdocutils-theme-template.git \
REPOSITORY_NAME
```

2\. Set up the template.

```shell-session
$ cd REPOSITORY_NAME
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

3\. Edit  and test the template (see the [MDL theme](https://github.com/ntrrg/ntdocutils-theme-mdl/)
code and use it as example).

```shell-session
$ pip install -e .
```

```shell-session
$ cd docs
```

```shell-session
$ ntdocutils -T THEME_NAME -S local demo.rst index.html
```

4\. Publish the theme.

**Note:** a Python account is needed ([create an account](https://pypi.org/account/register/)).

```shell-session
$ rm -rf ntdocutils-theme-THEME_NAME
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

# Uninstall

```shell-session
$ pip uninstall -y NtDocutils docutils Pygments
```

# Contributing

See the [contribution guide](https://github.com/ntrrg/ntdocutils/blob/master/CONTRIBUTING.md)
for more information.

# Acknowledgment

Working on this project I use/used:

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

