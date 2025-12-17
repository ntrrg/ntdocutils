# Copyright 2017 Miguel Angel Rivera Notararigo. All rights reserved.
# This source code was released under the MIT license.

from setuptools import setup, find_packages
from os import path

from ntdocutils import __version__, DESCRIPTION

basedir = path.abspath(path.dirname(__file__))

with open(path.join(basedir, 'README.md')) as readme:
    long_description = readme.read()

setup(
    name='ntDocutils',
    version=__version__,
    description=DESCRIPTION,
    long_description=long_description,
    long_description_content_type='text/markdown',
    url='https://ntrrg.dev/en/projects/ntdocutils',
    author='Miguel Angel Rivera Notararigo',
    author_email='ntrrgx@gmail.com',
    license='MIT',
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Environment :: Console',
        'Intended Audience :: End Users/Desktop',
        'Intended Audience :: Other Audience',
        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'Intended Audience :: System Administrators',
        'Topic :: Documentation',
        'Topic :: Software Development :: Documentation',
        'Topic :: Text Processing',
        'Programming Language :: Python :: 3',
    ],
    keywords=
    'docutils restructuredtext docutils-theme-manager docutils-themes documentation',
    packages=find_packages(),
    install_requires=['docutils==0.22.3', 'Pygments==2.19.2'],
    include_package_data=True,
    entry_points={
        'console_scripts': [
            'ntdocutils = ntdocutils.cmdline:main',
        ]
    })
