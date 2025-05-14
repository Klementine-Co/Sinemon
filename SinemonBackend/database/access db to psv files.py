import os


from access_parser import AccessParser
import numpy as np
import csv
import re
import time
from tabulate import tabulate

arr = np.array([])
db = None
directory = ".\\files\\"
csvfiles = ".\\csvfiles\\"
i = 10
file = None
dontusefiles1 = ["msys", "f_c3", "scho", "stat", "surv", "f_74", "coun", "spec"]
dontusefiles = ["stat", "coun"]

filename = "MBCPhysicianAndSurgeonInformation-PUBLIC.accdb"


for filename in os.listdir(directory):
    f = os.path.join(directory, filename)
    if os.path.isfile(f):

        db = AccessParser(f)

        date = time.strftime("%d-%b-%Y", time.gmtime(os.path.getmtime(file)))
        for k in db.catalog.keys():

            if str(k)[0:4].lower() in dontusefiles:
                with open(
                    csvfiles + str(k) + "_" + str(date) + ".psv",
                    "a+",
                    encoding="utf-8",
                    newline="",
                ) as file:
                    table = db.parse_table(k)
                    data = tabulate(
                        db.parse_table(k), headers="keys", tablefmt="youtrack"
                    )
                    data = data.strip().replace("|\n|", "@#@")
                    data = data.strip().replace("\r\n", " ")
                    data = data.strip().replace("\n", " ")
                    data = data.strip().replace("\r", "")
                    data = data.strip().replace("@#@", "|\n|")
                    file.write(data)

        i += 1


import os
import re
from pathlib import Path
import numpy as np
import csv
import struct
from datetime import datetime, timedelta
import math

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


def iscolumn(x, y):
    for i in y:
        if i.strip().lower() == x.strip().lower():
            return True
        else:
            continue

    return False


directory = ".\\csvfiles"
filedict = {}
numCols = 0
insertIn = ""
columns_position = {}
unfixed = ["license"]
for filename in os.listdir(directory):
    f = os.path.join(directory, filename)

    if os.path.isfile(f) and f.endswith(".psv"):
        with open(f, "r", encoding="utf-8", newline="") as file_pipe:

            if (
                filedict.get(
                    re.sub(r"\d+\Z", "", os.path.basename(file_pipe.name)[:-4]).lower()
                )
                == None
            ):
                filedict.update(
                    {
                        re.sub(
                            r"\d+\Z", "", os.path.basename(file_pipe.name)[:-4]
                        ).lower(): 1
                    }
                )
                numCols = 0
                table = list()
                cols = list()

                string = (
                    "drop table if exists public."
                    + re.sub(r"\d+\Z", "", os.path.basename(file_pipe.name)[:-4])
                    .lower()
                    .replace(" ", "_")
                    + ";\n"
                )
                string += (
                    "create table public."
                    + re.sub(r"\d+\Z", "", os.path.basename(file_pipe.name)[:-4])
                    .lower()
                    .replace(" ", "_")
                    + " (\n"
                )

            output = open(
                ".\\output\\"
                + re.sub(r"\d+\Z", "", os.path.basename(file_pipe.name)[:-4])
                .lower()
                .replace(" ", "_")
                + ".sql",
                "a+",
                encoding="utf-8",
            )

            filtered = (line.split("|") for line in file_pipe)
            reader_pipe = csv.reader(file_pipe, delimiter="|", lineterminator="|\r\n")

            for row in reader_pipe:

                if (
                    filedict.get(
                        re.sub(
                            r"\d+\Z", "", os.path.basename(file_pipe.name)[:-4]
                        ).lower()
                    )
                    == 1
                ):
                    for ind, n in enumerate([i for i in row if i]):

                        if n:
                            if (
                                n.lower().__contains__("date")
                                or n.lower().__contains__("entered")
                                or n.lower().__contains__("asof")
                            ):
                                columns_position.update({ind: "date"})
                                string += (
                                    n.strip().lower().replace(" ", "_")
                                    + " timestamp with time zone, \n"
                                )
                                table.append(np.array([]))
                                cols.append(n.strip().lower().replace(" ", "_"))
                            else:
                                columns_position.update({ind: "text"})
                                string += (
                                    n.strip().lower().replace(" ", "_") + " text, \n"
                                )
                                table.append(np.array([]))
                                cols.append(n.strip().lower().replace(" ", "_"))

                    string = string[:-3] + " \n);"

                    numCols = len([x.strip() for x in row if x])

                    output.write(string)
                    filedict.update(
                        {
                            re.sub(
                                r"\d+\Z", "", os.path.basename(file_pipe.name)[:-4]
                            ).lower(): 2
                        }
                    )

                else:
                    insert = (
                        "\ninsert into public."
                        + re.sub(r"\d+\Z", "", os.path.basename(file_pipe.name)[:-4])
                        .lower()
                        .replace(" ", "_")
                        + " (\n"
                    )

                    for x in cols:
                        insert += str(x).lower() + ", "
                    insert = insert[:-2] + " )\n VALUES ( \n"

                    insertIn = ""

                    for ind, n in enumerate([i for i in row if i]):

                        if n.strip() == "NA" or n.strip() == "N/A" or n.strip() == "":
                            n = "NULL"

                        if (
                            iscolumn(n, cols) == False
                            or n.strip() == ""
                            or n is None
                            or n == "NULL"
                        ):

                            if (
                                n.strip()[1:].isnumeric() or n.strip().isnumeric()
                            ) and columns_position.get(ind) == "date":

                                value = mdb_date_to_readable(int(n.strip()))
                                if value != "NULL":
                                    insertIn += "'" + (value + "'") + ", "
                                else:
                                    insertIn += value.strip('"') + ", "
                            elif (
                                n.strip() == ""
                                or n.strip() == "NULL"
                                or n is None
                                or n.strip() == "NA"
                            ):

                                insertIn += "NULL".strip('"') + ", "
                            else:
                                insertIn += (
                                    "'" + (n.strip().replace("'", '"') + "'") + ", "
                                )

                    insertIn = insertIn[:-2] + " ),"

                    insertIn = insertIn[:-1] + ";\n"

                    if insertIn != " );\n":
                        output.write(insert)
                        output.write(insertIn)
            output.close()

string = "BEGIN;\nSET CLIENT_ENCODING TO 'utf8';\n"
directory = ".\\output"
for filename in os.listdir(directory):
    f = os.path.join(directory, filename)
    print(filename)
    if os.path.isfile(f) and f.endswith(".sql"):
        string += "\\i " + str(filename) + "\n"
string += "COMMIT;"
print(string)
with open(".\\output\\master.sql", "w", encoding="utf-8", newline="") as file_pipe_out:
    file_pipe_out.write(string)
