from alembic import context
from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy import engine_from_config, pool

# Import package models agar seluruh tabel ter-register di Base.metadata
from pyramid_mahasiswa import models  # noqa: F401
from pyramid_mahasiswa.models.meta import Base

config = context.config

# Konfigurasi logging dari file .ini (development.ini)
setup_logging(config.config_file_name)

# Membaca sqlalchemy.url dari section [app:main] di file .ini
settings = get_appsettings(config.config_file_name)
target_metadata = Base.metadata


def run_migrations_offline():
    """Mode offline: menghasilkan SQL tanpa koneksi database."""
    context.configure(
        url=settings['sqlalchemy.url'],
        target_metadata=target_metadata,
        literal_binds=True,
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Mode online: menjalankan migrasi langsung ke database."""
    engine = engine_from_config(
        settings, prefix='sqlalchemy.', poolclass=pool.NullPool)

    with engine.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
