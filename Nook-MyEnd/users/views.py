from django.http import JsonResponse
from .models import Post, Like, Comment, Share
from django.views.decorators.csrf import csrf_exempt
from firebase_admin import auth
from django.shortcuts import get_object_or_404
from users.models import CustomUser

@csrf_exempt
def like_post(request, post_id):
    if request.method == 'POST':
        try:
            user_token = request.headers.get('Authorization')
            decoded_token = auth.verify_id_token(user_token)
            user_uid = decoded_token['uid']

            post = get_object_or_404(Post, id=post_id)
            user = CustomUser.objects.get(uid=user_uid)

            if Like.objects.filter(post=post, user=user).exists():
                return JsonResponse({'error': 'You have already liked this post.'}, status=400)

            Like.objects.create(post=post, user=user)

            return JsonResponse({'status': 'success', 'message': 'Post liked successfully.'})
        except auth.InvalidIdTokenError:
            return JsonResponse({'error': 'Invalid token.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)


@csrf_exempt
def comment_post(request, post_id):
    if request.method == 'POST':
        try:
            user_token = request.headers.get('Authorization')
            decoded_token = auth.verify_id_token(user_token)
            user_uid = decoded_token['uid']

            post = get_object_or_404(Post, id=post_id)
            user = CustomUser.objects.get(uid=user_uid)

            content = request.POST.get('content')
            if not content:
                return JsonResponse({'error': 'No content provided.'}, status=400)

            Comment.objects.create(post=post, user=user, content=content)

            return JsonResponse({'status': 'success', 'message': 'Comment added successfully.'})
        except auth.InvalidIdTokenError:
            return JsonResponse({'error': 'Invalid token.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)


@csrf_exempt
def share_post(request, post_id):
    if request.method == 'POST':
        try:
            user_token = request.headers.get('Authorization')
            decoded_token = auth.verify_id_token(user_token)
            user_uid = decoded_token['uid']

            post = get_object_or_404(Post, id=post_id)
            user = CustomUser.objects.get(uid=user_uid)

            if Share.objects.filter(post=post, user=user).exists():
                return JsonResponse({'error': 'You have already shared this post.'}, status=400)

            Share.objects.create(post=post, user=user)

            return JsonResponse({'status': 'success', 'message': 'Post shared successfully.'})
        except auth.InvalidIdTokenError:
            return JsonResponse({'error': 'Invalid token.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)

def get_users(request):
    users = CustomUser.objects.all().values('id', 'username', 'email')
    return JsonResponse(list(users), safe=False)