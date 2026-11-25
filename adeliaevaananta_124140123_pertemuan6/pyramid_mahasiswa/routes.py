def includeme(config):
    """Mendaftarkan seluruh rute routing aplikasi ke konfigurasi Pyramid"""

    # Route default web home
    config.add_route('home', '/')

    # RESTful API Mahasiswa Routes
    # Parameter request_method krusial untuk membedakan HTTP Method pada URL path yang sama
    config.add_route('mahasiswa_list', '/api/mahasiswa', request_method='GET')
    config.add_route('mahasiswa_detail', '/api/mahasiswa/{id:\\d+}', request_method='GET')
    config.add_route('mahasiswa_add', '/api/mahasiswa', request_method='POST')
    config.add_route('mahasiswa_update', '/api/mahasiswa/{id:\\d+}', request_method='PUT')
    config.add_route('mahasiswa_delete', '/api/mahasiswa/{id:\\d+}', request_method='DELETE')

    # RESTful API Matakuliah Routes (TUGAS)
    config.add_route('matakuliah_list', '/api/matakuliah', request_method='GET')
    config.add_route('matakuliah_detail', '/api/matakuliah/{id:\\d+}', request_method='GET')
    config.add_route('matakuliah_add', '/api/matakuliah', request_method='POST')
    config.add_route('matakuliah_update', '/api/matakuliah/{id:\\d+}', request_method='PUT')
    config.add_route('matakuliah_delete', '/api/matakuliah/{id:\\d+}', request_method='DELETE')
