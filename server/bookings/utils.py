import random, string
def generate_pnr(n=6):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=n))
