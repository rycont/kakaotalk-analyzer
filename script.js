function analysis(x) {
  console.log(x);
  chatsum = x.match(/\[.*] \[오후|전\]/g).length; //채팅 개수
  uniqueNames = []; //채터 명수
  chartdata = [];
  names = x.match(/\[.*] \[오후|전\]/g);
  //배열에 이름 중복 제거!
  uniqueNames = names.filter(function(item, pos) {
    return names.indexOf(item) == pos;
  });
  //차트에 삽입!
  for (i = 1; i <= uniqueNames.length; i++) {
    chartdata[i] = [];
    chartdata[i][0] = uniqueNames[i - 1];
    chartdata[i][1] = x.split(uniqueNames[i - 1]).length - 1;
  }
  //차트에 삽입!
  for (i = 1; i <= uniqueNames.length; i++) {
    chartdata[i][0] = chartdata[i][0].split("[")[1];
    chartdata[i][0] = chartdata[i][0].split("]")[0];
  }
  //이름 자르기!
  for (var i = 0; i < uniqueNames.length; i++) {
      uniqueNames[i] = uniqueNames[i].replace(/[^ㄱ-힣A-Za-z]/g, "");
      uniqueNames[i] = uniqueNames[i].replace("오전", "");
      uniqueNames[i] = uniqueNames[i].replace("오후", "");
  }
  awords = x.split(" ");

  chartdata[0] = [];
  chartdata[0][0] = "이름";
  chartdata[0][1] = "개수";
  analysis_array = new Array();
  analysis_array.sum = chatsum;
  analysis_array.chartper = chartdata;
}
function download(text, name, type) {
  var file = new Blob([text], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, name);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
function next(){
  analysis(document.getElementById('chat').value);
  download(JSON.stringify(analysis_array,null,1), "분석결과.JSON")
}
