// 화면 전환 함수들
const main = document.getElementById('main');
const login = document.getElementById('login');
const signup = document.getElementById('signup');

function showLogin() {
    main.classList.add('hidden');
    signup.classList.add('hidden');
    login.classList.remove('hidden');
}

function showSignup() {
    main.classList.add('hidden');
    login.classList.add('hidden');
    signup.classList.remove('hidden');
}

function showMain() {
    login.classList.add('hidden');
    signup.classList.add('hidden');
    main.classList.remove('hidden');
}

// 일반 모달 열기/닫기
function openModal() {
    document.getElementById('todoModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('todoModal').classList.add('hidden');
}

// 상세 모달 열기
function openDetailModal(id, content, completed_at) {
    document.getElementById('detail-id').value = id;
    document.getElementById('detail-content').value = content;

    if (completed_at.includes("-")) {
        const parts = completed_at.split("-");
        const formatted = `${parts[0]}.${parts[1]}.${parts[2]} 까지`;
        const dateInput = document.getElementById('detail-date');
        dateInput.type = "text";
        dateInput.value = formatted;
    }

    document.getElementById('detailModal').classList.remove('hidden');
}


function closeDetailModal() {
    document.getElementById('detailModal').classList.add('hidden');
}

function activateDatePicker(input) {
  // 현재 표시된 값 백업 (예: 2025.03.06 까지)
  const originalText = input.value;

  // 날짜 텍스트를 date 포맷으로 변환
  const formatted = originalText.replace(" 까지", "").replaceAll(".", "-");

  input.type = "date";
  input.value = formatted;
  input.showPicker();

  // onblur 시 다시 포맷 적용
  input.onblur = () => {
    if (input.value) {
      const parts = input.value.split("-");
      input.type = "text";
      input.value = `${parts[0]}.${parts[1]}.${parts[2]} 까지`;
    }
  };
}

// ✅ 초기 렌더링 시 날짜 포맷 적용
window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("detail-date");
  if (input.value && !input.value.includes("까지")) {
    const parts = input.value.split("-");
    input.value = `${parts[0]}.${parts[1]}.${parts[2]} 까지`;
  }
});




// 삭제 확인 모달 관련
let deleteTodoId = null;

function openDeleteModal(id) {
    deleteTodoId = id;
    document.getElementById("deleteConfirmModal").classList.remove("hidden");
}

function closeDeleteModal() {
    deleteTodoId = null;
    document.getElementById("deleteConfirmModal").classList.add("hidden");
}

document.getElementById("confirmDeleteButton").addEventListener("click", function () {
    if (deleteTodoId) {
        window.location.href = `/delete/${deleteTodoId}/`;
    }
});

    let decompleteTargetUrl = "";

    function confirmDecomplete(element) {
        const content = element.dataset.title;
        decompleteTargetUrl = element.dataset.url;

        document.getElementById('todo-title').innerText = content;
        document.getElementById('todo-title-again').innerText = content;

        document.getElementById('confirmDecompleteModal').classList.remove('hidden');
    }

    function closeDecompleteModal() {
        document.getElementById('confirmDecompleteModal').classList.add('hidden');
        decompleteTargetUrl = "";
    }

    document.getElementById('confirm-decomplete-yes').addEventListener('click', function () {
        if (decompleteTargetUrl) {
            window.location.href = decompleteTargetUrl;
        }
    });

    function openEditModal() {
        const id = document.getElementById("detail-id").value;
        const content = document.getElementById("detail-content").value;
        let rawDate = document.getElementById("detail-date").value;

        if (rawDate.includes('까지')) {
            rawDate = rawDate.replace('까지', '').trim();
        }
        if (rawDate.includes('.')) {
            rawDate = rawDate.replaceAll('.', '-').trim();
        }

        document.getElementById("edit-id").value = id;
        document.getElementById("edit-content").value = content;
        document.getElementById("edit-date").value = rawDate;

        document.getElementById("editModal").classList.remove("hidden");
    }
    
    function closeEditModal() {
        document.getElementById("editModal").classList.add("hidden");
    }