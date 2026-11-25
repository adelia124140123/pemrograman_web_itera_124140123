from pyramid.view import view_config


@view_config(route_name='home', renderer='json')
def home(request):
    """Halaman utama API: ringkasan endpoint yang tersedia"""
    return {
        'message': 'RESTful API Mahasiswa & Matakuliah (Pyramid)',
        'endpoints': {
            'mahasiswa': '/api/mahasiswa',
            'matakuliah': '/api/matakuliah',
        },
    }
