# NtDocutils https://ntrrg.github.io/NtDocutils/
# Copyright (c) 2017 Miguel Angel Rivera Notararigo

"""
NtDocutils exceptions.

Provides:

* ``OfflineUnsupported``: theme doesn't support offline mode.
"""


class OfflineUnsupported(Exception):
    """
    Creates an exception to raise when theme doesn't support offline mode.
    """

    def __init__(self, theme):
        """
        ``OfflineUnsupported("<theme>")``

        ``theme`` (string)
          Theme name.

        Example
        =======

        .. code:: python

            raise OfflineUnsupported("mdl")
        """
        message = "{theme} theme doesn't support offline mode"
        Exception.__init__(self, message.format(theme=theme))
