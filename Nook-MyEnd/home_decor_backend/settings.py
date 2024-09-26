import os
import pymysql
pymysql.install_as_MySQLdb()
import firebase_admin
from firebase_admin import credentials
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Path to frontend folder
FRONTEND_DIR = BASE_DIR / 'home-decor-frontend'

# This is dynamically handling the location of the service key.
cred_path = Path(BASE_DIR) / 'home_decor_backend' / 'serviceKey' / 'nook-aa562-firebase-adminsdk-jbp1r-2b9c16de71.json'
print(f"Looking for service account key at: {cred_path}")  # Debugging line
cred = credentials.Certificate(str(cred_path))
firebase_admin.initialize_app(cred)

# Quick-start development settings - unsuitable for production
SECRET_KEY = 'django-insecure-4ew9z7a7t!q0-oqy-j!$ct@m0sq(sy5)!9jay2191qs_et$c*e'

# Turn on debugging for development
DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
]

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'users',
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'home_decor_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'home-decor-frontend' / 'dist'], 
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'home_decor_backend.wsgi.application'

# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'nookdb',
        'USER': 'root',
        'PASSWORD': 'rostovks94',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}

AUTH_USER_MODEL = 'users.CustomUser'

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# Добавим это в settings.py
STATIC_URL = '/assets/'
STATICFILES_DIRS = [
    BASE_DIR / 'home-decor-frontend' / 'dist' / 'assets',

]

STATIC_ROOT = BASE_DIR / 'staticfiles' 