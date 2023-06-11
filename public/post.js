(document).ready(function () {

    $("#but_upload").click(function () {

        var fd = new FormData();
        var files = $('#file')[0].files;

        // Check file selected or not
        if (files.length > 0) {
            fd.append('file', files[0]);

            $.ajax({
                url: 'https://～～宛先のアドレス',
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response != 0) {
                        $("#prediction").text(response) 
                    } 
                },
            });
        }
    });
});
