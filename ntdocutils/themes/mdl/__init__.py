# NtDocutils https://ntrrg.github.io/NtDocutils/
# Copyright (c) 2017 Miguel Angel Rivera Notararigo

"""MDL theme."""

__docformat__ = "reStructuredText"

from os import path
import shutil

from ntdocutils.writer import Writer as NtDocutilsWriter


class Writer(NtDocutilsWriter):
    """Creates a MDL theme writer."""

    theme_path = path.dirname(path.abspath(__file__))
    theme = path.basename(theme_path)

    def __init__(self, server):
        if not server:
            server = "https://cdn.rawgit.com/ntrrg/NtDocutils/v0.2.0/" \
                     "ntdocutils/themes/mdl"

        NtDocutilsWriter.__init__(self, server)

        self.docutils_argv["template"] = path.join(
            self.theme_path,
            "template.html"
        )

        if self.server != "local":
            customize = path.join(self.theme_path, "css/customize.css")

        else:
            customize = path.join(
                self.theme_path,
                "css/customize-offline.css"
            )

        self.docutils_argv["stylesheet"] = "{},{}".format(
            path.join(self.theme_path, "css/material.min.css"),
            customize
        )

    def assets(self):
        assets = {}

        # Templates for assets
        stylesheet = "<link rel='stylesheet' href='{}' />"
        script = "<script type='text/javascript' src='{}'></script>"

        if self.server != "local":
            server = self.server

            material_icons = "https://fonts.googleapis.com/icon?family=" \
                             "Material+Icons"

            material_js = "https://code.getmdl.io/1.3.0/material.min.js"

        else:
            server = self.theme

            material_icons = "{server}/css/material-icons.css"
            material_js = "{server}/js/material.min.js"

        assets["before_styles"] = stylesheet.format(
            material_icons
        ).format(server=server)

        assets["after_styles"] = (stylesheet * 6).format(
            "{server}/css/minimal.css",
            "{server}/css/plain.css",
            "{server}/css/ntdocutils.min.css",
            "{server}/css/paraiso-light.min.css",
            "{server}/css/paraiso-dark.min.css",
            "{server}/css/print.min.css"
        ).format(server=server)

        assets["scripts"] = (script * 2).format(
            material_js,
            "{server}/js/ntdocutils.min.js"
        ).format(server=server)

        return assets

    def offline_mode(self, destination):
        dest_dir = path.join(
            path.dirname(path.abspath(destination)),
            self.theme
        )

        css_dest_dir = path.join(dest_dir, "css")
        js_dest_dir = path.join(dest_dir, "js")

        # Delete theme folder if exists
        shutil.rmtree(dest_dir, ignore_errors=True)

        # Copy assets in ``destination`` parent folder
        shutil.copytree(path.join(self.theme_path, "css"), css_dest_dir)
        shutil.copytree(path.join(self.theme_path, "js"), js_dest_dir)
