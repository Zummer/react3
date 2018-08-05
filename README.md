поскольку это учебка, то:

1. установить nvm на локалку,
2. cd client -> npm install
3. cd server -> npm install
4. запустить docker-compose up -d

это поднимет контейнеры
в т.ч. создаст именованный том react3_mysql_data
и базу mysql с именем react3

6. docker-compose run --rm server knex migrate:latest

опционально npm i -g knex

todo: npm install в Dockerfile прописать