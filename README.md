
# WebBuild

## Getting Started

#### Uses NextAuth fo authentication

### Deploying Locally

#### 1. Clone the Repository

```bash
git clone repo_link
cd dir*
```

#### 2. Creaate a .env file

```bash
NEXT_PUBLIC_URL=http://localhost:3000/  # be careful with the format on how the production ip or domain name with "/"'s
NEXT_PUBLIC_DOMAIN=localhost:3000
NEXT_PUBLIC_SCHEME=http://
NEXT_PUBLIC_HOME_URL= # home page url 

CRON_SECRET=  # secret for cron job

GCS_BUCKET_NAME= # bucket_name
GCS_FILE_NAME=gcs-key.json

DATABASE_URL=
NEXT_PUBLIC_BUILDER_API_KEY= # go to builder.io for more info

NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=

AUTH_SECRET=
NEXTAUTH_SECRET=
AUTH_URL=http://localhost:3000 # has to be changed during deployment
AUTH_TRUST_HOST=true

NEXT_PUBLIC_MONTHLY_PRICE="59.99"
NEXT_PUBLIC_YEARLY_PRICE="599.88"
NEXT_PUBLIC_PAYPAL_ENV="Sandbox" # "Sandbox" or "Production"


```
#### 3. Also place your gcs-key.json file in the root if using GCP.

#### 4. 
```bash
npm install
npm run dev
```

#### 5. Check errors for production
```bash 
npm run build
```

#### 6.  ``` npm run start ```

### Deploying in Production

### Configure nginx : 

#### 1. Install nginx
```bash
sudo apt update
sudo apt install nginx -y
```

#### 2. 
```bash
sudo nano /etc/nginx/sites-available/krsyonix
```

#### 3.
```bash
server {
  listen 80;
  server_name yourdomain.com; # add the domain name or the ip address if not applicable.

  location / {
    proxy_pass http://localhost:3000; # since the app is running on 3000
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

#### 4.
```bash
sudo ln -s /etc/nginx/sites-available/krsyonix /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Same steps as development till step 5 ( skip ```npm run dev``` )

### Make sure you change the localhost to the actual domain name

```bash
npm i -g pm2
pm2 start "npm run start" --name krysonix
pm2 save
pm2 logs # check the logs
```

### To make sure the schedular is running (to delete the subscription when it is expired)
#### Go to /src/app/api/schedular/route.ts for more info...
```bash
curl http://__ip_of_this_app_or_domainName__/api/schedular?secret=CRON_SECRET #in .env
```