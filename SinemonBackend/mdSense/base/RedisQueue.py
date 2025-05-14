import json
import gzip


# {
#     "m_status": "L"
#     , "p_status": "L"
#     , "est_wait_time": 1
#     , "join_date": "2022-07-02T15:58:58.925113-05:00"
#     , "leave_date": "2022-07-02T15:58:58.916172-05:00"
#     , "prov": "1542"
#     , "member": "1768"
#     , "position": 0
# }


# from datetime import date

# year_month_day_format = '%Y%m%d'

# dt = date.today().strftime(year_month_day_format)
# id = str(uid + pid)
# id = id.rjust(10, '0')
# id = dt+id

# TODOD PIPELINING


class RedisQueue:

    redis_connection = None

    def __init__(self, conn):

        self.redis_connection = conn

    def setQueued(self, id, queues):
        queueitem = gzip.compress(json.dumps(queues).encode("utf-8"))
        self.redis_connection.hset(id, "queue", queueitem)

    def getQueued(self, id):
        return json.loads(gzip.decompress(self.redis_connection.hget(id, "queue")))
