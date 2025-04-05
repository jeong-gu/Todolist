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
