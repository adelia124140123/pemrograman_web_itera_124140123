import os
from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.md'), encoding='utf-8') as f:
    README = f.read()

requires = [
    'alembic',
    'plaster_pastedeploy',
    'pyramid',
    'pyramid_debugtoolbar',
    'pyramid_retry',
    'pyramid_tm',
    'SQLAlchemy',
    'transaction',
    'waitress',
    'zope.sqlalchemy',
]

tests_require = [
    'WebTest',
    'pytest',
    'pytest-cov',
]

setup(
    name='pyramid_mahasiswa',
    version='0.0',
    description='RESTful API Mahasiswa & Matakuliah (Pyramid + PostgreSQL)',
    long_description=README,
    long_description_content_type='text/markdown',
    classifiers=[
        'Programming Language :: Python',
        'Framework :: Pyramid',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: WSGI :: Application',
    ],
    author='',
    author_email='',
    url='',
    keywords='web pyramid pylons',
    packages=find_packages(exclude=['tests']),
    include_package_data=True,
    zip_safe=False,
    extras_require={
        'testing': tests_require,
    },
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
            'main = pyramid_mahasiswa:main',
        ],
        'console_scripts': [
            'initialize_pyramid_mahasiswa_db = pyramid_mahasiswa.scripts.initialize_db:main',
        ],
    },
)
