from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from firebase_admin import auth, exceptions
import json
from django.db import transaction
from django.contrib.auth import get_user_model
from .models import Post, Like, Comment, Share, Save
from django.views.decorators.csrf import csrf_exempt

User = get_user_model()

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            with transaction.atomic():
                data = json.loads(request.body)
                email = data.get('email')

                # Create a new user in Firebase
                user = auth.create_user(
                    email=email,
                )

                print(f"User created with UID: {user.uid}")

            return JsonResponse({"status": "success", "uid": user.uid})
        except exceptions.FirebaseError as e:
            if 'email-already-exists' in str(e):
                return JsonResponse({'error': 'This email is already registered. Please log in or use another email.'}, status=400)
            return JsonResponse({'error': 'Firebase authentication error.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': 'Unexpected error occurred. Please try again.'}, status=500)

@csrf_exempt
def complete_signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            user = auth.get_user_by_email(email)

            # Here you would verify the password and complete user setup
            # (e.g., saving password or other data)

            return JsonResponse({"status": "success", "message": "Signup completed."})
        except Exception as e:
            return JsonResponse({'error': 'Error completing signup.'}, status=500)