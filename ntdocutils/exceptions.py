# Copyright 2017 Miguel Angel Rivera Notararigo. All rights reserved.
# This source code was released under the MIT license.
"""
ntDocutils exceptions.

Provides:

- ``OfflineUnsupported``: theme doesn't support offline mode.
"""


class OfflineUnsupported(Exception):
    """
    Creates an exception to raise when theme doesn't support offline mode.
    """

    def __init__(self, theme: str):
        """
        ``theme`` (string)
          Theme name.

        Examples
        ========

        .. code:: python

            raise OfflineUnsupported('mdl')
        """
        message = "{theme} theme doesn't support offline mode"
        Exception.__init__(self, message.format(theme=theme))
