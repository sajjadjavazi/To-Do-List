document.querySelector('#create-toast').addEventListener('click', function () {
    document.querySelector('#toast-container').classList.remove('top-0', 'end-0', 'bottom-0', 'start-0');

    var content = (document.querySelector('input[name=content]').value != '')
        ? document.querySelector('input[name=content]').value
        : 'Lorem ipsum dolor sit amet';

    var type = (document.querySelector('select[name=type]').value != '')
        ? document.querySelector('select[name=type]').value
        : 'success';

    var position = (document.querySelector('select[name=position]').value != '')
        ? document.querySelector('select[name=position]').value.split(',')
        : ['top-0', 'end-0'];

    showToast(content, type, position);
});

function showToast(content, type, position) {
    var delay = 15000;
    position.forEach((el) => {
        document.querySelector("#toast-container").classList.add(el);
    });
    var html = `<div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true"><div class="d-flex"><div class="toast-body h6 p-3 m-0">${content}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div></div>`;
    var toast = htmlToElement(html);
    var toastContainer = document.querySelector("#toast-container");
    toastContainer.appendChild(toast);
    var toast = new bootstrap.Toast(toast, { delay: delay, animation: true });
    toast.show();
    setTimeout(() => toast.remove(), delay + 15000);
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}