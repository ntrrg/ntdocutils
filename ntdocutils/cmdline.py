# NtDocutils https://ntrrg.github.io/NtDocutils/
# Copyright (c) 2017 Miguel Angel Rivera Notararigo

"""
NtDocutils command line utilities.

Provides:

* ``ArgumentParser``: command line parser.
"""

__docformat__ = "reStructuredText"

import argparse
from importlib import import_module
from os import listdir, path

from ntdocutils import __version__, COPYRIGHT, DESCRIPTION
from ntdocutils import __file__ as package


class ArgumentParser(argparse.ArgumentParser):
    """Creates a NtDocutils command line parser."""

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
            help="server from where assets will be downloaded. If 'local' is "
                 "passed as value, it will activate the offline mode, this "
                 "will create a directory with the theme name in the "
                 "'DESTINATION' parent folder and stores the necessary assets"
                 " in there."
        )

    def get_themes(self):
        """Generates a themes list."""

        basedir = path.dirname(path.abspath(package))
        themes = listdir(path.join(basedir, "themes"))

        return [theme for theme in themes if not theme.startswith("_")]


def main():
    """Command line launcher."""
    parser = ArgumentParser()
    args, docutils_args = parser.parse_known_args()

    # Get theme writer
    theme = import_module("ntdocutils.themes." + args.theme)
    writer = theme.Writer(server=args.server)

    writer.write(args.source, args.destination, docutils_args)
