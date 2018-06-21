# NtDocutils https://nt.web.ve/en/projects/ntdocutils
# Copyright (c) 2017 Miguel Angel Rivera Notararigo

from setuptools import setup, find_packages
from os import path

from ntdocutils import __version__, DESCRIPTION

basedir = path.abspath(path.dirname(__file__))

with open(path.join(basedir, "README.md")) as readme:
    long_description = readme.read()

setup(
    name="NtDocutils",
    version=__version__,
    description=DESCRIPTION,
    long_description=long_description,
    url="https://nt.web.ve/en/projects/ntdocutils",
    author="Miguel Angel Rivera Notararigo",
    author_email="ntrrgx@gmail.com",
    license="MIT",

    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Environment :: Console",
        "Intended Audience :: End Users/Desktop",
        "Intended Audience :: Other Audience",
        "Intended Audience :: Developers",
        "Intended Audience :: Science/Research",
        "Intended Audience :: System Administrators",
        "License :: OSI Approved :: MIT License",
        "Topic :: Documentation",
        "Topic :: Software Development :: Documentation",
        "Topic :: Text Processing",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.4",
        "Programming Language :: Python :: 3.5",
        "Programming Language :: Python :: 3.6"
    ],

    keywords="docutils restructuredtext docutils-theme-manager docutils-themes documentation",
    packages=find_packages(),
    install_requires=["docutils==0.14", "Pygments==2.2.0"],
    include_package_data=True,

    entry_points={
        "console_scripts": [
            "ntdocutils = ntdocutils.cmdline:main",
        ]
    }
)
