from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser
from .models import Post, Like, Comment, Save

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email', 'is_staff', 'is_active']
    list_filter = ['is_staff', 'is_active']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Post)
admin.site.register(Like)
admin.site.register(Comment)
admin.site.register(Save)