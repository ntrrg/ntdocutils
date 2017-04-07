.. Roles

.. role:: py(code)
    :language: python3

==========
NtDocutils
==========

.. image:: https://img.shields.io/badge/version-0.1.0-blue.svg
    :target: https://github.com/ntrrg/NtDocutils/releases/tag/v0.1.0

.. image:: https://img.shields.io/badge/license-MIT-blue.svg
    :target: https://opensource.org/licenses/MIT

.. image:: https://github.com/ntrrg/NtDocutils/raw/v0.1.0/docs/images/ntdocutils.png

__ MDL_
__ NtDocutils_

**NtDocutils** is a `Material Design Lite`__ theme for Docutils_. See the
`official site`__ for more info.

Features
========

* All features from Docutils_ for the ``rst2html5.py`` writer.

* Special roles for emojis and keyboard keys.

* Filter content by OS and distributions.

* Download the attachments, print the article and more.

* Theme customization.

Installation
============

    If you will install **NtDocutils** without a virtualenv on Debian (or
    other GNU/Linux distribution), you will need superuser privileges.

**NtDocutils** requires:

* Python_ 3.4 or above
* Docutils_ 0.13.1 *(autoinstalled)*
* Pygments_ 2.2.0 *(autoinstalled)*

From PyPI
---------

.. code:: sh

    pip install NtDocutils==0.1.0

Usage
=====

Basically, you have to do two things:

#. Create a ``.rst`` file:

   ``example.rst``:

   .. code:: rest
       :number-lines:

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

#. Process your file:

   .. code:: sh

       ntdocutils example.rst example.html

And that's it, you already have some like this:

.. image:: https://github.com/ntrrg/NtDocutils/raw/v0.1.0/docs/images/merida.jpg

__ https://ntrrg.github.io/NtDocutils/#usage

See `this section`__ in the official site for more utilites.

Command line reference
----------------------

.. code:: text

    ntdocutils [-h] [-V] [-S SERVER] SOURCE DESTINATION

-h, --help
    Shows the help message.

-V, --version
    Shows the **NtDocutils** version.

-S SERVER, --server SERVER
    Server where assets are hosted. If ``file`` is passed as value, it will
    activate the offline mode, this will create a directory with the theme
    name in the ``DESTINATION`` parent folder and stores the necessary assets
    in there.

..

    All the options from the ``rst2html.py`` writer are available.

Uninstallation
==============

    If you did install **NtDocutils** without a virtualenv on Debian (or other
    GNU/Linux distribution), you will need superuser privileges.

Should be enough with this:

.. code:: sh

    pip uninstall NtDocutils

Attributions and references
===========================

**NtDocutils** uses:

* reStructuredText_ and Docutils_

__ MDL_

* `Material Design Lite`__
* Roboto_
* `Material icons`_

**Docutils Team.** *reStructuredText.* http://docutils.sourceforge.net/rst.html

**Mozilla Developer Network.** *JavaScript | MDN.* https://developer.mozilla.org/en-US/docs/Web/JavaScript

.. Links

.. _MDL: https://getmdl.io/
.. _Docutils: http://docutils.sourceforge.net/
.. _NtDocutils: https://ntrrg.github.io/NtDocutils/
.. _Roboto: https://fonts.google.com/specimen/Roboto
.. _Material Icons: https://material.io/icons/
.. _Python: https://www.python.org/
.. _Pygments: http://pygments.org/
.. _reStructuredText: http://docutils.sourceforge.net/rst.html
