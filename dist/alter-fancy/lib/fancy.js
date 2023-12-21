$(document).ready(function() {
    var f = $('#fancylist')
    var t = f.find("h1:first")
    // to bootstrap breadcrumb
    if (t[0]) {
        var o = t.text().replaceAll("Index of",'')
        var os = o.split('/')
        var b = '<ol class="breadcrumb">\n' +
            '<li class="breadcrumb-item"><a href="/#/">Home</a></li>\n'
        for (var i = 1; i < os.length; i++) {
            if (i == os.length-1) {
                b = b + '<li class="breadcrumb-item active">' + os[i] + '</li>\n' +
                    '</ol>'
            } else {
                ll = o.split(os[i])
                b = b + '<li class="breadcrumb-item"><a href="' + ll[0] + os[i] + '">' + os[i] + '</a></li>\n'
            }
        }
        t.replaceWith(b)
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        var k = 1024;
        var sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

        var i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
    }

    // to bootstrap table
    var p = $("pre")
    var or = p.html()
    var r = or.split('\n').filter(Boolean)
    var nh = `
        <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Filename</th>
              <th>File Size</th>
              <th class="text-right" style="width: 200px;">Date</th>
            </tr>
          </thead>
          <tbody>
            ${r.map(row => {
                var p = row.split(/\s{2,}/)
                if (p.length >= 3) {
                    var s = p[2] == '-' ? '-':formatBytes(Number(p[2]))
                    return `
                      <tr>
                        <td>${p[0]}</td>
                        <td>${s}</td>
                        <td class="text-right">${p[1]}</td>
                      </tr>
                    `
                } if (p.length == 2) {
                    var re = /(<a[^>]*>)([^<]*)(<\/a>)\s*(\d{1,2}-[A-Za-z]{3}-\d{4} \d{1,2}:\d{2})/
                    var m = p[0].match(re)
                    var l = m[1] + m[2] +m [3]
                    l = l.replaceAll('&gt;','')
                    var d = m[4]
                    var s = formatBytes(Number(p[1]))
                    return `
                      <tr>
                        <td>${l}</td>
                        <td>${s}</td>
                        <td class="text-right">${d}</td>
                      </tr>
                    `

                } else {
                    return `
                        <tr>
                          <td><a href="../">Parent Directory</a></td>
                          <td></td>
                          <td></td>
                        </tr>
                    `
                }
            }).join('')}
          </tbody>
        </table>
        </div>
    `
    p.replaceWith(nh)


})
