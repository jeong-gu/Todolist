from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # 기본 화면
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    path('main/', views.main_view, name='main'),
    path('complete/<int:todo_id>/', views.complete_todo, name='complete_todo'),  # 완료
    path('decomplete/<int:todo_id>/',views.decomplete_todo,name='decomplete_todo'),
    path('delete/<int:todo_id>/', views.delete_todo, name='delete_todo'),  # 삭제
    path('update/', views.update_todo, name='update_todo'),
]
