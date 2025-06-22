from datetime import datetime
from django.shortcuts import render, redirect,get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Todo
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from django.utils.timezone import now

# 처음 화면
def index(request):
    return render(request, 'index.html')

# 로그인 처리
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('main')
        else:
            messages.error(request, '아이디 또는 비밀번호가 올바르지 않습니다.')
    return redirect('index')

# 회원가입 처리
def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        if password1 != password2:
            messages.error(request, '비밀번호가 일치하지 않습니다.')
            return redirect('index')

        if User.objects.filter(username=username).exists():
            messages.error(request, '이미 존재하는 사용자입니다.')
            return redirect('index')

        User.objects.create_user(username=username, password=password1)
        messages.success(request, '회원가입 성공! 로그인 해주세요.')
        return redirect('index')
    return redirect('index')

# 로그아웃
def logout_view(request):
    logout(request)
    return redirect('index')

# 메인 화면: 할 일 목록 보기 + 할 일 추가 처리
@login_required
def main_view(request):
    if request.method == "POST":
        # 사용자가 새 할 일을 추가한 경우
        content = request.POST.get('content')
        completed_at_raw = request.POST.get('completed_at')
        if content:
            completed_at = datetime.strptime(completed_at_raw, '%Y-%m-%d').date()
            
            Todo.objects.create(
                user=request.user,
                content=content,
                created_at=timezone.now(),
                completed_at=completed_at
            )
            return redirect('main')  # 추가 후 새로고침

    # 할 일 데이터 불러오기
    todos = Todo.objects.filter(user=request.user, completed=False,completed_at__gte=now().date()).order_by('-created_at')
    overdue_todos=Todo.objects.filter(user=request.user,completed=False,completed_at__lt=now().date()).order_by('-created_at')
    completed_todos = Todo.objects.filter(user=request.user, completed=True).order_by('-created_at')

    return render(request, 'main.html', {
        'todos': todos,
        'overdue_todos':overdue_todos,
        'completed_todos': completed_todos,
    })

# 특정 할 일을 삭제하는 함수
@login_required
def delete_todo(request, todo_id):
    todo = get_object_or_404(Todo, id=todo_id, user=request.user)
    todo.delete()
    return redirect('main')

@login_required
def update_todo(request):
    if request.method == 'POST':
        todo_id = request.POST.get('id')
        content = request.POST.get('content')
        completed_at = request.POST.get('completed_at')

        todo = get_object_or_404(Todo, id=todo_id,user=request.user)
        todo.content = content
        todo.completed_at = completed_at
        todo.save()

    return redirect('main')

# 할 일 완료 처리 함수
@login_required
def complete_todo(request, todo_id):
    todo = get_object_or_404(Todo, id=todo_id, user=request.user)
    todo.completed = True
    todo.save()
    return redirect('main')