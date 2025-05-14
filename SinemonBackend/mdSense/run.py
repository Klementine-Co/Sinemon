import os
import django
import sys

sys.path.append("path/to/project/")
os.environ["DJANGO_SETTINGS_MODULE"] = "mdSense.settings"
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
django.setup()
from django.conf import settings

ipaddr = settings.ALLOWED_HOSTS[0]

# ipaddr_file = open('path/to/SinemonProvider/constants/ipaddress.ts', 'w')
# ipaddr_file2 = open('Cath/to/SinemonUser//constants/ipaddress.ts', 'w')

# ipaddr_file.write('export const IPADDR = "{}";'.format(ipaddr))
# ipaddr_file.close()
# ipaddr_file2.write('export const IPADDR = "{}";'.format(ipaddr))
# ipaddr_file2.close()

# On windows
os.system('cmd /k "py manage.py runserver {}:8003"'.format(ipaddr))
os.system('cmd /k "cd ./base/consumers && py sock.py"')
os.system('cmd /k "cd ./base/consumers && py masterconsumer1.py"')
