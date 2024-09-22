from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView  

from users import views 
from users.views import like_post, comment_post, share_post


urlpatterns = [

    path('admin/', admin.site.urls),
    path('users/', views.get_users, name='get_users'),
    path('like/', like_post, name='like_post'),
    path('comment/', comment_post, name='comment_post'),
    path('share/', share_post, name='share_post'),
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
]