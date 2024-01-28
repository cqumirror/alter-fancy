$(document).ready(function() {
    $('a').click(function(e) {
        if ($(this).parent().is('td') && !$(this).attr('href').endsWith('/')) {
            const link = $(this).attr('href')
            e.preventDefault();
            const xhr = new XMLHttpRequest()
            xhr.open('HEAD', '/msdfgenId', true)
            xhr.send()
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    const headers = xhr.getResponseHeader('x-remote-addr')
                    document.cookie = `addr=${headers}; max-age=300;`
                    var target = document.createElement('a')
                    target.href = link
                    document.body.appendChild(target)
                    target.click()
                    document.body.removeChild(target)
                }
            }

        }
    })
});
