$(document).ready(function() {

    $('#bugsTable').DataTable();
    
    let resultToast = new bootstrap.Toast(document.getElementById('resultToast'))
    let opModal = new bootstrap.Modal(document.getElementById('opModal'))

    function displayToast(message, success = false) {
        $('#resultToast .toast-body').text(message);
        if (success) {
            $('#resultToast').removeClass('bg-danger');
            $('#resultToast').addClass('bg-success');
        } else {
            $('#resultToast').addClass('bg-danger');
            $('#resultToast').removeClass('bg-success');
        }
        resultToast.show();
    }

    $('#modalSubmit').click(function() {
        opModal.hide();
        let form = $('#modalForm');
        // console.log(form);
        $.ajax({
            url: form.attr('action'),
            dataType: 'json',
            data: form.serialize(),
            method: 'POST'
        }).done((result) => {
            if(result.success) {
                displayToast('Bug registered successfully. Reloading...', 1)
                setTimeout(() => window.location.reload(), 2500);
            } else {
                displayToast('Error in registration');
            }
            
        }).fail(() => {
            displayToast('Error in registration');
        })
    })

    $('.resolve-bug').click(function() {
        let id = $(this).attr('data-id');
        $.ajax({
            url: 'http://localhost:3000/api/bugs/' + id,
            method: 'DELETE',
            dataType: 'json'
        }).done((result) => {
            if(result.success) {
                displayToast('Bug marked as resolved. Reloading...', 1);
                setTimeout(() => window.location.reload(), 2500);
            } else {
                displayToast('Error');
            }
        }).fail(() => {
            displayToast('Error');
        })
    })
})