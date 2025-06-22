// 화면 요소 가져오기
const main = document.getElementById('main');
const login = document.getElementById('login');
const signup = document.getElementById('signup');

// 로그인 화면 보이기
function showLogin() {
    main.classList.add('hidden');
    signup.classList.add('hidden');
    login.classList.remove('hidden');
}

// 회원가입 화면 보이기
function showSignup() {
    main.classList.add('hidden');
    login.classList.add('hidden');
    signup.classList.remove('hidden');
}

// 메인 화면 보이기 (뒤로가기 버튼)
function showMain() {
    login.classList.add('hidden');
    signup.classList.add('hidden');
    main.classList.remove('hidden');
}
function openModal() {
    document.getElementById('todoModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('todoModal').classList.add('hidden');
}

function openDetailModal(id, content, completed_at) {
    document.getElementById('detail-id').value = id;
    document.getElementById('detail-content').value = content;
    document.getElementById('detail-date').value = completed_at;

    document.getElementById('detailModal').classList.remove('hidden');
}

function closeDetailModal() {
    document.getElementById('detailModal').classList.add('hidden');
}

function deleteTodo() {
    const id = document.getElementById('detail-id').value;
    if (confirm("정말 삭제하시겠습니까?")) {
        window.location.href = `/delete/${id}/`;  // 또는 {% url 'delete_todo' id %}와 같은 방식으로 서버 URL 지정
    }
}
