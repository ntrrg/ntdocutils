.. Roles

.. role:: emoji
.. role:: kbd

.. role:: py(code)
    :language: python3

.. role:: css(code)
    :language: css

.. role:: js(code)
    :language: js



==========
NtDocutils
==========

-----
0.1.0
-----

:Author: Miguel Angel Rivera Notararigo
:Contact: ntrrgx@gmail.com
:Version: 0.1.0
:Date: 2017-04-06 22:35:00 -04:00
:License: `MIT <https://opensource.org/licenses/MIT>`_

.. image:: images/ntdocutils.png
    :class: article-image
    :alt: NtDocutils

__ MDL_

**NtDocutils** is a `Material Design Lite`__ theme for Docutils_ (maybe a
little more :emoji:`😄`). This site was built with it, so you may see what you
can do, but if you want to see all the styles, you should go to the `demo
site`_.

.. contents::

Features
========

__ `Demo site`_

* `All features`__ from Docutils_ for the ``rst2html5.py`` writer.

__ demo.html#emojis-and-keyboard-keys

* Special roles for emojis and keyboard keys (see `this section`__).

__ `OS filtering`_

* Filter content by OS and distributions (see `this section`__).

__ Attachments_

.. |options-button| image:: images/options-button.png
    :class: inline
    :height: 3em

* Download the attachments (see `this section`__), print the article and more
  from the |options-button| button.

__ `Theme customization`_

* Theme customization (see `this section`__).

Installation
============

.. note::
    :class: os os-debian

    If you will install **NtDocutils** without a virtualenv, you will need
    superuser privileges.

**NtDocutils** requires:

* Python_ 3.4 or above
* Docutils_ 0.13.1 *(autoinstalled)*
* Pygments_ 2.2.0 *(autoinstalled)*

From PyPI
---------

.. code:: sh
    :class: os os-debian

    pip install NtDocutils==0.1.0

.. code:: bat
    :class: os os-windows

    pip install NtDocutils==0.1.0

.. class:: os-debian media-print

|br|

Usage
=====

Basically, you have to do two things:

.. class:: os-debian media-print

|br|

#. Create a ``.rst`` file:

   ``example.rst``:

   .. include:: example.rst
       :code: rest
       :number-lines:

#. Process your file:

   .. code:: sh
       :class: os os-debian

       ntdocutils example.rst example.html

   .. code:: bat
       :class: os os-windows

       ntdocutils example.rst example.html

.. class:: os-windows media-print

|bp|

And that's it, you already have some like this:

.. raw:: html

    <object data="example.html" type="text/html" height="400px" width="100%"
        class="media-screen">
    </object>

.. image:: images/example.png
    :class: media-print

The following sections cover the usage of some utilities to improve your
article and at the end you can see the `command line reference`_.

OS filtering
------------

You can create content for every OS just adding the ``os os-{{ OS name }}``
classes in the elements you want filter, **NtDocutils** will create the
buttons dynamically at the left bottom corner and set the first OS that it
finds as default. E.g:

.. code:: rest
    :number-lines:

    .. class:: os os-debian

    **Text for Debian**

    .. class:: os os-windows

    **Text for Windows**

Will result in:

.. class:: os os-debian

**Text for Debian**

.. class:: os os-windows

**Text for Windows**

And creates the following buttons:

.. image:: images/os-selection.png
    :align: center

.. class:: os-windows

|bp|

Attachments
-----------

.. |attachments-button| image:: images/attachments-button.png
    :class: inline
    :height: 3em

You can set a list of useful files in the |attachments-button| button by
adding the following lines in your article:

.. code:: rest
    :number-lines:

    .. raw:: html

        <script>
            ATTACHMENTS = [
                {
                    "url": "NtDocutils.rst",
                    "name": "NtDocutils 0.1.0.rst",
                    "icon": "code"
                }
            ];
        </script>

.. admonition:: Syntax
    :class: syntax

    ``ATTACHMENTS`` is a global array, it store the files list showed in
    |attachments-button| button, each file must be defined as an object with
    the following properties:

    ``url`` ( :js:`String` )
      URL to the file, could be an external link.

    ``name`` ( :js:`String` )
      **Optional**. Name displayed at the list, also overwrites the attachment
      name.

    __ `Material Icons`_

    ``icon`` ( :js:`String` )
      **Optional**. `Material icon`__ displayed at the list, by default
      **NtDocutils** uses an icon related to the file extension.

    .. code:: text
        :number-lines:

        .. raw:: html

            <script>
                ATTACHMENTS = [
                    {
                        "url": URL,
                        "name": DISPLAY_NAME,
                        "icon": ICON_NAME
                    },
                    ...
                    {
                        "url": URL_N,
                        "name": DISPLAY_NAME_N,
                        "icon": ICON_NAME_N
                    }
                ];
            </script>

Theme customization
-------------------

__ https://getmdl.io/customize/
__ attachments/customize.css

You can use the `customize tool`__ from the MDL_ site to get a custom
``.css`` with your preferred colors, after that, you must setup some styles
by creating a file with the following template__:

``customize.css``

.. code:: css
    :number-lines:

    /* Ribbon */

        .ribbon {
            background-color: {{ Primary color }};
        }

    /* ... */

.. code:: css
    :number-lines: 83

    /* ... */

    /* Links */

        /*a {
            color: {{ Accent color }};
        }*/

    /* ... */

The recommended color for the ribbon background (line 4) is the primary color
from the theme, you can get this value searching the property :css:`color` at
the rule :css:`.mdl-button.mdl-button--colored` in the file you downloaded
from MDL_ (``material.min.css``). The links (line 88) uses the accent color
from the theme, but in some cases this make them a little unreadable, so you
could uncomment it and use the primary color. You can feel free editing the
others rules, but usually they will be fine with that values. When you are
ready, you have to run **NtDocutils** with the following option:

.. code:: sh
    :class: os os-debian

    ntdocutils --stylesheet=path/to/material.min.css,path/to/customize.css \
    source.rst destination.html

.. code:: bat
    :class: os os-windows

    ntdocutils --stylesheet=path/to/material.min.css,path/to/customize.css \
    source.rst destination.html

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

.. note::

    All the options from the ``rst2html.py`` writer are available.

Uninstallation
==============

.. note::
    :class: os os-debian

    If you did install **NtDocutils** without a virtualenv, you will need
    superuser privileges.

Should be enough with this :emoji:`😅`:

.. code:: sh
    :class: os os-debian

    pip uninstall NtDocutils

.. code:: bat
    :class: os os-windows

    pip uninstall NtDocutils

|bp|

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
.. _Demo site: demo.html
.. _reStructuredText: http://docutils.sourceforge.net/rst.html
.. _Roboto: https://fonts.google.com/specimen/Roboto
.. _Material Icons: https://material.io/icons/
.. _Python: https://www.python.org/
.. _Pygments: http://pygments.org/

.. Raw content

.. raw:: html

    <script>
        ATTACHMENTS = [
            {
                "url": "NtDocutils.rst",
                "name": "NtDocutils 0.1.0.rst",
                "icon": "code"
            },
            {
                "url": "attachments/ntdocutils_debian.pdf",
                "name": "NtDocutils 0.1.0 (Debian).pdf"
            },
            {
                "url": "attachments/ntdocutils_windows.pdf",
                "name": "NtDocutils 0.1.0 (Windows).pdf"
            }
        ];
    </script>

.. |br| raw:: html

    <br />

.. |bp| raw:: html

    <div class="media-print" style="page-break-after: always"></div>
