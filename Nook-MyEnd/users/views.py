from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from firebase_admin import auth, exceptions
from .middleware import firebase_token_required
import json
from django.db import transaction
from django.contrib.auth import get_user_model
from .models import Post, Like, Comment, Share, Save

from django.views.decorators.csrf import csrf_exempt   # probably remember to remove this

User = get_user_model()

@firebase_token_required  #ignore rn
def some_secure_view(request):
    return JsonResponse({'message': 'You are authenticated!'})

@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            
            # Authenticate user with Firebase
            user = auth.get_user_by_email(email)
            
            # Verify password using your chosen method (custom or Firebase)
            # If authentication is successful
            return JsonResponse({"status": "success", "uid": user.uid})
        except exceptions.FirebaseError as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)
        except Exception as e:
            return JsonResponse({"status": "error", "message": "Invalid login credentials."}, status=400)
        
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            with transaction.atomic():
                data = json.loads(request.body)
                email = data.get('email')
                password = data.get('password')

                print(f"Received signup request with email: {email}")  # Debugging line

                # Create a new user in Firebase
                user = auth.create_user(
                    email=email,
                    password=password
                )

                print(f"User created with UID: {user.uid}")  # Debugging line

            return JsonResponse({"status": "success", "uid": user.uid})
        except exceptions.FirebaseError as e:
            print(f"Firebase AuthError: {str(e)}")  # Debugging line
            return JsonResponse({'error': 'Firebase authentication error.'}, status=400)
        except Exception as e:
            print(f"Unexpected error during signup: {str(e)}")  # Debugging line
            return JsonResponse({'error': str(e)}, status=500)

User = get_user_model()

@csrf_exempt
def get_users(request):
    if request.method == 'GET':
        try:
            users = User.objects.values('email')  # Get only the email field
            print(users)  # Debugging line to print users to console
            return JsonResponse(list(users), safe=False, status=200)
        except Exception as e:
            print(f"Error: {e}")  # Debugging line to print any errors
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
    
@csrf_exempt
def like_post(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            post_id = data.get('post_id')
            user_id = data.get('user_id')

            user = get_object_or_404(User, id=user_id)
            post = get_object_or_404(Post, id=post_id)

            Like.objects.create(user=user, post=post)

            return JsonResponse({'status': 'success', 'message': 'Post liked successfully!'}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
def comment_post(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            post_id = data.get('post_id')
            user_id = data.get('user_id')
            content = data.get('content')

            user = get_object_or_404(User, id=user_id)
            post = get_object_or_404(Post, id=post_id)

            Comment.objects.create(user=user, post=post, content=content)

            return JsonResponse({'status': 'success', 'message': 'Comment added successfully!'}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
def share_post(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            post_id = data.get('post_id')
            user_id = data.get('user_id')

            user = get_object_or_404(User, id=user_id)
            post = get_object_or_404(Post, id=post_id)

            Share.objects.create(user=user, post=post)

            return JsonResponse({'status': 'success', 'message': 'Post shared successfully!'}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
def save_post(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            post_id = data.get('post_id')
            user_id = data.get('user_id')

            user = get_object_or_404(User, id=user_id)
            post = get_object_or_404(Post, id=post_id)

            Save.objects.create(user=user, post=post)

            return JsonResponse({'status': 'success', 'message': 'Post saved successfully!'}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
        
@csrf_exempt
def create_post(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            title = data.get('title')
            content = data.get('content')
            user_id = data.get('user_id')

            # Get the user creating the post
            user = get_object_or_404(User, id=user_id)

            # Create a new post
            post = Post.objects.create(title=title, content=content, author=user)

            return JsonResponse({'status': 'success', 'message': 'Post created successfully!', 'post_id': post.id}, status=201)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'}, status=405)