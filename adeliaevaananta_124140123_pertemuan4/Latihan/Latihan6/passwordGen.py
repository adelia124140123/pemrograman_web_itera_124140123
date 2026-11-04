import random
import string


def buat_password_acak(panjang=8):
    """Menghasilkan password acak dari huruf dan angka dengan panjang tertentu."""
    karakter = string.ascii_letters + string.digits
    return "".join(random.choice(karakter) for _ in range(panjang))
