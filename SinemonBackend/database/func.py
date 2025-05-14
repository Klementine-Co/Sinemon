from datetime import datetime, timedelta
import struct


nn = "3617850876367142655"
n = int(nn)


ACCESS_EPOCH = datetime(1899, 12, 30)


# https://stackoverflow.com/questions/45560782
def mdb_date_to_readable(double_time):
    if len(str(double_time)) > 19:
        print("wtf")
    if (
        double_time >= 4689999999999999999 or double_time <= 4663952403165347840
    ):  # 1918-01-01 and 2897-01-20
        return "NULL"

    dtime_bytes = struct.pack("Q", double_time)
    dtime_double = struct.unpack("<d", dtime_bytes)[0]
    dtime_frac, dtime_whole = math.modf(dtime_double)

    dtime = ACCESS_EPOCH + timedelta(days=dtime_whole) + timedelta(days=dtime_frac)
    if dtime == ACCESS_EPOCH:
        return "(Empty Date)"
    return str(dtime)


print(mdb_date_to_readable(n))
