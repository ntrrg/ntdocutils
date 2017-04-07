# NtDocutils https://ntrrg.github.io/NtDocutils/
# Copyright (c) 2017 Miguel Angel Rivera Notararigo
# Licensed under The MIT License. See LICENSE file for full licensing details.

"""NtDocutils command line utilities.

Provides:

* :py:`class ArgumentParser`: NtDocutils command line parser.
* :py:`def dict2args`: dictionary to arguments list converter.
"""

__docformat__ = "reStructuredText"

import argparse
from importlib import import_module
from os import listdir
from os import path

from ntdocutils import __version__, COPYRIGHT, DESCRIPTION, __file__ as package

formatter_class = argparse.RawDescriptionHelpFormatter


class ArgumentParser(argparse.ArgumentParser):
    """Create a NtDocutils command line parser."""

    def __init__(self, description=DESCRIPTION, epilog=COPYRIGHT,
                 formatter_class=argparse.RawDescriptionHelpFormatter,
                 **kwargs):
        argparse.ArgumentParser.__init__(
            self,
            description=description,
            epilog=epilog,
            formatter_class=formatter_class,
            **kwargs
        )

        # Positionals
        self.add_argument(
            "source",
            help="file to process.",
            metavar="SOURCE"
        )

        self.add_argument(
            "destination",
            help="file to generate.",
            metavar="DESTINATION"
        )

        # Optionals
        self.add_argument(
            "-V", "--version",
            action="version",
            version="NtDocutils {}".format(__version__)
        )

        self.add_argument(
            "-T", "--theme",
            default="mdl",
            choices=self.get_themes(),
            help="theme used to generate DESTINATION."
        )

        self.add_argument(
            "-S", "--server",
            help="server where assets are hosted. If ``file`` is passed as "
                 "value, it will activate the offline mode, this will create "
                 "a directory with the theme name in the DESTINATION parent "
                 "folder and stores the necessary assets in there"
        )

    def get_themes(self):
        """Generate themes list."""

        basedir = path.dirname(path.abspath(package))
        themes = listdir(path.join(basedir, "themes"))

        return [theme for theme in themes if not theme.startswith("_")]


def dict2args(dictionary):
    """Generate an arguments list from a dictionary.

    ``dictionary`` ( :py:`dict` )
      Dictionary to process.

    :py:`return` ( :py:`list` )
      Generated arguments list.
    """

    args = []

    for key, value in dictionary.items():
        arg = "-"

        if len(key) > 1:
            arg += "-"

        arg += key

        if not isinstance(value, bool):
            arg += "=" + str(value)

        args.append(arg)

    return args


def main():
    """Command line launcher."""
    parser = ArgumentParser()
    args, docutils_args = parser.parse_known_args()

    # Get writer for specified theme
    theme = import_module("ntdocutils.themes." + args.theme)
    writer = theme.Writer(server=args.server)

    writer.write(args.source, args.destination, docutils_args)
