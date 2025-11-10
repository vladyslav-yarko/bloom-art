import phonenumbers


def check_decimal_number(value):
    str_decimal = str(value)
    if '.' in str_decimal:
        decimal_part = str_decimal.split('.')[1]
        if len(decimal_part) != 1:
            raise ValueError("Number must contain only one digit after point")
    else:
        raise ValueError("Not decimal number")
    return value


def check_phone_number(value):
    try:
        parsed = phonenumbers.parse(value, None)
        if not phonenumbers.is_valid_number(parsed):
            raise ValueError('Invalid data sent')
    except Exception:
        raise ValueError('Invalid data sent')
    return value
