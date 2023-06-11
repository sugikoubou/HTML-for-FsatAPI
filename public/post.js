(document).ready(function () {

    $("#but_upload").click(function () {

        var fd = new FormData();
        var files = $('#file')[0].files;

        // Check file selected or not
        if (files.length > 0) {
            fd.append('file', files[0]);

            $.ajax({
                url: 'https://38b2-2400-4150-4341-1f00-3dad-545c-8e7c-8010.ngrok.io/api/predict',
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
