## Recommend Using Python 3.9


## **Step 2: Create and activate a virtual environment**

```
sh

python3 -m venv venv
source venv/bin/activate
```

## **Step 3: Install dependencies**

```
sh

pip install -r requirements.txt
```


## **Step 4: Set up your PostgreSQL environment (If not installed please see https://www.postgresql.org/ for more info)**
Use the latest .DUMP file in /database/backup
```
sh
pg_restore -U {username} -d {password} latest_backup_with_user.DUMP --no-owner --no-privileges
```
## **Step 4.1: Set up your RabbitMQ environment (If not installed please see https://www.rabbitmq.com for more info)**
### Create admin user
```
sh
rabbitmqctl add_user {username} {password}
rabbitmqctl set_user_tags {username} administrator
rabbitmqctl set_permissions -p / {username} ".*" ".*" ".*"
```
### Access the web UI panel
```
Login http://localhost:15672 using your created username and password
```

## **Step 5: Apply migrations**
```
sh

python manage.py migrate
```

## **Step 6: Create superuser**
####    Optional, default logins provided in (LOGINS.txt) if restored DB using latest_backup_with_user.DUMP
```
sh

python manage.py createsuperuser
```

## **Step 7: Run the development servers**
```
sh

python manage.py runserver {local ip}:8003
```

Run the consumers in separate terminals.

```
sh

python ./base/consumers/masterconsumer1.py
```

```
sh

python ./base/consumers/sock.py
```

