# NtDocutils https://ntrrg.github.io/NtDocutils/
# Copyright (c) 2017 Miguel Angel Rivera Notararigo
# Licensed under The MIT License. See LICENSE file for full licensing details.

"""NtDocutils exceptions.

Provides:

* :py:`class OfflineUnsupported`: theme doesn't support offline mode.
"""


class OfflineUnsupported(Exception):
    """Create an exception to raise when theme doesn't support offline mode."""

    def __init__(self, theme):
        message = "{theme} theme doesn't support offline mode"
        Exception.__init__(self, message.format(theme=theme))
